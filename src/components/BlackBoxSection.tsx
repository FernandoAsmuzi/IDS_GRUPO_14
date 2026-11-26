import { useEffect, useRef, useState } from 'react';
import {
  AlertOctagon,
  CheckCircle2,
  ExternalLink,
  Play,
  RotateCcw,
  Terminal,
  XCircle,
} from 'lucide-react';
import {
  BLACKBOX_EVIDENCE,
  BLACKBOX_TEST_CASES,
  REPLIT_EVENTS,
  REPLIT_STATES,
  type StateEvent,
} from '../data/tpData';
import { EvidenceGallery } from './EvidenceGallery';

type DetailTab = 'casos' | 'tabla';

const TRANSITION_COLUMNS = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9'] as const;

const TRANSITION_MATRIX: Record<number, Partial<Record<(typeof TRANSITION_COLUMNS)[number], number>>> = {
  1: { E1: 2 },
  2: { E2: 3, E3: 7 },
  3: { E4: 4 },
  4: { E5: 5, E6: 7 },
  5: { E7: 6, E8: 7 },
  6: { E9: 1 },
  7: { E9: 1 },
};

export function BlackBoxSection() {
  const [currentState, setCurrentState] = useState<number>(1);
  const [history, setHistory] = useState<number[]>([1]);
  const [traversedEvents, setTraversedEvents] = useState<string[]>([]);
  const [lastEvent, setLastEvent] = useState<StateEvent | null>(null);
  const [activeScenario, setActiveScenario] = useState<'manual' | 'cp1' | 'cp2' | 'ideal'>('manual');
  const [detailTab, setDetailTab] = useState<DetailTab>('casos');
  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => clearTimer, []);

  const resetSimulation = () => {
    clearTimer();
    setCurrentState(1);
    setHistory([1]);
    setTraversedEvents([]);
    setLastEvent(null);
    setActiveScenario('manual');
  };

  const triggerEvent = (ev: StateEvent, keepScenario = false) => {
    if (!keepScenario) {
      clearTimer();
      setActiveScenario('manual');
    }
    setCurrentState(ev.to);
    setHistory((prev) => [...prev, ev.to]);
    setTraversedEvents((prev) => [...prev, `${ev.from}-${ev.to}-${ev.code}`]);
    setLastEvent(ev);
  };

  const runPreset = (scenario: 'cp1' | 'cp2' | 'ideal') => {
    clearTimer();
    setCurrentState(1);
    setHistory([1]);
    setTraversedEvents([]);
    setLastEvent(null);
    setActiveScenario(scenario);

    const sequenceCodes =
      scenario === 'ideal' ? ['E1', 'E2', 'E4', 'E5', 'E7'] : ['E1', 'E3'];

    let stepIdx = 0;
    let simulatedState = 1;

    const advance = () => {
      if (stepIdx >= sequenceCodes.length) return;
      const code = sequenceCodes[stepIdx];
      const ev = REPLIT_EVENTS.find((e) => e.from === simulatedState && e.code === code);
      if (!ev) return;
      simulatedState = ev.to;
      triggerEvent(ev, true);
      stepIdx += 1;
      if (stepIdx < sequenceCodes.length) {
        timerRef.current = window.setTimeout(advance, 700);
      }
    };

    timerRef.current = window.setTimeout(advance, 320);
  };

  const availableEvents = REPLIT_EVENTS.filter((e) => e.from === currentState);
  const currentStateObj = REPLIT_STATES.find((s) => s.id === currentState)!;

  const isEdgeActive = (from: number, to: number, code: string) =>
    traversedEvents.includes(`${from}-${to}-${code}`);

  const isNodeVisited = (id: number) => history.includes(id);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-medium text-sky-700">
          03. Pruebas de Caja Negra · Técnica de Transición de Estados
        </p>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            Replit — Crear proyecto Python, ejecutar y compartir enlace
          </h1>
          <a
            href="https://www.replit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-700 hover:text-sky-900 whitespace-nowrap shrink-0"
          >
            <span>www.replit.com</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          En cuenta gratuita, Replit interrumpe la creación del proyecto exigiendo suscripción paga (<em>Compare plans</em> o alerta <em>The Starter plan is unavailable</em>). El modelo integra el flujo funcional esperado y la transición real de bloqueo.
        </p>
      </header>

      {/* Two-Zone Interactive Sandbox */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-3.5">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Simulador interactivo de Transición de Estados
            </h2>
            <p className="text-xs text-slate-500">
              Dispará eventos paso a paso o reproducí los casos de prueba documentados en el informe.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => runPreset('cp1')}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                activeScenario === 'cp1'
                  ? 'border-rose-300 bg-rose-50 text-rose-800'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Play className="h-3.5 w-3.5" />
              <span>Simular CP1 (Modo Free)</span>
            </button>
            <button
              type="button"
              onClick={() => runPreset('cp2')}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                activeScenario === 'cp2'
                  ? 'border-rose-300 bg-rose-50 text-rose-800'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Play className="h-3.5 w-3.5" />
              <span>Simular CP2 (Import → Empty)</span>
            </button>
            <button
              type="button"
              onClick={() => runPreset('ideal')}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                activeScenario === 'ideal'
                  ? 'border-sky-300 bg-sky-50 text-sky-800'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Play className="h-3.5 w-3.5" />
              <span>Flujo esperado (Éxito)</span>
            </button>
            <button
              type="button"
              onClick={resetSimulation}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reiniciar</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Zone: Interactive SVG State Machine */}
          <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/50 p-4 sm:p-5 flex flex-col justify-between">
            <div className="overflow-x-auto">
              <svg
                viewBox="0 0 905 375"
                className="w-full min-w-[640px] h-auto select-none"
                role="img"
                aria-label="Diagrama interactivo de transición de estados de Replit"
              >
                <defs>
                  <marker id="arrow-muted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
                  </marker>
                  <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
                  </marker>
                  <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
                  </marker>
                </defs>

                {/* Initial dot -> State 1 */}
                <circle cx="24" cy="255" r="7" fill="#0f172a" />
                <line x1="31" y1="255" x2="48" y2="255" stroke="#0f172a" strokeWidth="2" markerEnd="url(#arrow-muted)" />

                {/* Normal horizontal transitions 1->2->3->4->5->6 */}
                {[
                  { from: 1, to: 2, code: 'E1', x1: 132, x2: 193, label: 'E1' },
                  { from: 2, to: 3, code: 'E2', x1: 277, x2: 338, label: 'E2' },
                  { from: 3, to: 4, code: 'E4', x1: 422, x2: 483, label: 'E4' },
                  { from: 4, to: 5, code: 'E5', x1: 567, x2: 628, label: 'E5' },
                  { from: 5, to: 6, code: 'E7', x1: 712, x2: 770, label: 'E7' },
                ].map((edge) => {
                  const active = isEdgeActive(edge.from, edge.to, edge.code);
                  return (
                    <g key={edge.code}>
                      <line
                        x1={edge.x1}
                        y1={255}
                        x2={edge.x2}
                        y2={255}
                        stroke={active ? '#0284c7' : '#94a3b8'}
                        strokeWidth={active ? 3 : 1.75}
                        markerEnd={active ? 'url(#arrow-blue)' : 'url(#arrow-muted)'}
                      />
                      <text
                        x={(edge.x1 + edge.x2) / 2}
                        y={243}
                        textAnchor="middle"
                        className={`text-[11px] font-mono font-semibold ${
                          active ? 'fill-sky-700' : 'fill-slate-500'
                        }`}
                      >
                        {edge.label}
                      </text>
                    </g>
                  );
                })}

                {/* Error transitions to State 7 */}
                {/* E3: 2 -> 7 */}
                <g>
                  <path
                    d="M 262 222 Q 320 140 407 95"
                    fill="none"
                    stroke={isEdgeActive(2, 7, 'E3') ? '#dc2626' : '#fca5a5'}
                    strokeWidth={isEdgeActive(2, 7, 'E3') ? 3 : 1.75}
                    markerEnd={isEdgeActive(2, 7, 'E3') ? 'url(#arrow-red)' : 'url(#arrow-muted)'}
                  />
                  <text
                    x="306"
                    y="148"
                    textAnchor="middle"
                    className={`text-[11px] font-mono font-semibold ${
                      isEdgeActive(2, 7, 'E3') ? 'fill-rose-700' : 'fill-rose-400'
                    }`}
                  >
                    E3 (Plan pago)
                  </text>
                </g>

                {/* E6: 4 -> 7 */}
                <g>
                  <path
                    d="M 510 218 Q 485 168 468 126"
                    fill="none"
                    stroke={isEdgeActive(4, 7, 'E6') ? '#dc2626' : '#fca5a5'}
                    strokeWidth={isEdgeActive(4, 7, 'E6') ? 3 : 1.75}
                    markerEnd={isEdgeActive(4, 7, 'E6') ? 'url(#arrow-red)' : 'url(#arrow-muted)'}
                  />
                  <text
                    x="512"
                    y="168"
                    textAnchor="start"
                    className={`text-[11px] font-mono font-semibold ${
                      isEdgeActive(4, 7, 'E6') ? 'fill-rose-700' : 'fill-rose-400'
                    }`}
                  >
                    E6
                  </text>
                </g>

                {/* E8: 5 -> 7 */}
                <g>
                  <path
                    d="M 646 220 Q 595 142 500 96"
                    fill="none"
                    stroke={isEdgeActive(5, 7, 'E8') ? '#dc2626' : '#fca5a5'}
                    strokeWidth={isEdgeActive(5, 7, 'E8') ? 3 : 1.75}
                    markerEnd={isEdgeActive(5, 7, 'E8') ? 'url(#arrow-red)' : 'url(#arrow-muted)'}
                  />
                  <text
                    x="606"
                    y="146"
                    textAnchor="start"
                    className={`text-[11px] font-mono font-semibold ${
                      isEdgeActive(5, 7, 'E8') ? 'fill-rose-700' : 'fill-rose-400'
                    }`}
                  >
                    E8
                  </text>
                </g>

                {/* Reset E9: 7 -> 1 */}
                <g>
                  <path
                    d="M 404 74 Q 112 68 92 208"
                    fill="none"
                    stroke={isEdgeActive(7, 1, 'E9') ? '#0284c7' : '#cbd5e1'}
                    strokeWidth={isEdgeActive(7, 1, 'E9') ? 2.5 : 1.5}
                    strokeDasharray="5 4"
                    markerEnd={isEdgeActive(7, 1, 'E9') ? 'url(#arrow-blue)' : 'url(#arrow-muted)'}
                  />
                  <text x="195" y="96" textAnchor="middle" className="text-[11px] font-mono fill-slate-500">
                    E9: Cerrar (X) / Volver al inicio
                  </text>
                </g>

                {/* Reset E9: 6 -> 1 */}
                <g>
                  <path
                    d="M 815 303 Q 452 368 95 302"
                    fill="none"
                    stroke={isEdgeActive(6, 1, 'E9') ? '#0284c7' : '#cbd5e1'}
                    strokeWidth={isEdgeActive(6, 1, 'E9') ? 2.5 : 1.5}
                    strokeDasharray="5 4"
                    markerEnd={isEdgeActive(6, 1, 'E9') ? 'url(#arrow-blue)' : 'url(#arrow-muted)'}
                  />
                  <text x="452" y="352" textAnchor="middle" className="text-[11px] font-mono fill-slate-500">
                    E9: Regresar al inicio
                  </text>
                </g>

                {/* State Nodes */}
                {REPLIT_STATES.map((st) => {
                  const isCurrent = st.id === currentState;
                  const visited = isNodeVisited(st.id);
                  const isErrorNode = st.type === 'final-error';
                  const isFinal = st.type === 'final-success' || st.type === 'final-error';

                  const fill = isCurrent
                    ? isErrorNode
                      ? '#fee2e2'
                      : st.type === 'final-success'
                        ? '#d1fae5'
                        : '#e0f2fe'
                    : visited
                      ? '#ffffff'
                      : '#f8fafc';

                  const stroke = isCurrent
                    ? isErrorNode
                      ? '#dc2626'
                      : st.type === 'final-success'
                        ? '#059669'
                        : '#0284c7'
                    : isErrorNode
                      ? '#f87171'
                      : visited
                        ? '#0284c7'
                        : '#94a3b8';

                  return (
                    <g key={st.id}>
                      {isFinal && (
                        <circle
                          cx={st.x}
                          cy={st.y}
                          r={46}
                          fill="none"
                          stroke={stroke}
                          strokeWidth={isCurrent ? 2 : 1.2}
                          opacity={0.7}
                        />
                      )}
                      <circle
                        cx={st.x}
                        cy={st.y}
                        r={40}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={isCurrent ? 3 : 1.75}
                      />
                      <text
                        x={st.x}
                        y={st.y - 8}
                        textAnchor="middle"
                        className={`text-xs font-mono font-bold ${
                          isErrorNode ? 'fill-rose-800' : isCurrent ? 'fill-sky-900' : 'fill-slate-800'
                        }`}
                      >
                        ({st.id})
                      </text>
                      <text
                        x={st.x}
                        y={st.y + 9}
                        textAnchor="middle"
                        className="text-[11px] font-semibold fill-slate-700"
                      >
                        {st.shortName}
                      </text>
                      {isCurrent && (
                        <text
                          x={st.x}
                          y={st.y + 24}
                          textAnchor="middle"
                          className={`text-[9px] font-mono font-semibold ${
                            isErrorNode ? 'fill-rose-700' : 'fill-sky-700'
                          }`}
                        >
                          ACTIVO
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3 text-xs text-slate-600">
              <div className="flex flex-wrap items-center gap-4">
                <span>Azul: flujo principal esperado</span>
                <span>·</span>
                <span>Rojo: bloqueo / error real</span>
                <span>·</span>
                <span>Doble círculo: estado final</span>
              </div>
              <div className="font-mono text-xs text-slate-800 tabular-nums">
                Secuencia actual: <strong className="text-sky-800">{history.join(' → ')}</strong>
              </div>
            </div>
          </div>

          {/* Right Zone: Control Deck & Simulated Replit Monitor */}
          <div className="lg:col-span-5 p-5 flex flex-col justify-between gap-5 bg-white">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono text-slate-500">
                  Estado actual ({currentStateObj.id})
                </p>
                <h3 className="mt-0.5 text-lg font-semibold text-slate-900">{currentStateObj.name}</h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">{currentStateObj.description}</p>
              </div>

              {/* Simulated Replit feedback screen */}
              <div
                className={`rounded-lg border p-3.5 text-xs space-y-1.5 ${
                  currentState === 7
                    ? 'border-rose-200 bg-rose-50 text-rose-950'
                    : currentState === 6
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                      : 'border-slate-200 bg-slate-900 text-slate-100'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold">
                  {currentState === 7 ? (
                    <AlertOctagon className="h-4 w-4 text-rose-600 shrink-0" />
                  ) : currentState === 6 ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Terminal className="h-4 w-4 text-sky-400 shrink-0" />
                  )}
                  <span>
                    {lastEvent
                      ? lastEvent.screenTitle
                      : activeScenario === 'cp2'
                        ? 'Replit · Ruta Import → Empty'
                        : 'Replit Dashboard · Cuenta gratuita'}
                  </span>
                </div>
                <p
                  className={`leading-relaxed ${
                    currentState === 7
                      ? 'text-rose-800'
                      : currentState === 6
                        ? 'text-emerald-800'
                        : 'text-slate-300'
                  }`}
                >
                  {lastEvent
                    ? activeScenario === 'cp2' && lastEvent.code === 'E3'
                      ? 'Alerta roja en esquina inferior derecha: "The Starter plan is unavailable. Choose a paid plan to continue." (a pesar de mostrar "You have 10 free apps left").'
                      : lastEvent.screenDetail
                    : 'Sesión iniciada en replit.com/~. Seleccioná un evento abajo para avanzar en la máquina de estados.'}
                </p>
              </div>

              {/* Available Event Buttons */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-700">
                  Eventos aplicables desde el estado ({currentState}):
                </p>
                <div className="space-y-2">
                  {availableEvents.map((ev) => (
                    <button
                      key={`${ev.from}-${ev.to}-${ev.code}`}
                      type="button"
                      onClick={() => triggerEvent(ev)}
                      className={`w-full flex items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium transition-colors ${
                        ev.kind === 'error'
                          ? 'border-rose-200 bg-rose-50/50 text-rose-900 hover:bg-rose-50 hover:border-rose-300'
                          : ev.kind === 'reset'
                            ? 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                            : 'border-sky-200 bg-sky-50/60 text-sky-950 hover:bg-sky-100/70'
                      }`}
                    >
                      <span className="leading-snug">
                        <span className="font-mono font-semibold">{ev.code}:</span> {ev.label}
                      </span>
                      <span className="font-mono text-xs shrink-0 opacity-80">→ ({ev.to})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 text-xs text-slate-500 space-y-1 font-mono tabular-nums">
              <div className="flex justify-between">
                <span>Secuencia esperada CP1:</span>
                <span className="text-slate-700">1 → 2 → 3 → 4 → 5 → 6</span>
              </div>
              <div className="flex justify-between">
                <span>Secuencia real CP1 / CP2:</span>
                <span className="text-rose-700 font-semibold">1 → 2 → 7 (Fallido)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-tabs for Test Cases & Transition Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-3.5">
          <h2 className="text-base font-semibold text-slate-900">Documentación técnica de Caja Negra</h2>
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={detailTab === 'casos'}
              onClick={() => setDetailTab('casos')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                detailTab === 'casos' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Casos de prueba (2)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={detailTab === 'tabla'}
              onClick={() => setDetailTab('tabla')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                detailTab === 'tabla' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tabla de transición de estados
            </button>
          </div>
        </div>

        {detailTab === 'casos' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            {BLACKBOX_TEST_CASES.map((tc) => (
              <article key={tc.id} className="p-5 space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-mono font-semibold text-sky-700">{tc.id}</p>
                    <h3 className="mt-0.5 text-sm sm:text-base font-semibold text-slate-900">{tc.title}</h3>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 whitespace-nowrap shrink-0">
                    <XCircle className="h-4 w-4" aria-hidden="true" />
                    <span>{tc.status}</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-slate-600 tabular-nums">
                  <span>Esperada: {tc.expectedSeq}</span>
                  <span>·</span>
                  <span className="text-rose-700 font-semibold">Obtenida: {tc.actualSeq}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{tc.description}</p>

                <div className="space-y-1 text-xs">
                  <p className="font-semibold text-slate-800">Pasos ejecutados ({tc.data}):</p>
                  <ul className="space-y-1 text-slate-600 pl-4 list-disc">
                    {tc.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-xs">
                    <p className="font-semibold text-slate-800">Resultado esperado</p>
                    <p className="mt-1 text-slate-600 leading-relaxed">{tc.expected}</p>
                  </div>
                  <div className="rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs">
                    <p className="font-semibold text-rose-900">Resultado obtenido</p>
                    <p className="mt-1 text-rose-800 leading-relaxed">{tc.obtained}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto p-4">
            <table className="w-full text-center text-xs sm:text-sm border-collapse tabular-nums">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-semibold">
                  <th className="px-3 py-2.5 text-left">Estado actual</th>
                  {TRANSITION_COLUMNS.map((col) => (
                    <th key={col} className="px-2.5 py-2.5 font-mono">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {REPLIT_STATES.map((st) => {
                  const isCurrent = st.id === currentState;
                  return (
                    <tr key={st.id} className={isCurrent ? 'bg-sky-50/80' : 'hover:bg-slate-50/70'}>
                      <td className="px-3 py-2.5 text-left font-medium text-slate-900 whitespace-nowrap">
                        {st.name} <span className="font-mono text-slate-500">({st.id})</span>
                      </td>
                      {TRANSITION_COLUMNS.map((col) => {
                        const target = TRANSITION_MATRIX[st.id]?.[col];
                        return (
                          <td
                            key={col}
                            className={`px-2.5 py-2.5 font-mono ${
                              target === 7
                                ? 'font-semibold text-rose-700'
                                : target
                                  ? 'font-semibold text-sky-800'
                                  : 'text-slate-300'
                            }`}
                          >
                            {target ? `(${target})` : '—'}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-slate-500">
              Referencia: «—» indica que el evento no aplica en ese estado. La fila resaltada coincide con el estado activo del simulador.
            </p>
          </div>
        )}
      </div>

      <EvidenceGallery items={BLACKBOX_EVIDENCE} sectionLabel="Pruebas de Caja Negra (Replit)" />
    </div>
  );
}
