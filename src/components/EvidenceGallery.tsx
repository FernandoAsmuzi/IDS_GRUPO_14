import { useEffect, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Image as ImageIcon, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { EvidenceItem } from '../data/tpData';

interface EvidenceGalleryProps {
  items: EvidenceItem[];
  sectionLabel: string;
}

export function EvidenceGallery({ items, sectionLabel }: EvidenceGalleryProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [brokenIds, setBrokenIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
        setZoomed(false);
      } else if (e.key === 'ArrowRight' && items.length > 1) {
        e.stopPropagation();
        setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % items.length));
        setZoomed(false);
      } else if (e.key === 'ArrowLeft' && items.length > 1) {
        e.stopPropagation();
        setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + items.length) % items.length));
        setZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [activeIndex, items.length]);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  return (
    <section
      aria-label={`Capturas y evidencias de ${sectionLabel}`}
      className="mt-8 rounded-xl border border-slate-200 bg-white"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <ImageIcon className="h-4 w-4 text-sky-700 shrink-0" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-slate-900 truncate">
            Capturas y evidencias del informe
          </h3>
          <span className="text-xs text-slate-500 tabular-nums shrink-0" aria-hidden="true">
            ·
          </span>
          <span className="text-xs text-slate-500 tabular-nums whitespace-nowrap shrink-0">
            {items.length} {items.length === 1 ? 'imagen' : 'imágenes'} — clic para ampliar
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          aria-expanded={isOpen}
        >
          <span>{isOpen ? 'Ocultar tira' : 'Mostrar capturas'}</span>
          {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-100 px-5 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  setZoomed(false);
                }}
                className="group flex flex-col text-left rounded-lg border border-slate-200 bg-slate-50/70 p-2 hover:border-sky-400 hover:bg-white transition-colors"
              >
                <div className="relative h-24 w-full overflow-hidden rounded-md bg-slate-100 border border-slate-200/70 flex items-center justify-center">
                  {brokenIds[item.id] ? (
                    <div className="flex flex-col items-center justify-center gap-1 px-2 text-center text-slate-400">
                      <ImageIcon className="h-5 w-5" />
                      <span className="text-[11px] leading-tight">{item.tag}</span>
                    </div>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={() => setBrokenIds((prev) => ({ ...prev, [item.id]: true }))}
                      className="h-full w-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.03]"
                    />
                  )}
                  <span
                    className="absolute right-1.5 bottom-1.5 inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-900/75 text-white opacity-85 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </span>
                </div>
                <p className="mt-2 text-xs font-medium text-slate-800 line-clamp-1">{item.title}</p>
                <p className="text-[11px] text-slate-500 truncate">{item.tag}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeItem && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 sm:p-6 backdrop-blur-xs"
          onClick={() => {
            setActiveIndex(null);
            setZoomed(false);
          }}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-900 text-slate-100 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-xs text-slate-400">
                  {sectionLabel} · {activeItem.tag} · {activeIndex + 1} de {items.length}
                </p>
                <h4 className="text-sm sm:text-base font-semibold text-white truncate">{activeItem.title}</h4>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setZoomed((z) => !z)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
                >
                  {zoomed ? <ZoomOut className="h-3.5 w-3.5" /> : <ZoomIn className="h-3.5 w-3.5" />}
                  <span>{zoomed ? 'Ajustar' : 'Ampliar'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveIndex(null);
                    setZoomed(false);
                  }}
                  aria-label="Cerrar vista ampliada"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 overflow-auto bg-slate-950/70 p-4 sm:p-6 flex items-center justify-center min-h-[320px]">
              {brokenIds[activeItem.id] ? (
                <div className="flex flex-col items-center justify-center gap-2 text-slate-400 py-16">
                  <ImageIcon className="h-10 w-10" />
                  <p className="text-sm">No se pudo cargar la imagen: {activeItem.title}</p>
                </div>
              ) : (
                <img
                  src={activeItem.src}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  onClick={() => setZoomed((z) => !z)}
                  className={`rounded-md bg-white shadow-lg transition-transform duration-200 cursor-zoom-in ${
                    zoomed
                      ? 'max-w-none w-[135%] cursor-zoom-out'
                      : 'max-h-[68vh] w-auto max-w-full object-contain'
                  }`}
                />
              )}

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Captura anterior"
                    onClick={() => {
                      setActiveIndex((activeIndex - 1 + items.length) % items.length);
                      setZoomed(false);
                    }}
                    className="fixed sm:absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/90 text-white hover:bg-slate-800 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Captura siguiente"
                    onClick={() => {
                      setActiveIndex((activeIndex + 1) % items.length);
                      setZoomed(false);
                    }}
                    className="fixed sm:absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/90 text-white hover:bg-slate-800 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            <div className="border-t border-slate-800 bg-slate-900 px-5 py-3.5">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
