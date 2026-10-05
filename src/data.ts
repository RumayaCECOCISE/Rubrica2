export const SOURCES = {
  endutih2024: {
    short: 'INEGI, ENDUTIH 2024, Comunicado 57/25 y Reporte de Resultados 9/25.',
    url: 'https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/endutih/ENDUTIH_24.pdf',
  },
  endutih2025: {
    short: 'INEGI, ENDUTIH 2025, Comunicado 32/26 y Reporte de Resultados 19/26.',
    url: 'https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/endutih/ENDUTIH_25.pdf',
  },
  sep2024: {
    short: 'SEP-DGPPyEE, Principales cifras del Sistema Educativo Nacional 2024-2025.',
    url: 'https://www.planeacion.sep.gob.mx/Doc/estadistica_e_indicadores/principales_cifras/principales_cifras_2024_2025_bolsillo.pdf',
  },
  educationUse: {
    short: 'INEGI, ENDUTIH 2020, comunicado de resultados.',
    url: 'https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2021/OtrTemEcon/ENDUTIH_2020.pdf',
  },
  pef2026: {
    short: 'DOF, Presupuesto de Egresos de la Federación para el Ejercicio Fiscal 2026, artículos 2.º y 3.º.',
    url: 'https://dof.gob.mx/2025/SHCP/PEF_2026.html',
  },
  ptic2026: {
    short: 'Select, seguimiento del Presupuesto TIC del Gobierno federal 2026.',
    url: 'https://selectnet.selectestrategia.net/reporte/presupuesto-tic-del-gobierno-federal-se-mantiene-con-recorte-para-2026/',
  },
  conectividad2026: {
    short: 'DOF, Programa de Conectividad en Sitios Públicos y Áreas de Atención Prioritaria 2026.',
    url: 'https://sidof.segob.gob.mx/notas/docFuente/5785058',
  },
  pisa2025: {
    short: 'OCDE, PISA 2025 Results.',
    url: 'https://www.oecd.org/pisa/publications/pisa-2025-results.htm',
  },
  imco2026: {
    short: 'IMCO, Resultados PISA 2025.',
    url: 'https://imco.org.mx/pisa-2025/',
  },
  ineescuelas: {
    short: 'INEE, ¿Cómo son nuestras escuelas? Ciclo escolar 2016-2017.',
    url: 'https://historico.mejoredu.gob.mx/como-son-nuestras-escuelas/',
  },
  atdt2026: {
    short: 'Agencia de Transformación Digital y Telecomunicaciones, Plan Nacional de Conectividad 2026-2030.',
    url: 'https://sidof.segob.gob.mx/notas/docFuente/5785292',
  },
  sechiapas: {
    short: 'Secretaría de Educación del Estado de Chiapas, Estadística educativa, ciclo 2024-2025.',
    url: 'https://planeacion.sep.gob.mx/Doc/estadistica_e_indicadores/EstIndEntFed2024/07_CHIS.pdf',
  },
  agendaDigital: {
    short: 'SEP, Agenda Digital Educativa, 2020.',
    url: 'https://infosen.senado.gob.mx/sgsp/gaceta/64/2/2020-02-05-1/assets/documentos/Agenda_Digital_Educacion.pdf',
  },
  pdid2016: {
    short: 'SEP, Lineamientos y Estrategias de Operación del Programa de Inclusión Digital, DOF, 30 de diciembre de 2016.',
    url: 'https://normatecainterna.sep.gob.mx/storage/recursos/2025/05/uaPZoWjdrd-Lineamientos_ProgramaInclusionDigital.pdf',
  },
  leyes: {
    short: 'Cámara de Diputados, CPEUM, LGDNNA; Naciones Unidas, PIDESC y CDN.',
    url: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/CPEUM.pdf',
  },
  talis2018: {
    short: 'BID, Nota CIMA 18: TALIS 2018, ¿están preparados los docentes para enseñar en el siglo 21?',
    url: 'https://publications.iadb.org/publications/spanish/document/Nota_CIMA_18_TALIS_2018_Est%C3%A1n_preparados_los_docentes_para_ense%C3%B1ar_en_el_siglo_21_es.pdf',
  },
  apertura2023: {
    short: 'Apertura (UdeG), Retos en el desarrollo de la competencia digital en docentes de secundaria, 2023.',
    url: 'https://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S1665-61802023000100122',
  },
  redim2026: {
    short: 'REDIM, Uso de internet y celular inteligente de la infancia y adolescencia de México (2015-2024), con datos de la ENDUTIH 2024.',
    url: 'https://blog.derechosinfancia.org.mx/2026/02/25/uso-de-internet-celular-inteligente-y-redes-sociales-de-la-infancia-y-adolescencia-de-mexico-2015-2024/',
  },
} as const;

