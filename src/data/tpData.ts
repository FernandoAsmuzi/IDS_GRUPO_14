export interface EvidenceItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  tag: string;
}

export interface GroupMember {
  name: string;
  dni?: string;
  lu: string;
}

export const GROUP_MEMBERS: GroupMember[] = [
  { name: 'Ramos, Evelyn N.', dni: '41.469.129', lu: 'LIE 00216' },
  { name: 'Romero, Facundo José', dni: '44.898.160', lu: 'LIE000060' },
  { name: 'Virreyra Ruiz, Josue Natanael', dni: '44.857.371', lu: 'PUI000014' },
  { name: 'Ruiz, Adriana Valeria', lu: 'LIE 241' },
  { name: 'Asmuzi, Fernando Francisco', dni: '38.408.534', lu: 'LIE000092' },
  { name: 'Quirós, José Daniel', dni: '31.202.001', lu: 'LIE000051' },
];

export type HeuristicStatus = 'cumple' | 'observacion' | 'parcial';

export interface NielsenHeuristic {
  number: number;
  title: string;
  status: HeuristicStatus;
  statusLabel: string;
  findings: string[];
  observation?: string;
}

export const USABILITY_HEURISTICS: NielsenHeuristic[] = [
  {
    number: 1,
    title: 'Visibilidad del estado del sistema',
    status: 'cumple',
    statusLabel: 'Cumple',
    findings: [
      'Al guardar un proyecto, muestra mensajes inmediatos como "Guardando proyecto..." y "Proyecto guardado".',
      'Durante la ejecución, los bloques activos se iluminan con un borde amarillo brillante en tiempo real.',
      'Al pulsar la bandera verde cambia su estado visual y se activa el botón rojo de detención.',
    ],
  },
  {
    number: 2,
    title: 'Coincidencia entre el sistema y el mundo real',
    status: 'cumple',
    statusLabel: 'Cumple',
    findings: [
      'Utiliza metáforas visuales familiares: bloques encastrables como piezas de rompecabezas o ladrillos.',
      'Emplea conceptos cotidianos como "Escenario", "Disfraces", "Sonidos", "Mover 10 pasos" o "Decir Hola".',
      'El inicio es una bandera verde y la parada un octágono rojo (señal universal de Pare).',
    ],
  },
  {
    number: 3,
    title: 'Control y libertad del usuario',
    status: 'observacion',
    statusLabel: 'Cumple con observación',
    findings: [
      'Con clic derecho en el área de trabajo ofrece "Deshacer" y "Rehacer", además de los atajos Ctrl + Z / Ctrl + Y.',
      'Permite eliminar bloques arrastrándolos a la paleta lateral y ofrece "Restaurar" en el menú Editar.',
    ],
    observation:
      'No posee botones visibles de Deshacer / Rehacer en la barra superior (quedan ocultos en el menú contextual).',
  },
  {
    number: 4,
    title: 'Coherencia y estándares',
    status: 'cumple',
    statusLabel: 'Cumple',
    findings: [
      'Coherencia interna: código de colores estricto y constante por categoría (azul Movimiento, violeta Apariencia, amarillo Control).',
      'Coherencia externa: logotipo superior izquierdo para inicio, búsqueda superior, menú Archivo/Editar y pestañas Crear, Explorar, Ideas, Acerca de.',
    ],
  },
  {
    number: 5,
    title: 'Prevención de errores',
    status: 'cumple',
    statusLabel: 'Cumple',
    findings: [
      'Restricciones físicas (encastre): la geometría de los bloques impide errores de sintaxis (ej. bloque booleano hexagonal solo entra en ranuras hexagonales).',
      'Los campos numéricos (ej. grados de giro) validan la entrada para evitar caracteres incompatibles.',
    ],
  },
  {
    number: 6,
    title: 'Reconocimiento en lugar de recuerdo',
    status: 'cumple',
    statusLabel: 'Cumple',
    findings: [
      'Todos los comandos son visibles en la paleta lateral por categoría, color y texto descriptivo; no requiere memorizar sintaxis.',
      'Los valores predeterminados en cada bloque (ej. "mover 10 pasos") guían el tipo de dato esperado.',
    ],
  },
  {
    number: 7,
    title: 'Flexibilidad y eficiencia de uso',
    status: 'cumple',
    statusLabel: 'Cumple',
    findings: [
      'Novatos: pueden arrastrar y soltar bloques paso a paso con ratón o pantalla táctil.',
      'Expertos: duplican pilas con clic derecho, usan atajos, crean "Mis bloques" y reutilizan scripts mediante la "Mochila" inferior.',
    ],
  },
  {
    number: 8,
    title: 'Diseño estético y minimalista',
    status: 'cumple',
    statusLabel: 'Cumple',
    findings: [
      'Divide el editor en tres zonas funcionales claras: paleta de bloques, área de programación y escenario/objetos.',
      'En la portada prioriza proyectos destacados y el acceso directo a "Crear", con diseño limpio y alto contraste.',
    ],
  },
  {
    number: 9,
    title: 'Ayudar a reconocer, diagnosticar y recuperarse de errores',
    status: 'parcial',
    statusLabel: 'Cumple parcialmente',
    findings: [
      'Al intentar cargar un archivo corrupto o incompatible muestra el mensaje claro: "No se pudo cargar el proyecto".',
      'A favor: el menú "Depurar" abre la guía "Cómo salir del estancamiento" con estrategias para hallar errores lógicos.',
    ],
    observation:
      'Ante errores lógicos en ejecución (bucle infinito o división por cero), la interfaz no muestra ningún indicador ni alerta sobre dónde ocurre el fallo.',
  },
  {
    number: 10,
    title: 'Ayuda y documentación',
    status: 'cumple',
    statusLabel: 'Cumple',
    findings: [
      'Incluye el botón "Tutoriales" integrado en la barra superior del editor.',
      'Se abren en una ventana flotante dentro del mismo espacio de trabajo (ayuda en contexto) con animaciones paso a paso.',
    ],
  },
];

