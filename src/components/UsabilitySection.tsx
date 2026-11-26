import { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { USABILITY_EVIDENCE, USABILITY_HEURISTICS, type HeuristicStatus } from '../data/tpData';
import { EvidenceGallery } from './EvidenceGallery';

type FilterOption = 'todas' | 'cumple' | 'atencion';

export function UsabilitySection() {
  const [filter, setFilter] = useState<FilterOption>('todas');
  const [expandedId, setExpandedId] = useState<number | null>(3);

  const filtered = USABILITY_HEURISTICS.filter((h) => {
    if (filter === 'cumple') return h.status === 'cumple';
    if (filter === 'atencion') return h.status !== 'cumple';
    return true;
  });

  const renderStatus = (status: HeuristicStatus, label: string) => {
    if (status === 'cumple') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 whitespace-nowrap shrink-0">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{label}</span>
        </span>
      );
    }
    if (status === 'observacion') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 whitespace-nowrap shrink-0">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{label}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-700 whitespace-nowrap shrink-0">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>{label}</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-medium text-sky-700">
          01. Evaluación de Usabilidad · Método de Inspección Heurística de Jakob Nielsen (1994)
        </p>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            Entorno Scratch — Análisis de las 10 Heurísticas
          </h1>
          <a
            href="https://www.scratch.mit.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-700 hover:text-sky-900 whitespace-nowrap shrink-0"
          >
            <span>www.scratch.mit.edu</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Evaluación de la facilidad con la que los usuarios interactúan con el entorno de programación visual educativa del MIT para cumplir sus tareas de manera efectiva, eficiente y satisfactoria.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Cumplimiento pleno</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700 font-mono tabular-nums">8 / 10</p>
          <p className="mt-1 text-xs text-slate-600">Heurísticas 1, 2, 4, 5, 6, 7, 8 y 10</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Cumple con observación</p>
          <p className="mt-1 text-2xl font-bold text-amber-700 font-mono tabular-nums">1 / 10</p>
          <p className="mt-1 text-xs text-slate-600">N°3: Deshacer/Rehacer ocultos en menú contextual</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Cumple parcialmente</p>
          <p className="mt-1 text-2xl font-bold text-rose-700 font-mono tabular-nums">1 / 10</p>
          <p className="mt-1 text-xs text-slate-600">N°9: Sin alertas automáticas ante errores lógicos</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-3.5">
          <h2 className="text-base font-semibold text-slate-900">Detalle por heurística</h2>
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1" role="tablist" aria-label="Filtrar heurísticas">
            {(
              [
                { id: 'todas', label: 'Todas (10)' },
                { id: 'atencion', label: 'Con observaciones (2)' },
                { id: 'cumple', label: 'Cumplen (8)' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={filter === tab.id}
                onClick={() => setFilter(tab.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  filter === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.map((item) => {
            const isExpanded = expandedId === item.number || filter === 'atencion';
            return (
              <div key={item.number} className="transition-colors hover:bg-slate-50/70">
                <button
                  type="button"
                  onClick={() => setExpandedId(expandedId === item.number ? null : item.number)}
                  aria-expanded={isExpanded}
                  className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left"
                >
                  <div className="flex items-baseline gap-3 min-w-0">
                    <span className="font-mono text-xs font-semibold text-slate-400 tabular-nums w-6 shrink-0">
                      {String(item.number).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 truncate sm:whitespace-normal">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    {renderStatus(item.status, item.statusLabel)}
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-4 pl-14 space-y-2.5">
                    <ul className="space-y-1.5 text-sm text-slate-600 list-disc pl-4">
                      {item.findings.map((finding, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {finding}
                        </li>
                      ))}
                    </ul>
                    {item.observation && (
                      <div className="rounded-lg border border-amber-200 bg-amber-50/70 px-3.5 py-2.5 text-xs sm:text-sm text-amber-950">
                        <span className="font-semibold">Observación / Oportunidad de mejora: </span>
                        {item.observation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2.5">
          <h3 className="text-base font-semibold text-slate-900">Fortalezas principales</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Scratch sobresale en <strong className="font-semibold text-slate-900">Prevención de errores (N°5)</strong>,{' '}
            <strong className="font-semibold text-slate-900">Reconocimiento en lugar de recuerdo (N°6)</strong> y{' '}
            <strong className="font-semibold text-slate-900">Coincidencia con el mundo real (N°2)</strong>: los bloques encastrables eliminan errores de sintaxis y reducen la carga cognitiva en principiantes.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2.5">
          <h3 className="text-base font-semibold text-slate-900">Oportunidades de mejora detectadas</h3>
          <ul className="space-y-1.5 text-sm text-slate-600 list-disc pl-4">
            <li>
              Incorporar botones visibles de <strong className="font-semibold text-slate-900">Deshacer / Rehacer</strong> en la barra superior del editor (Heurística N°3).
            </li>
            <li>
              Añadir alertas visuales o indicadores de depuración básica ante bucles infinitos o divisiones por cero en tiempo real (Heurística N°9).
            </li>
          </ul>
        </div>
      </div>

      <EvidenceGallery items={USABILITY_EVIDENCE} sectionLabel="Evaluación de Usabilidad (Scratch)" />
    </div>
  );
}
