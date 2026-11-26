import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Download, FileText, X } from 'lucide-react';
import { CoverSection } from './components/CoverSection';
import { UsabilitySection } from './components/UsabilitySection';
import { AccessibilitySection } from './components/AccessibilitySection';
import { BlackBoxSection } from './components/BlackBoxSection';
import { WhiteBoxSection } from './components/WhiteBoxSection';
import { assetUrl } from './data/tpData';

export type SectionId = 'portada' | 'usabilidad' | 'accesibilidad' | 'caja-negra' | 'caja-blanca';

const SECTIONS: Array<{ id: SectionId; navLabel: string; fullTitle: string }> = [
  { id: 'portada', navLabel: 'Portada', fullTitle: 'Portada · Grupo 14' },
  { id: 'usabilidad', navLabel: 'Usabilidad', fullTitle: '01. Usabilidad (Scratch)' },
  { id: 'accesibilidad', navLabel: 'Accesibilidad', fullTitle: '02. Accesibilidad (NASA)' },
  { id: 'caja-negra', navLabel: 'Caja Negra', fullTitle: '03. Caja Negra (Replit)' },
  { id: 'caja-blanca', navLabel: 'Caja Blanca', fullTitle: '04. Caja Blanca (dias_del_mes)' },
];

const PDF_URL = assetUrl('assets/aistudio/IDS_TRABAJO_INTEGRADOR_GRUPO_14_7bea9535.pdf');

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('portada');
  const [pdfModalOpen, setPdfModalOpen] = useState(false);

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);

  const navigateTo = (id: SectionId) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (pdfModalOpen) {
        if (e.key === 'Escape') setPdfModalOpen(false);
        return;
      }
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (document.querySelector('[role="dialog"]')) return;

      if (e.key === 'ArrowRight' && currentIndex < SECTIONS.length - 1) {
        navigateTo(SECTIONS[currentIndex + 1].id);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigateTo(SECTIONS[currentIndex - 1].id);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentIndex, pdfModalOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 h-16">
          <button
            type="button"
            onClick={() => navigateTo('portada')}
            className="font-display text-base sm:text-lg font-bold tracking-tight text-slate-950 hover:text-sky-800 transition-colors whitespace-nowrap shrink-0"
          >
            Ingeniería de Software
          </button>

          <nav aria-label="Navegación de secciones" className="hidden md:flex items-center gap-6">
            {SECTIONS.map((sec) => {
              const isActive = sec.id === activeSection;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => navigateTo(sec.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-sky-800 after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-sky-700'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {sec.navLabel}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setPdfModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Informe PDF</span>
            </button>
          </div>
        </div>

        {/* Mobile section switcher */}
        <div className="md:hidden border-t border-slate-100 px-4 py-2 overflow-x-auto">
          <div className="flex items-center gap-2">
            {SECTIONS.map((sec) => {
              const isActive = sec.id === activeSection;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => navigateTo(sec.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {sec.navLabel}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6 py-8">
        {activeSection === 'portada' && <CoverSection onNavigate={navigateTo} />}
        {activeSection === 'usabilidad' && <UsabilitySection />}
        {activeSection === 'accesibilidad' && <AccessibilitySection />}
        {activeSection === 'caja-negra' && <BlackBoxSection />}
        {activeSection === 'caja-blanca' && <WhiteBoxSection />}

        {/* Slide Presentation Stepper Footer */}
        <nav
          aria-label="Navegación paso a paso de la presentación"
          className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6"
        >
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => currentIndex > 0 && navigateTo(SECTIONS[currentIndex - 1].id)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>{currentIndex > 0 ? SECTIONS[currentIndex - 1].navLabel : 'Anterior'}</span>
          </button>

          <p className="text-xs text-slate-500 font-mono tabular-nums">
            Diapositiva {currentIndex + 1} de {SECTIONS.length} · {SECTIONS[currentIndex].fullTitle}
          </p>

          <button
            type="button"
            disabled={currentIndex === SECTIONS.length - 1}
            onClick={() =>
              currentIndex < SECTIONS.length - 1 && navigateTo(SECTIONS[currentIndex + 1].id)
            }
            className="inline-flex items-center gap-2 rounded-lg bg-sky-700 px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-sky-800 disabled:opacity-40 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0"
          >
            <span>
              {currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1].navLabel : 'Finalizado'}
            </span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      </main>

      <footer className="border-t border-slate-200 bg-white py-5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <span>UNJu – Facultad de Ingeniería · Lic. y Prof. en Informática Educativa · Grupo 14</span>
          <span>Navegación rápida con teclas ← y →</span>
        </div>
      </footer>

      {/* Original PDF Modal */}
      {pdfModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Informe original en PDF"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-xs"
          onClick={() => setPdfModalOpen(false)}
        >
          <div
            className="flex h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-slate-700 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-3.5">
              <div className="min-w-0">
                <h2 className="text-sm sm:text-base font-semibold text-slate-900 truncate">
                  Trabajo Integrador — Grupo 14 (Documento original)
                </h2>
                <p className="text-xs text-slate-500">Ingeniería de Software · UNJu</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={PDF_URL}
                  download="IDS_TRABAJO_INTEGRADOR_GRUPO_14.pdf"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Descargar PDF</span>
                </a>
                <button
                  type="button"
                  onClick={() => setPdfModalOpen(false)}
                  aria-label="Cerrar visor de PDF"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <iframe
              src={PDF_URL}
              title="Trabajo Integrador Grupo 14 PDF"
              className="flex-1 w-full bg-slate-100"
            />
          </div>
        </div>
      )}
    </div>
  );
}
