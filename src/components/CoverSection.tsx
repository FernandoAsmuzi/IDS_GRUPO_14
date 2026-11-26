import { useState } from 'react';
import { ArrowRight, CheckSquare, Eye, GitBranch, Layers } from 'lucide-react';
import { GROUP_MEMBERS, assetUrl } from '../data/tpData';
import type { SectionId } from '../App';

interface CoverSectionProps {
  onNavigate: (section: SectionId) => void;
}

const AGENDA_ITEMS: Array<{
  id: SectionId;
  index: string;
  title: string;
  target: string;
  summary: string;
  icon: typeof Layers;
}> = [
  {
    id: 'usabilidad',
    index: '01',
    title: 'Evaluación de Usabilidad',
    target: 'www.scratch.mit.edu',
    summary: 'Inspección mediante las 10 heurísticas de Jakob Nielsen, hallazgos clave y oportunidades de mejora.',
    icon: Layers,
  },
  {
    id: 'accesibilidad',
    index: '02',
    title: 'Evaluación de Accesibilidad',
    target: 'www.nasa.gov',
    summary: 'Auditoría WCAG 2.1 Nivel AA con WAVE y TAW sobre 3 URLs más prueba empírica con teclado virtual.',
    icon: Eye,
  },
  {
    id: 'caja-negra',
    index: '03',
    title: 'Pruebas de Caja Negra',
    target: 'www.replit.com',
    summary: 'Técnica de transición de estados, 2 casos de prueba y simulador interactivo de estados y bloqueos.',
    icon: CheckSquare,
  },
  {
    id: 'caja-blanca',
    index: '04',
    title: 'Pruebas de Caja Blanca',
    target: 'dias_del_mes(mes, anio)',
    summary: 'Grafo de flujo de control (GFC), complejidad ciclomática V(G) = 8 y trazador interactivo de caminos.',
    icon: GitBranch,
  },
];

export function CoverSection({ onNavigate }: CoverSectionProps) {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <p className="text-sm text-slate-500">
              UNJu – Facultad de Ingeniería · Lic. y Prof. en Informática Educativa · Grupo 14
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 leading-[1.12] max-w-2xl">
              Trabajo Integrador: Calidad y Pruebas de Software
            </h1>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              Desarrollo interactivo de las cuatro consignas evaluadas por el equipo: inspección heurística de usabilidad, auditoría de accesibilidad web, pruebas funcionales por transición de estados y pruebas estructurales de camino básico.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('usabilidad')}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-800 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Comenzar presentación</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('caja-negra')}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Ir a pruebas interactivas</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50/70 p-6 text-center">
            {!logoError ? (
              <img
                src={assetUrl('assets/evidencias/logo_unju.png')}
                alt="Logotipo de la Facultad de Ingeniería de la Universidad Nacional de Jujuy"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
                className="h-28 w-auto object-contain"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-slate-200 bg-white text-lg font-bold text-sky-800">
                UNJu
              </div>
            )}
            <p className="mt-4 text-sm font-semibold text-slate-900">Ingeniería de Software</p>
            <p className="mt-1 text-xs text-slate-500">Facultad de Ingeniería · UNJu</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Agenda de la exposición</h2>
          <span className="text-xs text-slate-500">Seleccioná un módulo para navegar directamente</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AGENDA_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 text-left hover:border-sky-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono font-medium text-sky-700 tabular-nums">
                      Consigna {item.index} · {item.target}
                    </span>
                    <Icon className="h-4 w-4 text-slate-400 group-hover:text-sky-700 transition-colors shrink-0" />
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-sky-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{item.summary}</p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-sky-700">
                  <span>Abrir desarrollo</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Integrantes — Grupo 14</h2>
          <span className="text-xs text-slate-500 tabular-nums">{GROUP_MEMBERS.length} integrantes</span>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
          {GROUP_MEMBERS.map((member) => (
            <div key={member.name} className="py-1.5 border-b border-slate-100 last:border-b-0 sm:border-b-0">
              <p className="text-sm font-medium text-slate-900">{member.name}</p>
              <p className="text-xs text-slate-500 font-mono tabular-nums mt-0.5">
                {member.dni ? `DNI ${member.dni} · ` : ''}
                {member.lu}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