export const INTERNET_TREND = [
  { year: '2015', value: 39.0 },
  { year: '2020', value: 59.9 },
  { year: '2023', value: 71.7 },
  { year: '2024', value: 73.6 },
  { year: '2025', value: 78.3 },
];

/** Indicadores comparables de la ENDUTIH 2025. */
export const DIGITAL_ACCESS_2025 = [
  { label: 'Personas usuarias de internet', national: 86.1, chiapas: 71.2 },
  { label: 'Hogares con internet', national: 78.3, chiapas: 53.9 },
  { label: 'Personas usuarias de celular', national: 84.6, chiapas: 70.8 },
  { label: 'Hogares con dispositivos inteligentes', national: 30.9, chiapas: 10.6 },
];

export const DIGITAL_ACCESS_2024 = [
  { label: 'Hogares con internet', national: 73.6, chiapas: 50.7 },
  { label: 'Dispositivos inteligentes', national: 26.0, chiapas: 9.6 },
  { label: 'Uso de teléfono celular', national: 81.7, chiapas: 62.5 },
];

/**
 * Gráfica México vs. Chiapas 2024. El cuarto dato corresponde a la población
 * de 6 a 17 años que usó celular inteligente; INEGI no publica su valor estatal.
 */
export const REGIONAL_CHART_2024: { name: string; México: number; Chiapas: number | null }[] = [
  { name: 'Hogares con internet', México: 73.6, Chiapas: 50.7 },
  { name: 'Dispositivos inteligentes', México: 26.0, Chiapas: 9.6 },
  { name: 'Uso de celular', México: 81.7, Chiapas: 62.5 },
  { name: 'NNA con celular inteligente*', México: 80.3, Chiapas: null },
];

/** Evidencia sobre competencias digitales del personal docente. */
export const TEACHER_DIGITAL = [
  {
    label: 'Necesidad de formación en TIC',
    value: 75,
    prefix: '> ',
    detail: 'de los docentes en México requiere más formación en TIC para la enseñanza, por encima del promedio OCDE (TALIS 2018, según el BID).',
  },
  {
    label: 'Competencia digital docente',
    value: 60,
    prefix: '',
    detail: 'de docentes de secundaria en Mérida, Yucatán, presenta un nivel bajo de competencia digital; 27 % no ha recibido capacitación en TIC (Apertura, 2023).',
  },
];

/**
 * Razones por las que 21.7 % de los hogares no disponía de internet en 2025.
 * ENDUTIH 2025, Comunicado 32/26.
 */
export const NO_INTERNET_REASONS = [
  { reason: 'Falta de recursos económicos', value: 12.1 },
  { reason: 'No le interesa o no lo necesita', value: 5.5 },
  { reason: 'No sabe usarlo', value: 1.9 },
  { reason: 'Otras razones', value: 2.2 },
];

/**
 * Brechas urbano-rural en tipos de uso de internet, 2025.
 * ENDUTIH 2025, Comunicado 32/26, gráfica 2.
 */
export const URBAN_RURAL_GAP = [
  { label: 'Pagos vía internet', urban: 39.5, rural: 17.8 },
  { label: 'Compras en línea', urban: 41.1, rural: 20.2 },
  { label: 'Operaciones bancarias', urban: 36.7, rural: 16.0 },
  { label: 'Interactuar con el gobierno', urban: 38.2, rural: 24.7 },
];

/**
 * Equipamiento de escuelas primarias y secundarias en Chiapas,
 * ciclo escolar 2016-2017 (al menos una computadora para uso educativo).
 * INEE, «¿Cómo son nuestras escuelas?».
 */
export const INEE_SCHOOLS_CHIAPAS = [
  { level: 'Primarias', value: 18.3 },
  { level: 'Secundarias', value: 50.7 },
];

/**
 * Resultados de México en PISA 2025 frente al promedio OCDE.
 * OCDE, PISA 2025 Results; IMCO (2026).
 */
export const PISA_2025 = [
  { subject: 'Matemáticas', mexico: 388, oecd: 463 },
  { subject: 'Lectura', mexico: 408, oecd: 461 },
  { subject: 'Ciencias', mexico: 414, oecd: 482 },
  { subject: 'Problemas computacionales', mexico: 453, oecd: 500 },
];