export const USABILITY_EVIDENCE: EvidenceItem[] = [
  {
    id: 'scratch-depurar',
    src: '/assets/evidencias/scratch_depurar.png',
    title: 'Guía de depuración "Cómo salir del estancamiento"',
    caption:
      'Ventana contextual abierta desde el menú Depurar en Scratch (Heurística N°9). Ofrece estrategias guiadas como "Leer en voz alta", "Desglósalo" y "Ve más lento".',
    tag: 'Heurística N°9',
  },
];

export interface AccessibilitySample {
  id: string;
  label: string;
  url: string;
  description: string;
  wave: {
    score: string;
    errors: string;
    contrast: string;
    alerts: string;
    structural: string;
  };
  taw: {
    problems: string;
    breakdown: string;
    contrast: string;
    warnings: string;
    unverified: string;
  };
}

export const ACCESSIBILITY_SAMPLES: AccessibilitySample[] = [
  {
    id: 'M1',
    label: 'M1: Home',
    url: 'www.nasa.gov',
    description:
      'Portal principal con alta densidad visual, menús multinivel, carruseles dinámicos y pie de página complejo.',
    wave: {
      score: '7.7 / 10',
      errors: '3 errores',
      contrast: '8 errores',
      alerts: '8 alertas',
      structural: '132 estr. · 42 ARIA',
    },
    taw: {
      problems: '21 problemas',
      breakdown: '7 perc. · 7 oper. · 5 comp. · 2 rob.',
      contrast: '1 rev. manual',
      warnings: '223 advertencias',
      unverified: '15 no verificados',
    },
  },
  {
    id: 'M2',
    label: 'M2: Blog',
    url: 'nasa.gov/blogs/spacestation/…',
    description:
      'Artículo editorial continuo con narrativa científica estructurada, fotografía de alta resolución y enlaces de contexto.',
    wave: {
      score: '8.7 / 10',
      errors: '5 errores',
      contrast: '1 error',
      alerts: '6 alertas',
      structural: '111 estr. · 68 ARIA',
    },
    taw: {
      problems: '24 problemas',
      breakdown: '6 perc. · 11 oper. · 5 comp. · 2 rob.',
      contrast: '1 rev. manual',
      warnings: '164 advertencias',
      unverified: '16 no verificados',
    },
  },
  {
    id: 'M3',
    label: 'M3: News',
    url: 'www.nasa.gov/news',
    description: 'Página de catálogo y archivo con listados paginados de noticias y tarjetas informativas.',
    wave: {
      score: '8.6 / 10',
      errors: '6 errores',
      contrast: '0 errores',
      alerts: '7 alertas',
      structural: '120 estr. · 41 ARIA',
    },
    taw: {
      problems: '28 problemas',
      breakdown: '9 perc. · 12 oper. · 5 comp. · 2 rob.',
      contrast: '1 rev. manual',
      warnings: '184 advertencias',
      unverified: '16 no verificados',
    },
  },
];

