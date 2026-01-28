import { Component, output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doc-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-white shadow-xl rounded-xl overflow-hidden border border-slate-200">
      <div class="bg-slate-900 px-6 py-5 border-b border-slate-700">
        <h2 class="text-xl font-semibold text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-emerald-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Nuevo Parte de Trabajo
        </h2>
        <p class="text-slate-400 text-sm mt-1">Genera justificaciones de horas profesionales en segundos.</p>
      </div>

      <form [formGroup]="logForm" (ngSubmit)="onSubmit()" class="p-6 md:p-8 space-y-8">
        
        <!-- Contexto del Proyecto -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <h3 class="text-xs uppercase tracking-wider text-slate-500 font-bold mb-4 border-b border-slate-100 pb-2">Datos del Proyecto</h3>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Cliente / Proyecto</label>
            <input type="text" formControlName="clientName" class="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition shadow-sm" placeholder="Ej: Banco Santamaría - Migración Core">
          </div>

          <div class="grid grid-cols-2 gap-4">
             <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Fecha</label>
                <input type="date" formControlName="date" class="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm">
             </div>
             <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Horas</label>
                <input type="number" formControlName="hours" class="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm" placeholder="8">
             </div>
          </div>
        </section>

        <!-- Detalles de la Tarea -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div class="md:col-span-2">
            <h3 class="text-xs uppercase tracking-wider text-slate-500 font-bold mb-4 border-b border-slate-100 pb-2">Actividad Realizada</h3>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Tipo de Tarea</label>
            <div class="relative">
              <select formControlName="taskType" class="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none appearance-none shadow-sm cursor-pointer">
                <option value="Software Development">Desarrollo de Software</option>
                <option value="Bug Fixing & Maintenance">Corrección de Errores / Mantenimiento</option>
                <option value="Technical Analysis & Architecture">Análisis Técnico / Arquitectura</option>
                <option value="Meetings & Coordination">Reuniones y Coordinación</option>
                <option value="DevOps & Deployments">DevOps y Despliegues</option>
                <option value="QA & Testing">Pruebas y QA</option>
                <option value="Support & Consulting">Soporte y Consultoría</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <div>
             <label class="block text-sm font-semibold text-slate-700 mb-2">Tecnologías (Opcional)</label>
             <input type="text" formControlName="tech" class="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm" placeholder="Ej: Angular, Java, AWS, Jira">
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-slate-700 mb-2">
              Descripción Breve (Input Bruto)
              <span class="text-xs font-normal text-slate-400 ml-1">- ¿Qué hiciste realmente?</span>
            </label>
            <textarea formControlName="rawDetails" rows="3" class="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm resize-none" placeholder="Ej: Arreglé el bug del login que fallaba con usuarios nuevos y tuve reunión con el equipo de producto."></textarea>
          </div>
        </section>

        <!-- Configuración de Salida -->
         <section class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-lg border border-slate-100">
           <div>
             <label class="block text-sm font-semibold text-slate-700 mb-2">Formato de Salida</label>
             <div class="relative">
                <select formControlName="format" class="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none appearance-none shadow-sm cursor-pointer">
                  <option value="Daily Log (Concise)">Parte Diario (Conciso)</option>
                  <option value="Weekly Report (Detailed)">Resumen Semanal (Detallado)</option>
                  <option value="Audit Justification (Formal)">Justificación para Auditoría (Muy Formal)</option>
                  <option value="Client Update (Business Value)">Actualización a Cliente (Valor de Negocio)</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
             </div>
           </div>
           <div>
             <label class="block text-sm font-semibold text-slate-700 mb-2">Idioma</label>
             <div class="relative">
               <select formControlName="language" class="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none appearance-none shadow-sm cursor-pointer">
                 <option value="Spanish">Español</option>
                 <option value="English">Inglés</option>
                 <option value="French">Francés</option>
               </select>
               <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
             </div>
           </div>
         </section>

        <div class="pt-4 flex justify-end">
          <button type="submit" [disabled]="logForm.invalid" 
            class="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-lg shadow-lg transform transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-lg">
            <span>Generar Parte</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-emerald-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.456-2.456L14.25 6l1.035-.259a3.375 3.375 0 0 0 2.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  `
})
export class DocFormComponent {
  formSubmit = output<any>();
  private fb = inject(FormBuilder);

  logForm = this.fb.group({
    clientName: ['', Validators.required],
    date: [new Date().toISOString().split('T')[0], Validators.required],
    hours: [8, [Validators.required, Validators.min(0.5)]],
    taskType: ['Software Development', Validators.required],
    tech: [''],
    rawDetails: ['', [Validators.required, Validators.minLength(5)]],
    format: ['Daily Log (Concise)', Validators.required],
    language: ['Spanish', Validators.required]
  });

  onSubmit() {
    if (this.logForm.valid) {
      this.formSubmit.emit(this.logForm.value);
    }
  }
}