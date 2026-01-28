import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocFormComponent } from './components/doc-form.component';
import { DocViewerComponent } from './components/doc-viewer.component';
import { GeminiService } from './services/gemini.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DocFormComponent, DocViewerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private geminiService = inject(GeminiService);

  // Application State
  // 0: Form, 1: Loading, 2: Viewer, 3: Error
  step = signal<number>(0);
  
  generatedContent = signal<string>('');
  currentClient = signal<string>('');
  currentDate = signal<string>('');
  errorMsg = signal<string>('');

  async onFormSubmit(formData: any) {
    this.currentClient.set(formData.clientName);
    this.currentDate.set(formData.date);
    this.step.set(1); // Set to Loading

    try {
      const result = await this.geminiService.generateWorklog(formData);
      this.generatedContent.set(result);
      this.step.set(2); // Set to Viewer
    } catch (err) {
      console.error(err);
      this.errorMsg.set('Hubo un error al generar el parte. Verifica tu API Key.');
      this.step.set(3); // Set to Error
    }
  }

  reset() {
    this.step.set(0);
    this.generatedContent.set('');
    this.errorMsg.set('');
  }
}