export const WCAG_COMMON_FAILURES = [
  {
    code: '1.1.1',
    level: 'Nivel A',
    name: 'Contenido no textual',
    detail:
      'Imágenes sin atributo alt, botones gráficos sin descripción y textos alternativos excesivamente largos (42 a 76 advertencias manuales por muestra).',
  },
  {
    code: '1.3.1',
    level: 'Nivel A',
    name: 'Información y relaciones',
    detail:
      'Falla sistemática de maquetación: elementos visuales que aparentan listas o encabezados carecen de etiquetas HTML semánticas subyacentes.',
  },
  {
    code: '2.4.4',
    level: 'Nivel A',
    name: 'Propósito de los enlaces en su contexto',
    detail:
      'Mayor concentración de fallas operativas: enlaces genéricos ("Read more"), nombres idénticos con destinos distintos e imágenes enlazadas sin texto.',
  },
  {
    code: '3.3.2',
    level: 'Nivel A',
    name: 'Etiquetas o instrucciones',
    detail:
      'Exactamente 5 problemas en cada página: cajas de búsqueda y formularios de suscripción en la plantilla global carecen de <label for="..."> vinculado.',
  },
  {
    code: '4.1.2',
    level: 'Nivel A',
    name: 'Nombre, función, valor',
    detail:
      'Exactamente 2 problemas en las 3 muestras: botones o controles dinámicos no exponen estados accesibles (aria-expanded, role) a lectores de pantalla.',
  },
];

export const MANUAL_KEYBOARD_FINDINGS = [
  {
    title: 'Visibilidad del foco (Excelente)',
    sentiment: 'positive' as const,
    detail:
      'Recuadro azul brillante de alto contraste visible tanto en fondos claros como oscuros, permitiendo ubicar el foco al instante.',
  },
  {
    title: 'Operabilidad de menús desplegables',
    sentiment: 'positive' as const,
    detail:
      'Se desplegaron menús con Enter y Espacio, navegando submenús con Tab y desplazando la página con flechas de dirección virtuales.',
  },
  {
    title: 'Ausencia de "Skip to content"',
    sentiment: 'issue' as const,
    detail:
      'Sin enlace visible para saltar bloques repetitivos: fue necesario presionar Tab reiteradamente para atravesar todo el menú superior.',
  },
  {
    title: 'Fatiga operativa en filtros de búsqueda',
    sentiment: 'issue' as const,
    detail:
      'En la galería de imágenes hubo que tabular por todas las casillas de verificación laterales antes de alcanzar los resultados.',
  },
  {
    title: 'Apertura de recursos en pestaña nueva',
    sentiment: 'neutral' as const,
    detail:
      'Las imágenes se abren en una pestaña nueva sin modales que atrapen el foco, aunque obliga a gestionar ventanas adicionales.',
  },
];

export const ACCESSIBILITY_EVIDENCE: EvidenceItem[] = [
  {
    id: 'nasa-wave-resumen',
    src: '/assets/evidencias/nasa_wave_resumen.png',
    title: 'Resumen de auditoría WAVE (M1: Home)',
    caption: 'Panel resumen de WAVE sobre www.nasa.gov: AIM Score 7.7/10, 3 errores, 8 errores de contraste y 8 alertas.',
    tag: 'WAVE · Resumen',
  },
  {
    id: 'nasa-wave-detalle',
    src: '/assets/evidencias/nasa_wave_detalle.png',
    title: 'Detalle de hallazgos WAVE',
    caption: 'Desglose técnico de los 3 botones vacíos, 8 fallas de muy bajo contraste y alertas estructurales detectadas por WAVE.',
    tag: 'WAVE · Detalle',
  },
  {
    id: 'nasa-taw-resumen',
    src: '/assets/evidencias/nasa_taw_resumen.png',
    title: 'Resumen TAW (WCAG 2.1 Nivel AA)',
    caption: 'Reporte TAW para la página principal de NASA: 21 problemas en 5 criterios de éxito, 223 advertencias y 15 puntos no verificados.',
    tag: 'TAW · WCAG 2.1 AA',
  },
  {
    id: 'nasa-teclado-virtual',
    src: '/assets/evidencias/nasa_teclado_virtual.png',
    title: 'Prueba manual con teclado en pantalla',
    caption: 'Verificación empírica navegando www.nasa.gov únicamente con el teclado virtual del sistema operativo accionado por puntero.',
    tag: 'Prueba Manual',
  },
  {
    id: 'nasa-onti-error',
    src: '/assets/evidencias/nasa_onti_error.png',
    title: 'Indisponibilidad del evaluador ONTI',
    caption: 'Evidencia de error ERR_CONNECTION_TIMED_OUT al intentar acceder a accesar.onti.argentina.gob.ar durante la auditoría.',
    tag: 'ONTI · Nota',
  },
];

// ======================== BLACK BOX (REPLIT) ========================

export interface StateNode {
  id: number;
  shortName: string;
  name: string;
  description: string;
  type: 'initial' | 'normal' | 'final-success' | 'final-error';
  x: number;
  y: number;
}

export interface StateEvent {
  code: string;
  label: string;
  shortLabel: string;
  from: number;
  to: number;
  kind: 'normal' | 'error' | 'reset';
  screenTitle: string;
  screenDetail: string;
}