/** Porcentaje de estudiantes que alcanza niveles altos. */
export const PISA_LEVELS = [
  { subject: 'Matemáticas', mexico: 0.1, oecd: 8 },
  { subject: 'Ciencias', mexico: 0.2, oecd: 7 },
  { subject: 'Comprensión lectora', mexico: 0.3, oecd: 6 },
];

/** Uso semanal de chatbots de IA para apoyar el aprendizaje. */
export const PISA_AI = { mexico: 47.4, oecd: 45.5 };

/** Último ciclo con resultados completos; no implica causalidad con la conectividad. */
export const SECONDARY_EDUCATION_2024 = [
  { label: 'Eficiencia terminal en secundaria', national: 90.5, chiapas: 85.4 },
  { label: 'Abandono escolar en secundaria', national: 3.7, chiapas: 5.4 },
];

/**
 * Hogares con internet por entidad federativa, 2025.
 * Se incluyen las tres entidades con mayor y las tres con menor acceso,
 * más el promedio nacional como línea de referencia.
 * ENDUTIH 2025, Comunicado 32/26.
 */
export const STATE_RANKING_2025 = [
  { name: 'Ciudad de México', value: 90.5, kind: 'alto' as const },
  { name: 'Nuevo León', value: 89.9, kind: 'alto' as const },
  { name: 'Baja California', value: 89.1, kind: 'alto' as const },
  { name: 'Nacional', value: 78.3, kind: 'nacional' as const },
  { name: 'Veracruz', value: 68.3, kind: 'bajo' as const },
  { name: 'Oaxaca', value: 64.0, kind: 'bajo' as const },
  { name: 'Chiapas', value: 53.9, kind: 'chiapas' as const },
];

/* ------------------------------------------------------------------ */
/*  Presupuesto de Egresos de la Federación 2026                       */
/* ------------------------------------------------------------------ */

/** Cifras en millones de pesos corrientes. */
export const BUDGET_2026 = {
  totalMdp: 10_193_683.7,
  educacionRamo11Mdp: 523_858.2,
  ticFederalMdp: 33_395,
  totalLabel: '10.19 billones de pesos',
  educacionLabel: '523 858.2 mdp',
  ticLabel: '33 395 mdp',
  educacionPct: 5.1,
  ticPct: 0.33,
  ticVariacion: -1.9,
};

/** Participación del Ramo 11 «Educación Pública» dentro del gasto neto total. */
export const BUDGET_EDUCATION_SHARE = [
  { name: 'Educación Pública (Ramo 11)', value: 523_858.2 },
  { name: 'Resto del gasto federal', value: 10_193_683.7 - 523_858.2 },
];

/** Participación del Presupuesto TIC federal dentro del gasto neto total. */
export const BUDGET_TIC_SHARE = [
  { name: 'Presupuesto TIC federal', value: 33_395 },
  { name: 'Resto del gasto federal', value: 10_193_683.7 - 33_395 },
];

