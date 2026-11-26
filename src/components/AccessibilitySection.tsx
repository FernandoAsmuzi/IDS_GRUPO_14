import { Fragment } from 'react';
import { AlertTriangle, CheckCircle2, ExternalLink, Info, Keyboard } from 'lucide-react';
import {
  ACCESSIBILITY_EVIDENCE,
  ACCESSIBILITY_SAMPLES,
  MANUAL_KEYBOARD_FINDINGS,
  WCAG_COMMON_FAILURES,
} from '../data/tpData';
import { EvidenceGallery } from './EvidenceGallery';

export function AccessibilitySection() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-medium text-sky-700">
          02. Evaluación de Accesibilidad · WCAG 2.1 Nivel AA · WAVE, TAW y Teclado Virtual
        </p>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            Portal NASA — Auditoría Automática y Experiencia Manual
          </h1>
          <a
            href="https://www.nasa.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-700 hover:text-sky-900 whitespace-nowrap shrink-0"
          >
            <span>www.nasa.gov</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Se evaluaron tres URLs representativas con distintos patrones de interacción bajo los principios WCAG 2.1 (Perceptible, Operable, Comprensible y Robusto), combinando auditoría automática y prueba empírica con teclado en pantalla.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ACCESSIBILITY_SAMPLES.map((sample) => (
          <div key={sample.id} className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-900">{sample.label}</h2>
              <span className="text-xs font-mono font-semibold text-sky-700 tabular-nums">
                WAVE {sample.wave.score}
              </span>
            </div>
            <p className="text-xs font-mono text-slate-500 truncate">{sample.url}</p>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">{sample.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-5 py-3.5">
          <h2 className="text-base font-semibold text-slate-900">Resultados de evaluación automática (WAVE y TAW)</h2>
          <span className="text-xs text-slate-500">
            Nota: el evaluador ONTI no estuvo disponible por tiempo de espera agotado
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                <th className="px-4 py-3">Muestra</th>
                <th className="px-4 py-3">Herramienta</th>
                <th className="px-4 py-3">Métrica global</th>
                <th className="px-4 py-3">Errores / Problemas</th>
                <th className="px-4 py-3">Contraste</th>
                <th className="px-4 py-3">Alertas / Adv.</th>
                <th className="px-4 py-3">Estructura / ARIA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm tabular-nums">
              {ACCESSIBILITY_SAMPLES.map((sample) => (
                <Fragment key={sample.id}>
                  <tr className="hover:bg-slate-50/70">
                    <td rowSpan={2} className="px-4 py-3 font-semibold text-slate-900 align-top border-r border-slate-100">
                      {sample.label}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs font-semibold text-sky-800">WAVE</td>
                    <td className="px-4 py-2.5 font-mono font-medium text-slate-900">{sample.wave.score}</td>
                    <td className="px-4 py-2.5 text-slate-700">{sample.wave.errors}</td>
                    <td className="px-4 py-2.5 text-slate-700">{sample.wave.contrast}</td>
                    <td className="px-4 py-2.5 text-slate-700">{sample.wave.alerts}</td>
                    <td className="px-4 py-2.5 text-slate-600">{sample.wave.structural}</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 bg-slate-50/30">
                    <td className="px-4 py-2.5 font-mono text-xs font-semibold text-slate-700">TAW</td>
                    <td className="px-4 py-2.5 font-mono font-medium text-slate-900">{sample.taw.problems}</td>
                    <td className="px-4 py-2.5 text-slate-600 text-xs">{sample.taw.breakdown}</td>
                    <td className="px-4 py-2.5 text-slate-700">{sample.taw.contrast}</td>
                    <td className="px-4 py-2.5 text-slate-700">{sample.taw.warnings}</td>
                    <td className="px-4 py-2.5 text-slate-600">{sample.taw.unverified}</td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">5 patrones críticos comunes (TAW · Nivel A)</h3>
            <p className="mt-1 text-xs text-slate-500">
              Las tres páginas evaluadas repiten exactamente estos 5 criterios de éxito en estado de falla comprobada.
            </p>
          </div>
          <ol className="space-y-3 divide-y divide-slate-100">
            {WCAG_COMMON_FAILURES.map((item) => (
              <li key={item.code} className="pt-3 first:pt-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-semibold text-rose-700 tabular-nums">
                    Criterio {item.code}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-sm font-semibold text-slate-900">{item.name}</span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Keyboard className="h-4 w-4 text-sky-700 shrink-0" aria-hidden="true" />
            <div>
              <h3 className="text-base font-semibold text-slate-900">Evaluación manual con teclado virtual</h3>
              <p className="text-xs text-slate-500">
                Navegación exclusiva mediante teclado en pantalla accionado por puntero.
              </p>
            </div>
          </div>

          <ul className="space-y-3 divide-y divide-slate-100">
            {MANUAL_KEYBOARD_FINDINGS.map((finding) => (
              <li key={finding.title} className="pt-3 first:pt-0">
                <div className="flex items-center gap-2">
                  {finding.sentiment === 'positive' && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  )}
                  {finding.sentiment === 'issue' && (
                    <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" aria-hidden="true" />
                  )}
                  {finding.sentiment === 'neutral' && (
                    <Info className="h-4 w-4 text-sky-700 shrink-0" aria-hidden="true" />
                  )}
                  <span className="text-sm font-semibold text-slate-900">{finding.title}</span>
                </div>
                <p className="mt-1 pl-6 text-xs sm:text-sm text-slate-600 leading-relaxed">{finding.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <EvidenceGallery items={ACCESSIBILITY_EVIDENCE} sectionLabel="Evaluación de Accesibilidad (NASA)" />
    </div>
  );
}