export const REPLIT_STATES: StateNode[] = [
  {
    id: 1,
    shortName: 'Inicio',
    name: 'Pantalla de Inicio (Dashboard)',
    description: 'Usuario autenticado en el panel principal (replit.com/~).',
    type: 'initial',
    x: 90,
    y: 255,
  },
  {
    id: 2,
    shortName: 'Creando',
    name: 'Creando proyecto Python',
    description: 'Configuración del proyecto desde modo Free o ruta Import → Empty.',
    type: 'normal',
    x: 235,
    y: 255,
  },
  {
    id: 3,
    shortName: 'Editando',
    name: 'Editando código (IDE)',
    description: 'Entorno de desarrollo abierto con archivo .py listo para editar.',
    type: 'normal',
    x: 380,
    y: 255,
  },
  {
    id: 4,
    shortName: 'Ejecutando',
    name: 'Ejecutando código',
    description: 'El intérprete procesa el script Python al accionar el botón Run.',
    type: 'normal',
    x: 525,
    y: 255,
  },
  {
    id: 5,
    shortName: 'Salida',
    name: 'Código ejecutado (Consola)',
    description: 'El script finalizó correctamente y muestra la salida en consola.',
    type: 'normal',
    x: 670,
    y: 255,
  },
  {
    id: 6,
    shortName: 'Compartido',
    name: 'Enlace compartido — Éxito',
    description: 'El enlace del proyecto fue generado y copiado para compartir.',
    type: 'final-success',
    x: 815,
    y: 255,
  },
  {
    id: 7,
    shortName: 'Bloqueado / Error',
    name: 'Operación bloqueada / Error',
    description: 'Modal "Compare plans", alerta "The Starter plan is unavailable", error de código o restricción al compartir.',
    type: 'final-error',
    x: 452,
    y: 78,
  },
];

export const REPLIT_EVENTS: StateEvent[] = [
  {
    code: 'E1',
    label: 'Iniciar creación de proyecto (modo Free o Import → Empty)',
    shortLabel: 'E1: Iniciar creación',
    from: 1,
    to: 2,
    kind: 'normal',
    screenTitle: 'Panel de creación de proyecto',
    screenDetail: 'Entrada: "Python script print hola" (Modo Free) o ruta /import/empty ("You have 10 free apps left").',
  },
  {
    code: 'E2',
    label: 'Confirmar creación (con plan habilitado)',
    shortLabel: 'E2: Confirmar creación',
    from: 2,
    to: 3,
    kind: 'normal',
    screenTitle: 'IDE de Python listo (main.py)',
    screenDetail: 'El entorno de desarrollo se inicializó correctamente con el editor de código activo.',
  },
  {
    code: 'E3',
    label: 'Restricción de plan pago ("Compare plans" / "Starter plan is unavailable")',
    shortLabel: 'E3: Restricción plan pago',
    from: 2,
    to: 7,
    kind: 'error',
    screenTitle: 'Bloqueo de suscripción detectado',
    screenDetail:
      'Se despliega "Compare plans" (Core $20/mes, Pro $100/mes) o alerta roja: "The Starter plan is unavailable. Choose a paid plan to continue."',
  },
  {
    code: 'E4',
    label: 'Escribir código Python y presionar Run',
    shortLabel: 'E4: Presionar Run',
    from: 3,
    to: 4,
    kind: 'normal',
    screenTitle: 'Ejecutando main.py…',
    screenDetail: 'print("hola") enviado al intérprete de Python en la nube.',
  },
  {
    code: 'E5',
    label: 'Ejecución finalizada sin errores',
    shortLabel: 'E5: Ejecución exitosa',
    from: 4,
    to: 5,
    kind: 'normal',
    screenTitle: 'Salida en consola: hola',
    screenDetail: 'Proceso finalizado con código de salida 0. Listo para compartir enlace.',
  },
  {
    code: 'E6',
    label: 'Error de sintaxis o tiempo de ejecución',
    shortLabel: 'E6: Error de código',
    from: 4,
    to: 7,
    kind: 'error',
    screenTitle: 'Error en ejecución de Python',
    screenDetail: 'SyntaxError o excepción en tiempo de ejecución interrumpe el flujo normal.',
  },
  {
    code: 'E7',
    label: 'Presionar Share y copiar enlace',
    shortLabel: 'E7: Compartir enlace',
    from: 5,
    to: 6,
    kind: 'normal',
    screenTitle: 'Enlace copiado al portapapeles',
    screenDetail: 'URL pública generada y lista para compartir. Operación completada con éxito.',
  },
  {
    code: 'E8',
    label: 'Error o falta de permisos al compartir',
    shortLabel: 'E8: Error al compartir',
    from: 5,
    to: 7,
    kind: 'error',
    screenTitle: 'Restricción al compartir proyecto',
    screenDetail: 'No se pudo generar el enlace por falta de permisos o límite del plan.',
  },
  {
    code: 'E9',
    label: 'Cerrar ventana (X) / Regresar al inicio',
    shortLabel: 'E9: Volver al inicio',
    from: 7,
    to: 1,
    kind: 'reset',
    screenTitle: 'Regreso al Dashboard',
    screenDetail: 'Al cerrar el modal con X y volver al inicio, un reintento en cuenta gratuita vuelve a bloquearse.',
  },
  {
    code: 'E9',
    label: 'Regresar al inicio',
    shortLabel: 'E9: Volver al inicio',
    from: 6,
    to: 1,
    kind: 'reset',
    screenTitle: 'Regreso al Dashboard',
    screenDetail: 'Retorno al panel principal tras finalizar la operación exitosamente.',
  },
];