/* ------------------------------------------------------------------ */
/*  Autoridades y servidores públicos involucrados                      */
/* ------------------------------------------------------------------ */
export const INVOLVED_AUTHORITIES = [
  {
    level: 'Federal',
    entity: 'Secretaría de Educación Pública (SEP)',
    duty: 'Responsable de las políticas educativas federales y de los programas de tecnologías en la educación. A través de la Dirección General @prende.mx administra la plataforma Nueva Escuela Mexicana Digital.',
  },
  {
    level: 'Federal',
    entity: 'Subsecretaría de Educación Federalizada',
    duty: 'Jurisdicción directa sobre la escuela del caso presentado.',
  },
  {
    level: 'Estatal',
    entity: 'Secretaría de Educación del Estado de Chiapas',
    duty: 'Prestación y organización del servicio educativo en la entidad y creación de las políticas públicas para garantizar el acceso al derecho defendido.',
  },
  {
    level: 'Estatal',
    entity: 'Coordinación Estatal de Formación Continua de Maestros en Servicio',
    duty: 'Capacitación y actualización del personal docente, incluido el desarrollo de competencias para el uso y aprovechamiento de las TIC.',
  },
  {
    level: 'Federal',
    entity: 'Agencia de Transformación Digital y Telecomunicaciones (ATDT)',
    duty: 'Política de conectividad y transformación digital, a través del Plan Nacional de Conectividad 2026-2030, que reconoce la conectividad como elemento habilitador para el ejercicio de otros derechos.',
  },
  {
    level: 'Federal',
    entity: 'Comisión Federal de Electricidad (CFE)',
    duty: 'Servicio eléctrico, condición indispensable para la operación del equipo tecnológico y de los servicios de conectividad del plantel, y gestor de la política «Internet para Todos».',
  },
  {
    level: 'Federal',
    entity: 'CFE Telecomunicaciones e Internet para Todos (CFE TEIT)',
    duty: 'Despliegue y operación de la infraestructura de conectividad y del programa «Internet para Todos», que contempla internet gratuito en escuelas y espacios públicos.',
  },
  {
    level: 'Federal',
    entity: 'CRT y Promtel',
    duty: 'Regulación del sector y promoción de inversión en infraestructura de telecomunicaciones.',
  },
  {
    level: 'Estatal',
    entity: 'Agencia Digital Tecnológica del Estado de Chiapas (ADITECH)',
    duty: 'Transformación digital y coordinación de acciones de conectividad en la entidad.',
  },
  {
    level: 'Estatal',
    entity: 'INIFED e INIFECH',
    duty: 'Condiciones de infraestructura física y eléctrica del plantel.',
  },
  {
    level: 'Estatal',
    entity: 'SHCP y Secretaría de Finanzas de Chiapas',
    duty: 'Asignación y ejercicio de los recursos presupuestales destinados a infraestructura y conectividad educativa.',
  },
  {
    level: 'Escolar',
    entity: 'Dirección y personal directivo del plantel',
    duty: 'Conocen directamente las condiciones de la escuela, las necesidades tecnológicas de la comunidad escolar y las gestiones realizadas ante las autoridades.',
  },
  {
    level: 'Escolar',
    entity: 'Supervisión escolar correspondiente',
    duty: 'Seguimiento y supervisión de las condiciones educativas del plantel.',
  },
];

/* ------------------------------------------------------------------ */
/*  Víctimas del caso                                                  */
/* ------------------------------------------------------------------ */
export const VICTIMS = {
  directas: {
    total: 2,
    label: 'estudiantes de primer grado',
    text: 'Se estudiarán dos casos individuales y sus entornos para identificar cómo las condiciones tecnológicas, familiares e institucionales inciden en el uso educativo de las TIC.',
  },
  indirectas:
    'Madres, padres, familiares de primer y segundo grado y personas cuidadoras de las y los estudiantes.',
  potenciales:
    'Futuras generaciones de estudiantes que podrían enfrentar las mismas condiciones si no se corrigen las deficiencias; personal docente de la institución; compañeras y compañeros del CECOCISE, quienes acompañan la defensa y sus familias.',
};

/* ------------------------------------------------------------------ */
/*  Derechos reconocidos                                               */
/* ------------------------------------------------------------------ */
export const LEGAL_RIGHTS = [
  {
    source: 'CPEUM, art. 6.º, párrafo tercero',
    text: 'El Estado garantizará el derecho de acceso a las tecnologías de la información y comunicación, así como a los servicios de radiodifusión y telecomunicaciones, incluido el de banda ancha e internet.',
    note: 'Párrafo adicionado DOF 11-06-2013. Reformado DOF 20-12-2024.',
  },
  {
    source: 'LGDNNA, Capítulo Vigésimo, arts. 101 Bis, 101 Bis 1 y 101 Bis 2',
    text: 'Reconocen el derecho de acceso universal a las TIC y obligan al Estado a garantizar una política de inclusión digital con equidad y calidad.',
    note: 'Artículo adicionado DOF 20-06-2018.',
  },
  {
    source: 'CDN, art. 17',
    text: 'Reconoce el derecho de la niñez a acceder a información y materiales procedentes de diversas fuentes, incluidos los medios digitales.',
    note: 'Naciones Unidas, 1989.',
  },
];

