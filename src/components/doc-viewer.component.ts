import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doc-viewer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6 no-print">
      <div class="flex flex-wrap justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div>
           <h2 class="text-lg font-bold text-slate-900">{{ title() }}</h2>
           <p class="text-sm text-slate-500">{{ date() }}</p>
        </div>
        <div class="flex gap-3 mt-4 md:mt-0">
          <button (click)="goBack()" class="px-4 py-2 text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg font-semibold transition text-sm shadow-sm">
             Nuevo Parte
          </button>
          
          <button (click)="copyToClipboard()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium shadow-sm transition flex items-center gap-2 text-sm">
             @if (copied()) {
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                ¡Copiado!
             } @else {
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
                Copiar
             }
          </button>

          <button (click)="printDoc()" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium shadow-sm transition flex items-center gap-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
            </svg>
            PDF / Imprimir
          </button>
        </div>
      </div>
    </div>

    <!-- Paper View (Timesheet Style) -->
    <div class="doc-container mt-6 mx-auto bg-white shadow-xl min-h-[600px] max-w-[850px] p-[40px] md:p-[60px] border border-gray-200">
      
      <!-- Header -->
      <div class="border-b-2 border-emerald-600 pb-6 mb-8 flex justify-between items-start">
         <div>
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Reporte de Actividad</div>
            <h1 class="text-2xl font-bold text-slate-900 leading-tight">{{ title() }}</h1>
         </div>
         <div class="text-right">
             <div class="bg-slate-100 px-3 py-1 rounded text-sm font-semibold text-slate-700">{{ date() }}</div>
         </div>
      </div>
      
      <!-- Content Block -->
      <div class="bg-slate-50 border border-slate-200 rounded-lg p-6 relative">
        <div class="absolute top-0 left-0 w-1 h-full bg-emerald-500 rounded-l-lg"></div>
        <h3 class="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Descripción / Justificación</h3>
        <div class="doc-content prose prose-slate max-w-none text-slate-900 whitespace-pre-wrap leading-relaxed font-medium">
          {{ content() }}
        </div>
      </div>

       <!-- Footer for Print -->
       <div class="mt-12 pt-6 border-t border-slate-200 flex justify-between text-xs text-slate-400">
          <p>Generado por AI Worklog Pro</p>
          <p>Confidencial</p>
       </div>
    </div>
  `
})
export class DocViewerComponent {
  content = input.required<string>();
  title = input.required<string>();
  inputDate = input<string>('');
  
  // If inputDate is provided use it, otherwise use today
  date = signal('');
  copied = signal(false);

  ngOnInit() {
    this.date.set(this.inputDate() || new Date().toLocaleDateString());
  }

  goBack() {
    window.location.reload();
  }

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.content());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  }

  printDoc() {
    window.print();
  }
}