export const BLACKBOX_TEST_CASES = [
  {
    id: 'REP_PY_1',
    title: 'Crear proyecto en Python desde el panel principal en modo Free, ejecutar y compartir enlace',
    expectedSeq: '1 → 2 → 3 → 4 → 5 → 6',
    actualSeq: '1 → 2 → 7',
    description:
      'Comprobar si un usuario con cuenta gratuita puede crear un proyecto en Python desde el panel principal, ejecutar el código y compartir el enlace.',
    preconditions: 'Sesión iniciada en replit.com con cuenta gratuita y conexión a Internet activa.',
    postconditionsNormal: 'Se crea el entorno Python, el script imprime en consola y se copia el enlace.',
    postconditionsAlt: 'El sistema impide la creación y muestra el motivo o restricción correspondiente.',
    steps: [
      '1.1 Acceder al panel principal (https://replit.com/~).',
      '1.2 Verificar que el selector inferior indique Free.',
      '1.3 Escribir la instrucción "Python script print hola".',
      '1.4 Presionar el botón de envío (↑).',
    ],
    data: 'Modo: Free · Entrada: "Python script print hola"',
    expected: 'Crea el proyecto en Python, abre el editor para ejecutar y habilita compartir enlace.',
    obtained:
      'Interrumpe inmediatamente la operación y despliega el modal "Compare plans" (Core $20/mes, Pro $100/mes o prueba de 3 días). Al cerrar con X y reintentar, el bloqueo se repite.',
    status: 'Fallido',
  },
  {
    id: 'REP_PY_2',
    title: 'Crear proyecto vacío mediante Import → Empty en cuenta gratuita',
    expectedSeq: '1 → 2 → 3',
    actualSeq: '1 → 2 → 7',
    description:
      'Comprobar la transición desde la pantalla de importación hacia el entorno de edición vacío para configurar y ejecutar un archivo Python sin agente de IA.',
    preconditions: 'Sesión iniciada con cuenta gratuita visualizando el indicador "You have 10 free apps left".',
    postconditionsNormal: 'Se crea el proyecto vacío y abre el espacio de trabajo para código Python.',
    postconditionsAlt: 'El sistema cancela la operación y presenta un mensaje explicando el error.',
    steps: [
      '2.1 Seleccionar Import en el menú lateral izquierdo.',
      '2.2 Elegir la opción Empty (Create an empty project).',
      '2.3 Verificar el indicador de proyectos gratuitos disponibles.',
      '2.4 Hacer clic en el botón azul "Create empty project".',
    ],
    data: 'Ruta: replit.com/import/empty · Indicador visible: "You have 10 free apps left"',
    expected: 'Crea un proyecto vacío y abre el editor (estado 3) listo para agregar un archivo .py.',
    obtained:
      'Rechaza la creación con alerta roja: "The Starter plan is unavailable. Choose a paid plan to continue." (estado 7). Además evidencia inconsistencia en la interfaz, que informaba 10 apps gratuitas disponibles.',
    status: 'Fallido',
  },
];