export const CONNECTED_RIGHTS = [
  {
    title: 'Derecho a la educación de calidad',
    text: 'En su dimensión de calidad y no solamente de acceso (Torres, 2006). Art. 3.º constitucional y art. 13 del PIDESC.',
  },
  {
    title: 'Nivel de vida adecuado',
    text: 'Art. 11 del PIDESC: la falta de herramientas tecnológicas limita las posibilidades presentes y futuras de desarrollo económico y social de la niñez.',
  },
  {
    title: 'Beneficios del progreso científico',
    text: 'Art. 15.1.b del PIDESC, vinculado con la posibilidad de que la niñez acceda y se beneficie del desarrollo tecnológico contemporáneo.',
  },
  {
    title: 'TIC como derecho habilitante',
    text: 'Su garantía repercute en la educación, el trabajo, la participación política y la libertad de expresión. Su ausencia produce una «sociedad de dos velocidades» (Moranchel Pocaterra, 2019).',
  },
  {
    title: 'Progresividad y no regresividad',
    text: 'Art. 2.2 del PIDESC: obligación estatal de adoptar medidas hasta el máximo de los recursos disponibles para lograr progresivamente la plena efectividad de los derechos.',
  },
  {
    title: 'Igualdad y no discriminación',
    text: 'Principio transversal. La brecha digital documentada opera como una nueva capa de vulnerabilidad que, de no atenderse, tiende a agravarse (Martínez Domínguez, 2018; Villela Cortés y Contreras Islas, 2021).',
  },
];

/* ------------------------------------------------------------------ */
/*  Línea de tiempo de políticas públicas de TIC y educación          */
/* ------------------------------------------------------------------ */
export const POLICY_TIMELINE = [
  {
    year: '2003',
    program: 'Enciclomedia',
    detail: 'Dotó de equipamiento y contenidos digitales a aulas de quinta y sexto de primaria a partir de 2004.',
  },
  {
    year: '2008-2009',
    program: 'Habilidades Digitales para Todos',
    detail: 'Operó como piloto y se implementó a partir de 2009 con aulas tecnológicas y formación docente.',
  },
  {
    year: '2013-2014',
    program: 'MiCompu.mx',
    detail: 'Repartió 240 mil laptops solo a quinto y sexto de primaria en Colima, Sonora y Tabasco. Chiapas no fue incluido en las primeras etapas.',
  },
  {
    year: '2016',
    program: '@prende 2.0',
    detail: 'Lineamientos publicados en el DOF el 30 de diciembre de 2016. Plantearon de manera conjunta formación docente, contenidos digitales, equipamiento y conectividad.',
  },
  {
    year: '2020',
    program: 'Agenda Digital Educativa',
    detail: 'Establecida por la SEP como marco de la política de inclusión digital.',
  },
  {
    year: '2022',
    program: 'Internet para Todos',
    detail: 'CFE Telecomunicaciones e Internet para Todos anunció acciones de conectividad en Chiapas.',
  },
  {
    year: '2026-2030',
    program: 'Plan Nacional de Conectividad',
    detail: 'Política federal vigente, orientada a ampliar el acceso universal y de calidad a internet.',
  },
];

/* ------------------------------------------------------------------ */
/*  Cifras del contexto del caso                                       */
/* ------------------------------------------------------------------ */
export const CASE_CONTEXT = {
  tuxtlaPopulation: 1_539_174,
  chiapasSecondaryStudents: 305_941,
  chiapasAbsorption: 82.6,
  tabletasChiapas2016: 7_159,
  internetParaTodosAlumnos: 356_000,
  internetParaTodosDocentes: 15_000,
  internetParaTodosMunicipios: 115,
  escuelasSinDiagnostico: 262_000,
};

/* ------------------------------------------------------------------ */
/*  Responsabilidad institucional                                      */
/* ------------------------------------------------------------------ */
export const RESPONSIBLE_AUTHORITIES = [
  {
    level: 'Federal',
    entity: 'Secretaría de Educación Pública (SEP)',
    duty: 'Rectoría del sistema educativo nacional, planes y programas de estudio, y formación continua del personal docente.',
    basis: 'LGE, artículos 113 y 114',
  },
  {
    level: 'Federal',
    entity: 'Agencia de Transformación Digital y Telecomunicaciones',
    duty: 'Política de conectividad y acceso gratuito a internet en escuelas y sitios públicos.',
    basis: 'LMTR, artículo 202',
  },
  {
    level: 'Estatal',
    entity: 'Secretaría de Educación del Estado de Chiapas',
    duty: 'Operación de los servicios de educación básica y ejecución de la política de inclusión digital en la entidad.',
    basis: 'LGE, artículo 114',
  },
  {
    level: 'Escolar',
    entity: 'Dirección y personal administrativo del plantel',
    duty: 'Gestión escolar, resguardo del equipamiento y organización de las condiciones de uso de las TIC.',
    basis: 'LGE, artículo 106',
  },
  {
    level: 'Escolar',
    entity: 'Personal docente',
    duty: 'Aplicación pedagógica de las TIC. Su corresponsabilidad presupone que el Estado garantice previamente la formación y los medios.',
    basis: 'LGE, artículos 90 y 91',
  },
];
