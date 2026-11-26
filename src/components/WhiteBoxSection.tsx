import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Info,
  Play,
  RotateCcw,
} from 'lucide-react';
import {
  BASIC_PATHS,
  GFC_EDGES,
  GFC_NODES,
  PYTHON_CODE_LINES,
  WHITEBOX_EVIDENCE,
  WHITEBOX_TEST_CASES,
  traceDiasDelMes,
} from '../data/tpData';
import { EvidenceGallery } from './EvidenceGallery';

type WhiteBoxTab = 'caminos' | 'casos' | 'formulas';

const REGIONS = [
  { id: 'R1', x: 170, y: 128 },
  { id: 'R2', x: 182, y: 405 },
  { id: 'R3', x: 356, y: 274 },
  { id: 'R4', x: 382, y: 492 },
  { id: 'R5', x: 506, y: 408 },
  { id: 'R6', x: 486, y: 498 },
  { id: 'R7', x: 526, y: 558 },
  { id: 'R8 (exterior)', x: 545, y: 185 },
];

export function WhiteBoxSection() {
  const [mesInput, setMesInput] = useState<string>('2');
  const [anioInput, setAnioInput] = useState<string>('2024');
  const [activeParams, setActiveParams] = useState<{ mes: number; anio: number }>({ mes: 2, anio: 2024 });
  const [stepLimit, setStepLimit] = useState<number>(99);
  const [coveredPaths, setCoveredPaths] = useState<string[]>(['C5']);
  const [activeTab, setActiveTab] = useState<WhiteBoxTab>('caminos');

  const trace = useMemo(
    () => traceDiasDelMes(activeParams.mes, activeParams.anio),
    [activeParams.mes, activeParams.anio]
  );

  const visibleStepCount = Math.min(stepLimit, trace.steps.length);
  const visibleNodes = trace.nodes.slice(0, visibleStepCount);
  const currentStep = trace.steps[visibleStepCount - 1];
  const isComplete = visibleStepCount >= trace.steps.length;

  const executeTest = (mes: number, anio: number, stepByStep = false) => {
    const safeMes = Number.isFinite(mes) ? Math.trunc(mes) : 0;
    const safeAnio = Number.isFinite(anio) ? Math.trunc(anio) : 2024;
    setMesInput(String(safeMes));
    setAnioInput(String(safeAnio));
    setActiveParams({ mes: safeMes, anio: safeAnio });
    setStepLimit(stepByStep ? 1 : 99);
    const result = traceDiasDelMes(safeMes, safeAnio);
    setCoveredPaths((prev) => (prev.includes(result.matchedPathId) ? prev : [...prev, result.matchedPathId]));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeTest(Number(mesInput), Number(anioInput), false);
  };

  const isEdgeTraversed = (from: number, to: number) => {
    for (let i = 0; i < visibleNodes.length - 1; i++) {
      if (visibleNodes[i] === from && visibleNodes[i + 1] === to) return true;
    }
    return false;
  };

  const nodeMap = useMemo(() => {
    const map = new Map<number, (typeof GFC_NODES)[number]>();
    GFC_NODES.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  const getEdgePath = (fromId: number, toId: number) => {
    const a = nodeMap.get(fromId)!;
    const b = nodeMap.get(toId)!;
    if (fromId === 3 && toId === 13) {
      return {
        d: `M ${a.x} ${a.y + 20} L ${a.x} ${b.y} L ${b.x - 22} ${b.y}`,
        lx: a.x + 12,
        ly: (a.y + b.y) / 2,
      };
    }
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.hypot(dx, dy) || 1;
    const r = 20;
    const sx = a.x + (dx / dist) * r;
    const sy = a.y + (dy / dist) * r;
    const ex = b.x - (dx / dist) * (r + 3);
    const ey = b.y - (dy / dist) * (r + 3);
    const mx = (sx + ex) / 2;
    const my = (sy + ey) / 2;
    // Slight perpendicular offset for branch label V / F
    const ox = (-dy / dist) * 12;
    const oy = (dx / dist) * 12;
    return {
      d: `M ${sx.toFixed(1)} ${sy.toFixed(1)} L ${ex.toFixed(1)} ${ey.toFixed(1)}`,
      lx: mx + ox,
      ly: my + oy,
    };
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-medium text-sky-700">
          04. Pruebas de Caja Blanca · Prueba del Camino Básico y Complejidad Ciclomática
        </p>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            Módulo <code className="font-mono text-sky-800">dias_del_mes(mes, anio)</code> — GFC y V(G) = 8
          </h1>
          <span className="text-xs font-mono text-slate-600 tabular-nums">
            N = 13 · E = 19 · P = 7 · Regiones = 8
          </span>
        </div>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Ingresá distintos valores de <code className="font-mono text-slate-800">mes</code> y{' '}
          <code className="font-mono text-slate-800">anio</code> para ejecutar la función real, observar el recorrido exacto sobre el Grafo de Flujo de Control y cubrir los 8 caminos básicos independientes.
        </p>
      </header>

      {/* Two-Zone White-Box Interactive Lab */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-3.5">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Laboratorio interactivo de Caja Blanca (GFC en vivo)
            </h2>
            <p className="text-xs text-slate-500">
              Probá los 3 casos documentados en el TP o descubrí valores para cubrir los 8 caminos básicos.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {WHITEBOX_TEST_CASES.map((tc) => (
              <button
                key={tc.id}
                type="button"
                onClick={() => executeTest(tc.mes, tc.anio, false)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 font-mono tabular-nums ${
                  activeParams.mes === tc.mes && activeParams.anio === tc.anio
                    ? 'border-sky-300 bg-sky-50 text-sky-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Play className="h-3 w-3" />
                <span>
                  {tc.pathId}: ({tc.mes}, {tc.anio})
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Zone: Interactive SVG GFC */}
          <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/50 p-4 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 text-xs text-slate-600">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-full border-2 border-sky-600 bg-sky-50" />
                  Predicado (7)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-full border border-slate-400 bg-white" />
                  Proceso / Salida (6)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setStepLimit((s) => Math.max(1, Math.min(s, trace.steps.length) - 1))}
                  disabled={visibleStepCount <= 1}
                  aria-label="Paso anterior"
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 whitespace-nowrap shrink-0"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Anterior</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStepLimit((s) => (s >= trace.steps.length ? 1 : s + 1))}
                  className="inline-flex items-center gap-1 rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-900 hover:bg-sky-100 whitespace-nowrap shrink-0"
                >
                  <span>{isComplete ? 'Paso a paso' : 'Siguiente paso'}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
                {!isComplete && (
                  <button
                    type="button"
                    onClick={() => setStepLimit(99)}
                    className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
                  >
                    Ver todo
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <svg
                viewBox="0 0 650 670"
                className="w-full max-w-[540px] mx-auto h-auto select-none"
                role="img"
                aria-label="Grafo de Flujo de Control interactivo de dias_del_mes"
              >
                <defs>
                  <marker id="gfc-arrow-muted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#cbd5e1" />
                  </marker>
                  <marker id="gfc-arrow-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
                  </marker>
                </defs>

                {/* Region markers R1-R8 */}
                {REGIONS.map((r) => (
                  <text
                    key={r.id}
                    x={r.x}
                    y={r.y}
                    textAnchor="middle"
                    className="text-[11px] italic fill-slate-400 font-serif"
                  >
                    {r.id}
                  </text>
                ))}

                {/* Edges */}
                {GFC_EDGES.map((edge) => {
                  const active = isEdgeTraversed(edge.from, edge.to);
                  const { d, lx, ly } = getEdgePath(edge.from, edge.to);
                  return (
                    <g key={`${edge.from}-${edge.to}`}>
                      <path
                        d={d}
                        fill="none"
                        stroke={active ? '#0284c7' : '#cbd5e1'}
                        strokeWidth={active ? 3 : 1.5}
                        markerEnd={active ? 'url(#gfc-arrow-active)' : 'url(#gfc-arrow-muted)'}
                      />
                      {edge.branch && (
                        <text
                          x={lx}
                          y={ly}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className={`text-[11px] font-mono font-bold ${
                            active ? 'fill-sky-700' : 'fill-slate-400'
                          }`}
                        >
                          {edge.branch}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Nodes */}
                {GFC_NODES.map((node) => {
                  const isVisited = visibleNodes.includes(node.id);
                  const isCurrent = currentStep?.nodeId === node.id;

                  const fill = isCurrent
                    ? '#0284c7'
                    : isVisited
                      ? '#e0f2fe'
                      : node.isPredicate
                        ? '#f8fafc'
                        : '#ffffff';

                  const stroke = isCurrent
                    ? '#0369a1'
                    : isVisited
                      ? '#0284c7'
                      : node.isPredicate
                        ? '#64748b'
                        : '#cbd5e1';

                  const labelPos = (() => {
                    if (node.id === 3 || node.id === 5 || node.id === 10 || node.id === 12 || node.id === 8) {
                      return { x: node.x - 27, y: node.y + 4, anchor: 'end' as const };
                    }
                    if (node.id === 13) {
                      return { x: node.x, y: node.y + 34, anchor: 'middle' as const };
                    }
                    return { x: node.x + 27, y: node.y + 4, anchor: 'start' as const };
                  })();

                  return (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={19}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={isCurrent ? 3 : node.isPredicate ? 2 : 1.5}
                      />
                      <text
                        x={node.x}
                        y={node.y + 4}
                        textAnchor="middle"
                        className={`text-xs font-mono font-bold ${
                          isCurrent ? 'fill-white' : isVisited ? 'fill-sky-900' : 'fill-slate-700'
                        }`}
                      >
                        {node.label}
                      </text>
                      {node.condition && (
                        <text
                          x={labelPos.x}
                          y={labelPos.y}
                          textAnchor={labelPos.anchor}
                          className={`text-[11px] font-mono ${
                            isCurrent
                              ? 'fill-sky-900 font-semibold'
                              : isVisited
                                ? 'fill-slate-800'
                                : 'fill-slate-500'
                          }`}
                        >
                          {node.condition}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Right Zone: Input Tester, Python Code Tracer & 8-Path Coverage */}
          <div className="lg:col-span-6 p-5 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              {/* Interactive Parameter Form */}
              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-4">
                  <label htmlFor="wb-mes" className="block text-xs font-medium text-slate-700 mb-1">
                    mes (entero)
                  </label>
                  <input
                    id="wb-mes"
                    type="number"
                    value={mesInput}
                    onChange={(e) => setMesInput(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono tabular-nums text-slate-900 focus:border-sky-600 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="wb-anio" className="block text-xs font-medium text-slate-700 mb-1">
                    anio (entero)
                  </label>
                  <input
                    id="wb-anio"
                    type="number"
                    value={anioInput}
                    onChange={(e) => setAnioInput(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono tabular-nums text-slate-900 focus:border-sky-600 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-4 flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-sky-700 px-3 py-2 text-xs sm:text-sm font-medium text-white hover:bg-sky-800 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Play className="h-3.5 w-3.5" />
                    <span>Ejecutar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => executeTest(Number(mesInput), Number(anioInput), true)}
                    title="Ejecutar desde el nodo 1 paso a paso"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-slate-700 hover:bg-slate-50 transition-colors shrink-0"
                    aria-label="Reiniciar paso a paso"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </form>

              {/* Execution Result Banner */}
              <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4 space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-xs font-mono text-slate-600 tabular-nums">
                    dias_del_mes({trace.mes}, {trace.anio}) →{' '}
                    <strong className="text-base text-sky-800">retorna {trace.result}</strong>
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Camino {trace.matchedPathId}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-700">
                  <span className="font-semibold">Escenario:</span> {trace.matchedPathDesc}
                </p>
                <p className="text-xs font-mono text-slate-600 tabular-nums">
                  Recorrido ({visibleStepCount}/{trace.nodes.length}):{' '}
                  <span className="text-slate-900 font-medium">{visibleNodes.join(' → ')}</span>
                </p>
                {currentStep && (
                  <p className="text-xs text-sky-900 bg-sky-50 border border-sky-200 rounded-md px-2.5 py-1.5 font-mono">
                    Nodo {currentStep.nodeId}: {currentStep.evaluation}
                  </p>
                )}
              </div>

              {/* Synchronized Python Code */}
              <div className="rounded-lg border border-slate-800 bg-slate-950 p-3.5 overflow-x-auto">
                <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 mb-2 border-b border-slate-800 font-mono">
                  <span>dias_del_mes.py</span>
                  <span>Línea activa: {currentStep?.codeLine ?? 1}</span>
                </div>
                <pre className="text-xs leading-6 font-mono text-slate-200">
                  {PYTHON_CODE_LINES.map((line, index) => {
                    const lineNum = index + 1;
                    const isActive = currentStep?.codeLine === lineNum;
                    return (
                      <div
                        key={lineNum}
                        className={`flex gap-3 px-2 rounded-xs ${
                          isActive ? 'bg-sky-500/25 text-white' : ''
                        }`}
                      >
                        <span className="w-4 text-right text-slate-500 select-none tabular-nums">
                          {lineNum}
                        </span>
                        <code>{line}</code>
                      </div>
                    );
                  })}
                </pre>
              </div>
            </div>

            {/* Interactive 8-Path Coverage Challenge */}
            <div className="border-t border-slate-200 pt-4 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-slate-900">
                  Cobertura de caminos básicos en esta sesión
                </p>
                <span className="text-xs font-mono font-semibold text-sky-800 tabular-nums">
                  {coveredPaths.length} / 8 cubiertos
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                {BASIC_PATHS.map((path) => {
                  const isCovered = coveredPaths.includes(path.id);
                  const isCurrent = trace.matchedPathId === path.id;
                  return (
                    <button
                      key={path.id}
                      type="button"
                      onClick={() => executeTest(path.sampleMes, path.sampleAnio, false)}
                      title={`${path.id}: ${path.description} (ej. mes=${path.sampleMes}, anio=${path.sampleAnio})`}
                      className={`rounded-md border px-2 py-1.5 text-xs font-mono font-semibold transition-colors tabular-nums ${
                        isCurrent
                          ? 'border-sky-600 bg-sky-700 text-white'
                          : isCovered
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {path.id}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-500">
                Hacé clic en cualquier camino (C1–C8) para probar un ejemplo automáticamente, o ingresá tus propios datos arriba.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-tabs for Basic Paths, TP Test Cases, and V(G) Formulas */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-3.5">
          <h2 className="text-base font-semibold text-slate-900">Desarrollo teórico y casos de prueba</h2>
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1" role="tablist">
            {(
              [
                { id: 'caminos', label: 'Caminos básicos (8)' },
                { id: 'casos', label: 'Casos del TP (3)' },
                { id: 'formulas', label: 'Cálculo V(G) = 8' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === tab.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'caminos' && (
          <div className="p-4 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse tabular-nums">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                    <th className="px-3.5 py-2.5">Camino</th>
                    <th className="px-3.5 py-2.5">Recorrido de nodos</th>
                    <th className="px-3.5 py-2.5">Qué representa</th>
                    <th className="px-3.5 py-2.5">Ejemplo</th>
                    <th className="px-3.5 py-2.5 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {BASIC_PATHS.map((p) => (
                    <tr
                      key={p.id}
                      className={trace.matchedPathId === p.id ? 'bg-sky-50/70' : 'hover:bg-slate-50/70'}
                    >
                      <td className="px-3.5 py-2.5 font-mono font-semibold text-slate-900">
                        {p.id}
                        {p.documentedInTp && (
                          <span className="ml-2 text-[11px] font-sans font-normal text-sky-700">
                            (En TP)
                          </span>
                        )}
                      </td>
                      <td className="px-3.5 py-2.5 font-mono text-slate-700 whitespace-nowrap">
                        {p.nodes.join(' → ')}
                      </td>
                      <td className="px-3.5 py-2.5 text-slate-700">{p.description}</td>
                      <td className="px-3.5 py-2.5 font-mono text-xs text-slate-600 whitespace-nowrap">
                        ({p.sampleMes}, {p.sampleAnio}) → {p.expectedReturn}
                      </td>
                      <td className="px-3.5 py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => executeTest(p.sampleMes, p.sampleAnio, false)}
                          className="text-xs font-medium text-sky-700 hover:text-sky-900 hover:underline whitespace-nowrap"
                        >
                          Probar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
              <Info className="h-4 w-4 text-sky-700 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="leading-relaxed">
                <strong className="font-semibold text-slate-900">Camino imposible (7 → 9 → 10):</strong> un año no divisible por 4 nunca puede ser divisible por 400. Aunque esa ruta existe topológicamente en el grafo, ningún dato real la ejecuta y no afecta al conjunto básico porque la arista <code className="font-mono">9 → 10</code> ya se cubre en C6.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'casos' && (
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {WHITEBOX_TEST_CASES.map((tc) => (
              <article key={tc.id} className="p-5 flex flex-col justify-between gap-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-sky-700">
                      {tc.id} · {tc.pathId}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Exitoso</span>
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">{tc.title}</h3>
                  <p className="text-xs font-mono text-slate-500 tabular-nums">{tc.sequence}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{tc.note}</p>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs font-mono space-y-1 tabular-nums">
                    <div>Datos: mes = {tc.mes}, anio = {tc.anio}</div>
                    <div>Esperado: {tc.expected} · Obtenido: {tc.obtained}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => executeTest(tc.mes, tc.anio, true)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-medium text-sky-900 hover:bg-sky-100 transition-colors whitespace-nowrap"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>Trazar paso a paso en el GFC</span>
                </button>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'formulas' && (
          <div className="p-5 space-y-4">
            <p className="text-sm text-slate-600">
              Las tres fórmulas coinciden en <strong className="font-mono text-slate-900">V(G) = 8</strong>, lo que valida que el Grafo de Flujo de Control está correctamente construido.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-1.5">
                <p className="text-xs font-semibold text-slate-700">Fórmula 1 · Por regiones</p>
                <p className="font-mono text-lg font-bold text-sky-800 tabular-nums">V(G) = 8</p>
                <p className="text-xs text-slate-600">7 regiones encerradas (R1 a R7) + 1 región exterior (R8).</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-1.5">
                <p className="text-xs font-semibold text-slate-700">Fórmula 2 · Aristas y nodos</p>
                <p className="font-mono text-lg font-bold text-sky-800 tabular-nums">E − N + 2 = 19 − 13 + 2 = 8</p>
                <p className="text-xs text-slate-600">19 aristas dirigidas y 13 nodos (del 1 al 13).</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-1.5">
                <p className="text-xs font-semibold text-slate-700">Fórmula 3 · Nodos predicado</p>
                <p className="font-mono text-lg font-bold text-sky-800 tabular-nums">P + 1 = 7 + 1 = 8</p>
                <p className="text-xs text-slate-600">Predicados: nodos 1, 2, 4, 6, 7, 8 y 9 (cada uno con salidas V y F).</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <EvidenceGallery items={WHITEBOX_EVIDENCE} sectionLabel="Pruebas de Caja Blanca (dias_del_mes)" />
    </div>
  );
}