export const BLACKBOX_EVIDENCE: EvidenceItem[] = [
  {
    id: 'replit-diagrama',
    src: '/assets/evidencias/replit_diagrama_estados.png',
    title: 'Diagrama de Transición de Estados (Informe)',
    caption: 'Diagrama original elaborado por el grupo modelando el flujo esperado en azul y las transiciones reales de bloqueo/error en rojo.',
    tag: 'Diagrama',
  },
  {
    id: 'replit-cp1-inicio',
    src: '/assets/evidencias/replit_cp1_inicio.png',
    title: 'CP1: Panel principal en modo Free',
    caption: 'Ingreso de "Python script print hola" con el selector inferior en modo Free previo a presionar enviar.',
    tag: 'REP_PY_1',
  },
  {
    id: 'replit-cp1-planes',
    src: '/assets/evidencias/replit_cp1_planes.png',
    title: 'CP1: Bloqueo "Compare plans"',
    caption: 'Modal que interrumpe el flujo exigiendo suscripción paga (Core $20/mes, Pro $100/mes o Enterprise) al intentar crear el proyecto.',
    tag: 'REP_PY_1 · Fallo',
  },
  {
    id: 'replit-cp2-empty',
    src: '/assets/evidencias/replit_cp2_empty.png',
    title: 'CP2: Ruta Import → Empty',
    caption: 'Pantalla mostrando "You have 10 free apps left" mientras la alerta inferior derecha rechaza la creación del proyecto vacío.',
    tag: 'REP_PY_2 · Inconsistencia',
  },
  {
    id: 'replit-alerta',
    src: '/assets/evidencias/replit_alerta_plan.png',
    title: 'Alerta de restricción de plan',
    caption: 'Detalle ampliado de la notificación roja: "The Starter plan is unavailable. Choose a paid plan to continue."',
    tag: 'Estado 7',
  },
];

// ======================== WHITE BOX (dias_del_mes) ========================

export interface GfcNode {
  id: number;
  label: string;
  condition?: string;
  isPredicate: boolean;
  codeLine: number; // 1-indexed in PYTHON_CODE_LINES
  x: number;
  y: number;
}

export interface GfcEdge {
  from: number;
  to: number;
  branch?: 'V' | 'F';
}

export interface BasicPath {
  id: string;
  nodes: number[];
  description: string;
  sampleMes: number;
  sampleAnio: number;
  expectedReturn: number;
  documentedInTp?: string;
}

export const PYTHON_CODE_LINES = [
  'def dias_del_mes(mes, anio):',
  '    if mes < 1 or mes > 12:',
  '        return -1',
  '    if mes in [4, 6, 9, 11]:',
  '        return 30',
  '    elif mes == 2:',
  '        if (anio % 4 == 0 and anio % 100 != 0) or (anio % 400 == 0):',
  '            return 29',
  '        return 28',
  '    else:',
  '        return 31',
];

export const GFC_NODES: GfcNode[] = [
  { id: 1, label: '1', condition: 'mes < 1', isPredicate: true, codeLine: 2, x: 155, y: 48 },
  { id: 2, label: '2', condition: 'mes > 12', isPredicate: true, codeLine: 2, x: 248, y: 112 },
  { id: 3, label: '3', condition: 'return -1', isPredicate: false, codeLine: 3, x: 96, y: 192 },
  { id: 4, label: '4', condition: 'mes in [4, 6, 9, 11]', isPredicate: true, codeLine: 4, x: 356, y: 188 },
  { id: 5, label: '5', condition: 'return 30', isPredicate: false, codeLine: 5, x: 255, y: 274 },
  { id: 6, label: '6', condition: 'mes == 2', isPredicate: true, codeLine: 6, x: 448, y: 266 },
  { id: 7, label: '7', condition: 'anio % 4 == 0', isPredicate: true, codeLine: 7, x: 525, y: 342 },
  { id: 8, label: '8', condition: 'anio % 100 != 0', isPredicate: true, codeLine: 7, x: 446, y: 422 },
  { id: 9, label: '9', condition: 'anio % 400 == 0', isPredicate: true, codeLine: 7, x: 560, y: 472 },
  { id: 10, label: '10', condition: 'return 29', isPredicate: false, codeLine: 8, x: 446, y: 534 },
  { id: 11, label: '11', condition: 'return 28', isPredicate: false, codeLine: 9, x: 560, y: 562 },
  { id: 12, label: '12', condition: 'return 31', isPredicate: false, codeLine: 11, x: 336, y: 374 },
  { id: 13, label: '13', condition: 'fin (salida única)', isPredicate: false, codeLine: 1, x: 290, y: 632 },
];

export const GFC_EDGES: GfcEdge[] = [
  { from: 1, to: 3, branch: 'V' },
  { from: 1, to: 2, branch: 'F' },
  { from: 2, to: 3, branch: 'V' },
  { from: 2, to: 4, branch: 'F' },
  { from: 3, to: 13 },
  { from: 4, to: 5, branch: 'V' },
  { from: 4, to: 6, branch: 'F' },
  { from: 5, to: 13 },
  { from: 6, to: 12, branch: 'F' },
  { from: 6, to: 7, branch: 'V' },
  { from: 12, to: 13 },
  { from: 7, to: 8, branch: 'V' },
  { from: 7, to: 9, branch: 'F' },
  { from: 8, to: 10, branch: 'V' },
  { from: 8, to: 9, branch: 'F' },
  { from: 9, to: 10, branch: 'V' },
  { from: 9, to: 11, branch: 'F' },
  { from: 10, to: 13 },
  { from: 11, to: 13 },
];

