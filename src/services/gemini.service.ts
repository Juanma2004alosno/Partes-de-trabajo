import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env['API_KEY'] });
  }

  async generateWorklog(data: any): Promise<string> {
    const model = 'gemini-2.5-flash';

    const prompt = `
      ACT AS: Senior IT Consultant and Project Manager.
      TASK: Generate a professional, corporate-grade worklog/timesheet justification based on the user's input.
      
      INPUT DATA:
      - Client/Project: ${data.clientName}
      - Task Category: ${data.taskType} (e.g., Development, Analysis, Support)
      - Technology Used: ${data.tech || 'N/A'}
      - Raw Activity Description: "${data.rawDetails}"
      - Report Format: ${data.format}
      - Language: ${data.language}
      
      RULES FOR GENERATION:
      1. TONE: Strictly professional, formal, and corporate.
      2. PROHIBITED: Do not use emojis, slang, or casual language. Do not use generic phrases like "did some work".
      3. OBJECTIVE: Justify the hours spent by highlighting value, complexity, and specific actions (e.g., "Implemented," "Validated," "Optimized," "Facilitated").
      4. STRUCTURE: 
         - If 'Daily Log': A concise paragraph or bullet points summarizing the specific tasks.
         - If 'Weekly Summary': A structured breakdown of key achievements and status.
         - If 'Audit Justification': Extremely detailed technical language justifying complexity.
      5. CONTENT: Expand on the "Raw Activity Description" to make it sound professional and complete. Connect the task to project goals if possible.
      
      OUTPUT:
      Return ONLY the text content for the timesheet. Do not add conversational filler before or after.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
          temperature: 0.3, // Low temperature for consistent, professional output
          maxOutputTokens: 2048
        }
      });
      
      return response.text || 'Error: No content generated.';
    } catch (error) {
      console.error('AI Generation Error:', error);
      throw error;
    }
  }
}