export const BASIC_PATHS: BasicPath[] = [
  {
    id: 'C1',
    nodes: [1, 3, 13],
    description: 'Mes menor que 1',
    sampleMes: 0,
    sampleAnio: 2024,
    expectedReturn: -1,
    documentedInTp: 'Dias_Del_Mes_1',
  },
  {
    id: 'C2',
    nodes: [1, 2, 3, 13],
    description: 'Mes mayor que 12',
    sampleMes: 13,
    sampleAnio: 2024,
    expectedReturn: -1,
  },
  {
    id: 'C3',
    nodes: [1, 2, 4, 5, 13],
    description: 'Mes de 30 días',
    sampleMes: 4,
    sampleAnio: 2024,
    expectedReturn: 30,
    documentedInTp: 'Dias_Del_Mes_3',
  },
  {
    id: 'C4',
    nodes: [1, 2, 4, 6, 12, 13],
    description: 'Mes de 31 días',
    sampleMes: 1,
    sampleAnio: 2024,
    expectedReturn: 31,
  },
  {
    id: 'C5',
    nodes: [1, 2, 4, 6, 7, 8, 10, 13],
    description: 'Febrero, año divisible por 4 y no por 100',
    sampleMes: 2,
    sampleAnio: 2024,
    expectedReturn: 29,
    documentedInTp: 'Dias_Del_Mes_5',
  },
  {
    id: 'C6',
    nodes: [1, 2, 4, 6, 7, 8, 9, 10, 13],
    description: 'Febrero, año divisible por 400',
    sampleMes: 2,
    sampleAnio: 2000,
    expectedReturn: 29,
  },
  {
    id: 'C7',
    nodes: [1, 2, 4, 6, 7, 8, 9, 11, 13],
    description: 'Febrero, año divisible por 100 pero no por 400',
    sampleMes: 2,
    sampleAnio: 1900,
    expectedReturn: 28,
  },
  {
    id: 'C8',
    nodes: [1, 2, 4, 6, 7, 9, 11, 13],
    description: 'Febrero, año no divisible por 4',
    sampleMes: 2,
    sampleAnio: 2023,
    expectedReturn: 28,
  },
];

export interface TraceStep {
  nodeId: number;
  label: string;
  evaluation: string;
  branchTaken?: 'V' | 'F';
  codeLine: number;
}

export interface ExecutionTrace {
  mes: number;
  anio: number;
  result: number;
  nodes: number[];
  steps: TraceStep[];
  matchedPathId: string;
  matchedPathDesc: string;
}

export function traceDiasDelMes(mes: number, anio: number): ExecutionTrace {
  const steps: TraceStep[] = [];
  const nodes: number[] = [];

  const pushStep = (nodeId: number, label: string, evaluation: string, codeLine: number, branchTaken?: 'V' | 'F') => {
    nodes.push(nodeId);
    steps.push({ nodeId, label, evaluation, branchTaken, codeLine });
  };

  let result = 31;

  // Node 1: mes < 1
  if (mes < 1) {
    pushStep(1, 'mes < 1', `${mes} < 1 → Verdadero`, 2, 'V');
    result = -1;
    pushStep(3, 'return -1', 'Retorna -1 (mes inválido)', 3);
  } else {
    pushStep(1, 'mes < 1', `${mes} < 1 → Falso`, 2, 'F');
    // Node 2: mes > 12
    if (mes > 12) {
      pushStep(2, 'mes > 12', `${mes} > 12 → Verdadero`, 2, 'V');
      result = -1;
      pushStep(3, 'return -1', 'Retorna -1 (mes inválido)', 3);
    } else {
      pushStep(2, 'mes > 12', `${mes} > 12 → Falso`, 2, 'F');
      // Node 4: mes in [4, 6, 9, 11]
      if ([4, 6, 9, 11].includes(mes)) {
        pushStep(4, 'mes in [4, 6, 9, 11]', `${mes} está en {4, 6, 9, 11} → Verdadero`, 4, 'V');
        result = 30;
        pushStep(5, 'return 30', 'Retorna 30 días', 5);
      } else {
        pushStep(4, 'mes in [4, 6, 9, 11]', `${mes} no está en {4, 6, 9, 11} → Falso`, 4, 'F');
        // Node 6: mes == 2
        if (mes === 2) {
          pushStep(6, 'mes == 2', `${mes} == 2 → Verdadero`, 6, 'V');
          // Node 7: anio % 4 == 0
          if (anio % 4 === 0) {
            pushStep(7, 'anio % 4 == 0', `${anio} % 4 == 0 → Verdadero`, 7, 'V');
            // Node 8: anio % 100 != 0
            if (anio % 100 !== 0) {
              pushStep(8, 'anio % 100 != 0', `${anio} % 100 != 0 → Verdadero (cortocircuito or)`, 7, 'V');
              result = 29;
              pushStep(10, 'return 29', 'Retorna 29 días (bisiesto)', 8);
            } else {
              pushStep(8, 'anio % 100 != 0', `${anio} % 100 == 0 → Falso`, 7, 'F');
              // Node 9: anio % 400 == 0
              if (anio % 400 === 0) {
                pushStep(9, 'anio % 400 == 0', `${anio} % 400 == 0 → Verdadero`, 7, 'V');
                result = 29;
                pushStep(10, 'return 29', 'Retorna 29 días (bisiesto secular)', 8);
              } else {
                pushStep(9, 'anio % 400 == 0', `${anio} % 400 != 0 → Falso`, 7, 'F');
                result = 28;
                pushStep(11, 'return 28', 'Retorna 28 días (no bisiesto)', 9);
              }
            }
          } else {
            pushStep(7, 'anio % 4 == 0', `${anio} % 4 != 0 → Falso`, 7, 'F');
            // Node 9: anio % 400 == 0
            if (anio % 400 === 0) {
              pushStep(9, 'anio % 400 == 0', `${anio} % 400 == 0 → Verdadero`, 7, 'V');
              result = 29;
              pushStep(10, 'return 29', 'Retorna 29 días', 8);
            } else {
              pushStep(9, 'anio % 400 == 0', `${anio} % 400 != 0 → Falso`, 7, 'F');
              result = 28;
              pushStep(11, 'return 28', 'Retorna 28 días (año común)', 9);
            }
          }
        } else {
          pushStep(6, 'mes == 2', `${mes} == 2 → Falso`, 6, 'F');
          result = 31;
          pushStep(12, 'return 31', 'Retorna 31 días', 11);
        }
      }
    }
  }

  pushStep(13, 'fin', `Salida única del módulo con valor ${result}`, 1);

  const matched =
    BASIC_PATHS.find((p) => p.nodes.length === nodes.length && p.nodes.every((n, i) => n === nodes[i])) ?? BASIC_PATHS[0];

  return {
    mes,
    anio,
    result,
    nodes,
    steps,
    matchedPathId: matched.id,
    matchedPathDesc: matched.description,
  };
}

export const WHITEBOX_TEST_CASES = [
  {
    id: 'Dias_Del_Mes_1',
    pathId: 'C1',
    sequence: '1 → 3 → 13',
    title: 'Validar un mes inválido menor a 1',
    description: 'Comprobar que la función retorna -1 cuando se ingresa un mes menor que 1.',
    mes: 0,
    anio: 2024,
    expected: '-1',
    obtained: '-1',
    note: 'Evalúa la rama verdadera del predicado 1 (mes < 1) para verificar el retorno de error ante un valor por debajo del límite inferior.',
  },
  {
    id: 'Dias_Del_Mes_3',
    pathId: 'C3',
    sequence: '1 → 2 → 4 → 5 → 13',
    title: 'Obtener los días de un mes de 30 días',
    description: 'Comprobar que la función retorna 30 cuando se ingresa un mes perteneciente al conjunto {4, 6, 9, 11}.',
    mes: 4,
    anio: 2024,
    expected: '30',
    obtained: '30',
    note: 'Supera las validaciones de rango (ramas falsas de 1 y 2) y toma la rama verdadera del predicado 4.',
  },
  {
    id: 'Dias_Del_Mes_5',
    pathId: 'C5',
    sequence: '1 → 2 → 4 → 6 → 7 → 8 → 10 → 13',
    title: 'Obtener los días de febrero en un año bisiesto común',
    description: 'Comprobar que la función retorna 29 para febrero de un año divisible por 4 y no divisible por 100.',
    mes: 2,
    anio: 2024,
    expected: '29',
    obtained: '29',
    note: 'Evalúa ramas verdaderas de mes == 2 (nodo 6), anio % 4 == 0 (nodo 7) y anio % 100 != 0 (nodo 8) por cortocircuito del or.',
  },
];

export const WHITEBOX_EVIDENCE: EvidenceItem[] = [
  {
    id: 'whitebox-code',
    src: '/assets/evidencias/codigo_python.png',
    title: 'Módulo Python asignado: dias_del_mes',
    caption: 'Código fuente original entregado en la consigna para realizar las pruebas de caja blanca.',
    tag: 'Consigna',
  },
  {
    id: 'whitebox-gfc',
    src: '/assets/evidencias/caja_blanca_gfc.png',
    title: 'Grafo de Flujo de Control (GFC) del informe',
    caption: 'Grafo original con 13 nodos, 19 aristas, 7 nodos predicado y 8 regiones (R1 a R8), verificando V(G) = 8.',
    tag: 'GFC · V(G) = 8',
  },
];
