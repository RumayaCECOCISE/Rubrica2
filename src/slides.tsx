import { useId, useMemo, useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import {
  Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, LabelList, Area, AreaChart,
} from 'recharts';
import {
  BookOpen, Scale, ShieldCheck, Sparkles, Wifi, Building2,
  Laptop, School, TriangleAlert, FileSearch, RotateCcw,
} from 'lucide-react';
import { useTheme } from './theme';
import { LogoUNACH, LogoCECOCISE, LogoMDDH } from './components/Logos';
import { DissolveTitle, NewCaseTitle, TitleVersionControls } from './components/CaseTitle';
import { VerticalTabs, type TabGroup } from './components/VerticalTabs';
import {
  Slide, SlideHeader, Card, AnimatedNumber, Deco,
  MeterBar, SourceNote, ComparisonMetric, SharePie,
  fadeUp,
} from './components/ui';
import {
  BUDGET_EDUCATION_SHARE, CASE_CONTEXT, CONNECTED_RIGHTS,
  DIGITAL_ACCESS_2025, INTERNET_TREND, INEE_SCHOOLS_CHIAPAS,
  INVOLVED_AUTHORITIES, LEGAL_RIGHTS, PISA_2025, PISA_AI, PISA_LEVELS,
  POLICY_TIMELINE, REGIONAL_CHART_2024, SECONDARY_EDUCATION_2024, SOURCES,
  STATE_RANKING_2025, TEACHER_DIGITAL, VICTIMS,
} from './data';

function SourceLink({ source }: { source: { short: string; url: string } }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer"
      className="underline decoration-accent/40 underline-offset-2 hover:text-accent"
    >
      {source.short}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Línea del tiempo interactiva en onda (reutilizable)               */
/* ------------------------------------------------------------------ */
const TIMELINE_STEP = 0.42;

function WaveTimeline({
  title = 'Políticas de inclusión digital en México',
}: {
  title?: string;
}) {
  const n = POLICY_TIMELINE.length;
  const clipId = `wave-${useId().replace(/:/g, '')}`;
  const [run, setRun] = useState(0);
  const [active, setActive] = useState<number | null>(null);

  const points = useMemo(
    () => POLICY_TIMELINE.map((_, i) => ({ x: ((i + 0.5) / n) * 1000, y: i % 2 === 0 ? 24 : 76 })),
    [n],
  );

  const path = useMemo(() => {
    const all = [{ x: 0, y: 50 }, ...points, { x: 1000, y: 50 }];
    let d = `M ${all[0].x} ${all[0].y}`;
    for (let k = 0; k < all.length - 1; k++) {
      const a = all[k];
      const b = all[k + 1];
      const mid = (a.x + b.x) / 2;
      d += ` C ${mid} ${a.y}, ${mid} ${b.y}, ${b.x} ${b.y}`;
    }
    return d;
  }, [points]);

  const delayOf = (i: number) => 0.25 + (i + 0.5) * TIMELINE_STEP;
  const drawDuration = n * TIMELINE_STEP;

  const card = (i: number, placement: 'top' | 'bottom') => {
    const p = POLICY_TIMELINE[i];
    return (
      <motion.button
        key={p.program}
        type="button"
        onMouseEnter={() => setActive(i)}
        onMouseLeave={() => setActive(null)}
        onFocus={() => setActive(i)}
        onBlur={() => setActive(null)}
        initial={{ opacity: 0, y: placement === 'top' ? 8 : -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delayOf(i) + 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ gridColumn: i + 1, justifySelf: i === 0 ? 'start' : i === n - 1 ? 'end' : 'center' }}
        className={`wave-card text-left bg-surface border rounded-2xl soft-shadow p-3 transition-colors duration-300 ${
          active === i ? 'border-accent' : 'border-line'
        }`}
      >
        <span className="block body-sm font-semibold text-accent tabular-nums">{p.year}</span>
        <span className="block body-md font-semibold text-fg leading-snug">{p.program}</span>
        <span className="block body-sm text-muted leading-snug mt-1">{p.detail}</span>
      </motion.button>
    );
  };

  return (
    <div className="policy-timeline w-full">
      <div className="flex items-center justify-between gap-3 mb-2">
        <p className="eyebrow-tag text-accent">{title}</p>
        <button
          type="button"
          onClick={() => {
            setActive(null);
            setRun((r) => r + 1);
          }}
          className="body-sm inline-flex items-center gap-1.5 rounded-full border-0 bg-surface px-3 py-1 text-muted transition-colors hover:text-accent cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden />
          Reproducir
        </button>
      </div>

      <div key={run}>
        {/* Escritorio: onda horizontal con hitos alternados */}
        <div className="wave-timeline hidden lg:grid" style={{ '--wave-n': n } as CSSProperties}>
          <div className="wave-row wave-row--top">
            {POLICY_TIMELINE.map((_, i) => (i % 2 === 0 ? card(i, 'top') : null))}
          </div>

          <div className="wave-track">
            <svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden>
              <defs>
                <clipPath id={clipId}>
                  <motion.rect
                    x={0}
                    y={-10}
                    height={120}
                    initial={{ width: 0 }}
                    animate={{ width: 1000 }}
                    transition={{ delay: 0.25, duration: drawDuration, ease: 'linear' }}
                  />
                </clipPath>
              </defs>
              <path d={path} fill="none" stroke="var(--c-line)" strokeWidth={2} vectorEffect="non-scaling-stroke" />
              <path
                d={path}
                fill="none"
                stroke="var(--c-accent)"
                strokeWidth={3}
                vectorEffect="non-scaling-stroke"
                clipPath={`url(#${clipId})`}
              />
            </svg>
            {points.map((pt, i) => (
              <motion.span
                key={POLICY_TIMELINE[i].program}
                aria-hidden
                className={`wave-dot ${active === i ? 'is-active' : ''}`}
                style={{ left: `${pt.x / 10}%`, top: `${pt.y}%`, x: '-50%', y: '-50%' }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delayOf(i), duration: 0.3 }}
              />
            ))}
          </div>

          <div className="wave-row wave-row--bottom">
            {POLICY_TIMELINE.map((_, i) => (i % 2 === 1 ? card(i, 'bottom') : null))}
          </div>
        </div>

        {/* Tableta y móvil: línea vertical responsiva */}
        <ol className="lg:hidden relative flex flex-col gap-3 pl-7">
          <motion.span
            aria-hidden
            className="absolute left-[0.6rem] top-1 bottom-1 w-[2px] bg-accent"
            style={{ originY: 0 }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.25, duration: drawDuration, ease: 'linear' }}
          />
          {POLICY_TIMELINE.map((p, i) => (
            <motion.li
              key={p.program}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delayOf(i), duration: 0.4 }}
              className="relative"
            >
              <span
                aria-hidden
                className="absolute -left-[1.53rem] top-4 w-3.5 h-3.5 rounded-full bg-surface border-2 border-accent"
              />
              <div className="bg-surface border border-line rounded-2xl soft-shadow p-3">
                <span className="block body-sm font-semibold text-accent tabular-nums">{p.year}</span>
                <span className="block body-md font-semibold text-fg leading-snug">{p.program}</span>
                <span className="block body-sm text-muted leading-snug mt-1">{p.detail}</span>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  1 · PORTADA                                                         */
/* ================================================================== */
export function SlidePortada() {
  return (
    <section className="presentation-slide cover-slide h-[100dvh] w-full relative overflow-hidden flex flex-col justify-between">
      <div className="absolute inset-0 dot-grid opacity-[0.14] pointer-events-none" />

      {/* Logos institucionales con espacio reservado */}
      <div className="relative z-10 flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-12">
        <LogoUNACH style={{ height: 120, width: 'auto' }} />
        <span className="h-12 w-px bg-line" aria-hidden />
        <LogoCECOCISE style={{ height: 120, width: 'auto' }} />
        <span className="h-12 w-px bg-line" aria-hidden />
        <LogoMDDH style={{ height: 120, width: 'auto' }} />
      </div>

      {/* Título en ancho completo con controles sin borde */}
      <div className="cover-title-block relative z-10 w-full">
        <p className="eyebrow-tag text-muted mb-8 font-sans">
          Universidad Autónoma de Chiapas · CECOCISE · Maestría en Defensa de los Derechos Humanos
        </p>

        <DissolveTitle
          original={
            <h1 className="font-serif font-semibold leading-[0.98] tracking-tight text-fg text-[clamp(2.4rem,5.2vw,5.2rem)]">
              Incumplimiento en la garantía del{' '}
              <span className="text-accent">Derecho de Acceso, Uso y Aprovechamiento a las TIC</span>
              <span className="block italic font-normal text-muted text-[0.42em] mt-2">
                de los Niños, Niñas y Adolescentes en condiciones de igualdad
              </span>
            </h1>
          }
          alternate={
            <h1 className="font-serif font-semibold leading-[1.08] tracking-tight text-fg text-[clamp(1.8rem,3.5vw,3.9rem)] mb-6">
              <NewCaseTitle />
            </h1>
          }
        />
        <TitleVersionControls />

        <div
          className="w-44 h-[3px] my-10 rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--c-accent), var(--c-accent-2), transparent)' }}
        />

        <h2 className="font-serif text-[clamp(1.15rem,1.9vw,1.85rem)] text-muted leading-snug">
          Escuela Secundaria Técnica No. 156 <span className="text-fg font-semibold">"Real del Bosque"</span>, Tuxtla Gutiérrez, Chiapas
        </h2>
      </div>

      {/* Pie con fecha exacta */}
      <div className="relative z-10 border-t border-line pt-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <p className="body-sm text-muted font-sans">
            <span className="text-fg font-semibold">Presenta: Víctor Jesús Rumaya Medina</span>
          </p>
          <p className="body-sm text-muted font-sans">
            Rúbrica II, Módulo I · Agosto-diciembre 2026
          </p>
          <p className="body-sm text-muted font-sans">5 de octubre de 2026</p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  2 · INTRODUCCIÓN (OBJETO DE DEFENSA)                                */
/* ================================================================== */
export function SlideIntroduccion() {
  return (
    <Slide>
      <Deco logo="mddh" size={340} className="-top-16 -right-20" opacity={0.04} />
      <SlideHeader eyebrow="Exposición y fundamentación jurídica" title="Introducción" />

      <Card className="p-6 sm:p-8 lg:p-9 relative overflow-hidden w-full mb-4">
        <p className="eyebrow-tag text-accent mb-2 relative z-10">Objeto de defensa</p>
        <p className="font-serif text-[clamp(1.15rem,1.9vw,1.8rem)] text-fg/90 leading-[1.4] relative z-10">
          Garantía efectiva y no regresiva del derecho de adolescentes al acceso, uso y aprovechamiento
          equitativo de las TIC en la educación, mediante una política de inclusión digital con
          disponibilidad, accesibilidad, asequibilidad y calidad.
        </p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card className="p-5 flex flex-col gap-2">
          <p className="eyebrow-tag text-accent">Como defensa se busca</p>
          <ul className="flex flex-col gap-2">
            {[
              'Hacer cumplir las obligaciones de las autoridades responsables.',
              'Evidenciar posibles carencias en infraestructura, conectividad y capacitación docente.',
              'Promover acciones institucionales, políticas públicas o medidas de reparación.',
            ].map((t) => (
              <li key={t} className="flex gap-2.5 body-sm text-muted leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5 flex flex-col gap-2">
          <p className="eyebrow-tag text-accent">Se pretende, en consecuencia</p>
          <ul className="flex flex-col gap-2">
            {[
              'Documentar el incumplimiento del Estado en materia de capacitación docente en competencias digitales.',
              'Documentar la discontinuidad de los programas de formación tecnológica dirigidos al profesorado.',
              'Identificar a las autoridades responsables del incumplimiento.',
            ].map((t) => (
              <li key={t} className="flex gap-2.5 body-sm text-muted leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Slide>
  );
}

/* ================================================================== */
/*  3 · DESCRIPCIÓN DEL CASO                                            */
/* ================================================================== */
export function SlideDescripcionCaso() {
  return (
    <Slide>
      <Deco logo="cecocise" size={320} className="-bottom-20 -right-16" opacity={0.04} />
      <SlideHeader title="Capítulo I · 1.1 Exposición del caso" />

      <Card className="p-6 sm:p-8 lg:p-9 relative overflow-hidden w-full">
        <p className="font-serif text-[clamp(1.15rem,2vw,1.95rem)] text-fg/90 leading-[1.4] relative z-10">
          El incumplimiento del Estado mexicano en la garantía del derecho de acceso, uso y
          aprovechamiento de las Tecnologías de la Información y la Comunicación (TIC) en condiciones de
          igualdad y calidad, en perjuicio de la niñez estudiante de la Escuela Secundaria Técnica No. 156
          "Real del Bosque", derivada de la falta de capacitación docente, la interrupción de programas de
          formación tecnológica y la ausencia de condiciones institucionales adecuadas para sostener
          procesos educativos mediados por tecnología, en Tuxtla Gutiérrez, Chiapas.
        </p>
      </Card>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: ShieldCheck, t: 'Falta de capacitación docente', d: 'Competencias digitales del profesorado.' },
          { icon: Sparkles, t: 'Interrupción de programas', d: 'Formación tecnológica discontinua.' },
          { icon: Building2, t: 'Ausencia de condiciones', d: 'Infraestructura y conectividad inadecuadas.' },
        ].map((it) => (
          <Card key={it.t} className="px-4 py-3 flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: 'color-mix(in srgb, var(--c-accent) 12%, transparent)' }}
            >
              <it.icon className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="body-md font-semibold text-fg leading-snug">{it.t}</p>
              <p className="body-sm text-muted leading-snug">{it.d}</p>
            </div>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

/* ================================================================== */
/*  4 · VÍCTIMAS DEL CASO                                               */
/* ================================================================== */
export function SlideVictimas() {
  return (
    <Slide>
      <Deco logo="cecocise" size={310} className="-top-16 -right-16" opacity={0.04} />
      <SlideHeader
        eyebrow="Capítulo I · 1.2 Identificación de las víctimas"
        title="Víctimas del caso"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 items-stretch auto-rows-fr">
        {/* Directas: llena la tarjeta con distribución vertical equilibrada */}
        <Card className="p-6 md:p-7 relative overflow-hidden flex flex-col justify-between h-full">
          <div
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
            style={{ backgroundColor: 'color-mix(in srgb, var(--c-accent) 10%, transparent)' }}
          />
          <div>
            <p className="eyebrow-tag text-accent mb-3 relative z-10">Víctimas directas</p>
            <p className="metric-lg text-accent mb-2 relative z-10">
              <AnimatedNumber value={VICTIMS.directas.total} delay={0.4} />
            </p>
            <p className="body-md text-fg relative z-10 font-semibold">{VICTIMS.directas.label}</p>
          </div>
          <p className="body-sm text-muted leading-relaxed relative z-10 mt-8">
            {VICTIMS.directas.text}
          </p>
        </Card>

        {/* Indirectas */}
        <Card className="p-6 md:p-7 flex flex-col h-full">
          <p className="eyebrow-tag text-accent mb-4">Víctimas indirectas</p>
          <p className="body-md text-fg/90 leading-relaxed flex-1 flex items-center">
            {VICTIMS.indirectas}
          </p>
        </Card>

        {/* Potenciales */}
        <Card className="p-6 md:p-7 flex flex-col h-full">
          <p className="eyebrow-tag text-accent mb-4">Víctimas potenciales</p>
          <p className="body-sm text-fg/90 leading-relaxed flex-1 flex items-center">
            {VICTIMS.potenciales}
          </p>
        </Card>
      </div>
    </Slide>
  );
}

/* ================================================================== */
/*  5 · EL DERECHO VENTANA                                              */
/* ================================================================== */
export function SlideDerechoVentana() {
  return (
    <Slide>
      <Deco logo="unach" size={300} className="-bottom-20 -left-16" opacity={0.04} />
      <SlideHeader
        eyebrow="Capítulo I · 1.3 Derechos violentados"
        title="El Derecho Ventana"
      />

      <Card className="p-5 md:p-6 mb-3 w-full">
        <p className="eyebrow-tag text-accent mb-1 tracking-[0.2em]">DERECHO VENTANA</p>
        <h3 className="font-serif text-[clamp(1.5rem,2.4vw,2.4rem)] font-bold leading-tight">
          Derecho de niñas, niños y adolescentes al acceso, uso y aprovechamiento efectivo de las TIC
        </h3>
      </Card>

      {/* Mismo alto entre tarjetas con contenido justificado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch auto-rows-fr">
        {LEGAL_RIGHTS.map((l) => (
          <Card key={l.source} className="p-5 relative overflow-hidden h-full flex flex-col justify-between text-justify">
            <div
              className="absolute top-0 left-0 w-[4px] h-full origin-top"
              style={{ background: 'linear-gradient(180deg, var(--c-accent), var(--c-accent-2))' }}
            />
            <div>
              <div className="flex gap-2 mb-2 items-center pl-2 text-left">
                <Scale className="w-4 h-4 text-accent shrink-0" />
                <span className="eyebrow-tag text-accent">{l.source}</span>
              </div>
              <p className="font-serif text-[clamp(1rem,1.25vw,1.25rem)] text-fg/90 leading-relaxed pl-2 text-justify">
                {l.text}
              </p>
            </div>
            <p className="body-sm text-muted mt-3 pt-2 border-t border-line pl-2 text-left">{l.note}</p>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

/* ================================================================== */
/*  6 · DERECHOS INTERDEPENDIENTES                                      */
/* ================================================================== */
export function SlideDerechosInterdependientes() {
  return (
    <Slide>
      <Deco logo="cecocise" size={300} className="-bottom-14 -left-14" opacity={0.04} />
      <SlideHeader
        eyebrow="Capítulo I · 1.3 Derechos violentados"
        title="Derechos y principios interdependientes e indivisibles"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CONNECTED_RIGHTS.map((c) => (
          <Card key={c.title} className="p-5 relative overflow-hidden">
            <div
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none"
              style={{ backgroundColor: 'color-mix(in srgb, var(--c-accent) 7%, transparent)' }}
            />
            {/* Título en rojo primario (text-accent) */}
            <h4 className="font-serif text-[clamp(1.25rem,1.6vw,1.55rem)] font-semibold text-accent mb-2 relative z-10 leading-tight">
              {c.title}
            </h4>
            <p className="body-sm text-muted leading-snug relative z-10">{c.text}</p>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

/* ================================================================== */
/*  7 · AUTORIDADES INVOLUCRADAS                                        */
/* ================================================================== */
const AUTHORITY_GROUPS: TabGroup[] = ['Federal', 'Estatal', 'Escolar'].map((level) => ({
  id: level.toLowerCase(),
  label: level,
  items: INVOLVED_AUTHORITIES.filter((a) => a.level === level).map((a) => ({
    title: a.entity,
    detail: a.duty,
  })),
}));

export function SlideAutoridadesInvolucradas() {
  return (
    <Slide>
      <Deco logo="unach" size={310} className="-bottom-20 -right-16" opacity={0.04} />
      <SlideHeader
        eyebrow="Capítulo I · 1.4 Autoridades y servidores públicos"
        title="Autoridades y servidores públicos involucrados"
        lead="La obligación no recae en una sola institución. Estas son las autoridades de los ámbitos federal, estatal y escolar cuyas competencias se examinan en el caso."
      />

      {/* Alto fijo y estable para evitar desplazamiento en escritorio */}
      <VerticalTabs
        label="Autoridades por nivel"
        groups={AUTHORITY_GROUPS}
        desktopHeight="md:h-[34rem] lg:h-[36rem]"
      />
    </Slide>
  );
}

/* ================================================================== */
/*  8 · EXPOSICIÓN DEL CASO                                             */
/* ================================================================== */
export function SlideExposicion() {
  return (
    <Slide>
      <Deco logo="mddh" size={330} className="-top-20 -right-20" opacity={0.04} />
      <SlideHeader eyebrow="Capítulo I · 1.5 Exposición del caso" title="Exposición del caso" />

      <Card className="p-4 sm:p-5 mb-3">
        <p className="font-serif text-[clamp(1.05rem,1.45vw,1.4rem)] text-fg/90 leading-[1.45]">
          Las y los estudiantes de la Escuela Secundaria Técnica No. 156 "Real del Bosque", en Tuxtla
          Gutiérrez, Chiapas, ven afectado su derecho de acceso, uso y aprovechamiento de las TIC porque
          la escuela no cuenta con las herramientas necesarias, tanto de infraestructura como de apoyo
          docente, pese a que existen políticas públicas que obligan a garantizarlas.
        </p>
      </Card>

      <WaveTimeline title="Políticas de inclusión digital en México" />

      <p className="body-sm text-muted mt-3">
        La existencia de estas políticas no se ha traducido en condiciones reales dentro de la institución.
        Muchos de estos programas fueron temporales, de cobertura limitada o dejaron de aplicarse sin una
        política que les diera continuidad, sobre todo en capacitación y acompañamiento del personal
        docente.
      </p>
    </Slide>
  );
}

/* ================================================================== */
/*  9 · FUSIÓN: ETAPAS DE LA DEFENSA, RESULTADOS Y CODA (9 + 10)         */
/* ================================================================== */
export function SlideEtapaDefensaResultado() {
  const etapas = [
    {
      key: '',
      title: 'Orientación',
      text: 'Para que el derecho pueda ejercerse plenamente se requieren condiciones reales de infraestructura, conectividad y factor humano capacitado.',
      icon: BookOpen,
    },
    {
      key: '',
      title: 'Complicación',
      text: 'La falta de formación docente y la prohibición de dispositivos generan una brecha entre el derecho legal y la realidad del aula.',
      icon: TriangleAlert,
    },
    {
      key: '',
      title: 'Evaluación',
      text: 'Se documenta la situación escolar sobre dispositivos, conectividad, capacitación docente y efectos concretos en el aprendizaje.',
      icon: FileSearch,
    },
  ];

  const medidas = [
    'Fortalecimiento de infraestructura y conectividad.',
    'Capacitación y actualización docente continua.',
    'Asignación presupuestaria específica y suficiente.',
    'Garantías de igualdad y medidas de no repetición.',
  ];

  return (
    <Slide>
      <Deco logo="unach" size={320} className="-top-20 -right-20" opacity={0.04} />
      <SlideHeader
        eyebrow="Capítulo I · 1.5.1 - 1.5.5"
        title="Orientación, evaluación y resultado esperado de la defensa"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 mb-5">
        {etapas.map((e) => (
          <Card key={e.key} className="p-5 flex flex-col h-full">
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--c-accent)' }}
              >
                <e.icon className="w-4 h-4" style={{ color: 'var(--c-surface)' }} />
              </div>
              <span className="eyebrow-tag text-accent">{e.key}</span>
              <h4 className="font-serif text-[clamp(1.1rem,1.4vw,1.35rem)] font-semibold text-fg leading-tight">
                {e.title}
              </h4>
            </div>
            <p className="body-sm text-muted leading-snug">{e.text}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
        <Card className="p-6">
          <p className="eyebrow-tag text-accent mb-2">Resultado esperado</p>
          <p className="body-sm text-fg/90 leading-snug mb-3">
            Acreditar el incumplimiento y la afectación a derechos humanos para exigir a las autoridades
            la adopción de medidas correctivas integrales:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {medidas.map((m) => (
              <li key={m} className="flex gap-2 body-sm text-muted leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 flex flex-col justify-between">
          <div>
            <p className="eyebrow-tag text-accent mb-2">CODA</p>
            <p className="body-sm text-fg/90 leading-relaxed">
              El caso busca pasar de la identificación de una brecha digital a la defensa jurídica efectiva:
              documentar los hechos, determinar los derechos vulnerados, establecer las obligaciones
              omitidas y construir el mecanismo de exigibilidad que asegure garantías de no repetición.
            </p>
          </div>
          <p className="body-sm text-muted pt-2 border-t border-line mt-2">
            Construir precedentes para la generación o adecuación de políticas públicas en beneficio de NNA.
          </p>
        </Card>
      </div>
    </Slide>
  );
}

/* ================================================================== */
/*  10 · FUSIÓN: EVIDENCIAS DEL CASO Y CONTEXTO NORMATIVO (11 + 12)     */
/* ================================================================== */
export function SlideEvidenciasNormativo() {
  return (
    <Slide>
      <Deco logo="cecocise" size={320} className="-bottom-20 -right-16" opacity={0.04} />
      <SlideHeader
        eyebrow="Capítulo 2 · 2.1 - 2.2"
        title="Evidencias del caso y contexto normativo"
        lead="La evidencia empírica en Chiapas contrasta con un marco constitucional e internacional que consagra a las TIC como derecho habilitante de la educación."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
        {/* Columna 1: Evidencias del caso */}
        <Card className="p-6 flex flex-col justify-between h-full">
          <div>
            <p className="eyebrow-tag text-accent mb-2">2.1 Evidencias del caso</p>
            <h4 className="body-lg font-serif font-semibold text-fg mb-3">Rezago estructural documentado</h4>
             <div className="flex flex-col gap-5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="body-sm text-fg">Primarias en Chiapas con cómputo educativo (INEE)</span>
                  <span className="font-serif font-bold text-accent">{INEE_SCHOOLS_CHIAPAS[0].value}%</span>
                </div>
                <MeterBar pct={INEE_SCHOOLS_CHIAPAS[0].value} color="var(--c-accent)" delay={0.2} />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="body-sm text-fg">Secundarias en Chiapas con cómputo educativo (INEE)</span>
                  <span className="font-serif font-bold text-accent">{INEE_SCHOOLS_CHIAPAS[1].value}%</span>
                </div>
                <MeterBar pct={INEE_SCHOOLS_CHIAPAS[1].value} color="var(--c-accent)" delay={0.3} />
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-line flex flex-col gap-3">
            <p className="body-sm text-muted leading-snug">
              • <strong>Internet para Todos (2022):</strong> anunció cobertura en 115 municipios, pero sin garantía de conectividad funcional en las aulas.
            </p>
            <p className="body-sm text-muted leading-snug">
              • <strong>Discontinuidad federal:</strong> MiCompu.mx y @prende 2.0 fueron temporales y no sostuvieron la formación docente en Chiapas.
            </p>
          </div>
        </Card>

        {/* Columna 2: Contexto normativo */}
        <Card className="p-6 flex flex-col justify-between h-full">
          <div>
            <p className="eyebrow-tag text-accent mb-2">2.2 Contexto normativo</p>
            <h4 className="body-lg font-serif font-semibold text-fg mb-3">Obligación estatal indelegable</h4>
            <ul className="flex flex-col gap-4">
              {[
                ['CPEUM arts. 6.º y 3.º', 'Acceso garantizado a TIC e internet; educación inclusiva y de excelencia.'],
                ['CPEUM art. 1.º y PIDESC 2.1', 'Principio de progresividad y no regresividad con el máximo de recursos disponibles.'],
                ['LGDNNA arts. 101 Bis a 101 Bis 3', 'Inclusión digital universal, equidad, calidad y uso seguro para la niñez.'],
                ['CDN art. 17 y PIDESC art. 13', 'Acceso a información plural por medios digitales y desarrollo integral de la personalidad.'],
              ].map(([norma, desc]) => (
                <li key={norma} className="flex gap-2.5 body-sm text-muted leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span><strong className="text-fg">{norma}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="body-sm text-muted pt-3 border-t border-line">
            El marco legal no es meramente declarativo: impone obligaciones positivas de dotación, capacitación y equidad.
          </p>
        </Card>
      </div>

      <SourceNote>
        <SourceLink source={SOURCES.ineescuelas} /> <SourceLink source={SOURCES.endutih2025} />{' '}
        <SourceLink source={SOURCES.leyes} />
      </SourceNote>
    </Slide>
  );
}

/* ================================================================== */
/*  11 · CONTEXTO POLÍTICO (DISEÑO ONDA INTERACTIVA COMO SLIDE 8)        */
/* ================================================================== */
export function SlideContextoPolitico() {
  return (
    <Slide>
      <Deco logo="mddh" size={330} className="-top-20 -right-20" opacity={0.04} />
      <SlideHeader
        eyebrow="Capítulo 2 · 2.3 Contexto político"
        title="Contexto político"
        lead="Trayectoria de las políticas de inclusión digital y acciones vigentes a nivel federal y en el estado de Chiapas."
      />

      <WaveTimeline title="Trayectoria de la política pública (2003-2030)" />

      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="p-4">
          <p className="eyebrow-tag text-accent mb-1">Política federal vigente</p>
          <p className="body-sm text-fg/90 leading-snug">
            El Plan Nacional de Conectividad 2026-2030 amplía el acceso a internet, pero la conectividad
            no sustituye la dotación de equipos ni la capacitación pedagógica de los docentes.
          </p>
        </Card>
        <Card className="p-4">
          <p className="eyebrow-tag text-accent mb-1">Acciones en Chiapas</p>
          <p className="body-sm text-fg/90 leading-snug">
            La Secretaría de Educación estatal y ADITECH han coordinado acciones que no han logrado cerrar
            la brecha digital en las escuelas con mayores carencias de infraestructura.
          </p>
        </Card>
      </div>
    </Slide>
  );
}

/* ================================================================== */
/*  12 · CONTEXTO ECONÓMICO Y PRESUPUESTARIO                            */
/* ================================================================== */
export function SlideContextoEconomico() {
  const { palette } = useTheme();
  const accessRows = [
    { label: 'Hogares con internet', mx: 78.3, chi: 53.9 },
    { label: 'Dispositivos inteligentes', mx: 30.9, chi: 10.6 },
    ...DIGITAL_ACCESS_2025.filter((item) => item.label.startsWith('Personas')).map((item) => ({
      label: item.label,
      mx: item.national,
      chi: item.chiapas,
    })),
  ];

  return (
    <Slide>
      <Deco size={320} className="-top-24 -right-20" opacity={0.05} />
      <SlideHeader
        eyebrow="Capítulo 2 · 2.4 Contexto económico"
        title="Contexto económico y presupuestario"
        lead="Los programas de inclusión digital dependieron de presupuestos anuales que no siempre se mantuvieron, lo que generó interrupciones en la dotación de equipos y en la formación docente."
      />

      {/* Textos distribuidos a lo alto de cada tarjeta */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.2fr_0.75fr] gap-4 lg:gap-5 items-stretch">
        <Card className="p-5 flex flex-col justify-between h-full">
          <div>
            <p className="eyebrow-tag text-accent mb-2">Presupuesto de Egresos de la Federación 2026</p>
            <div className="flex flex-col gap-1 text-justify">
              <p className="body-sm text-muted">
                Gasto neto total: <strong className="text-fg">10.19 billones de pesos</strong>
              </p>
              <p className="body-sm text-muted">
                Educación Pública (Ramo 11): <strong className="text-fg">523 858.2 mdp</strong> · 5.1 %
              </p>
              <p className="body-sm text-muted">
                Presupuesto TIC federal: <strong className="text-accent">33 395 mdp</strong> · 0.33 %
              </p>
            </div>
          </div>
          <div className="my-auto py-2">
            <SharePie
              data={BUDGET_EDUCATION_SHARE}
              highlightColor={palette.accent}
              restColor={palette.neutralBar}
              centerValue="5.1 %"
              centerLabel="a educación"
              formatter={(v) => `${v.toLocaleString('es-MX', { maximumFractionDigits: 1 })} mdp`}
            />
          </div>
          <p className="body-sm text-muted text-justify">
            El presupuesto TIC federal cae <strong className="text-accent">−1.9 %</strong>, segundo recorte
            consecutivo. La SEP figura entre las dependencias con mayor reducción.
          </p>
        </Card>

        <Card className="p-5 flex flex-col justify-between h-full">
          <p className="eyebrow-tag text-accent mb-2">Brecha de acceso, ENDUTIH</p>
          <div className="flex flex-col justify-around flex-1 gap-4 py-2">
            {accessRows.map((r) => (
              <div key={r.label}>
                <p className="body-sm text-fg mb-1">{r.label}</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="body-sm text-muted w-16 shrink-0">México</span>
                  <MeterBar pct={r.mx} color="var(--c-fg)" delay={0.3} />
                  <b className="font-serif text-lg text-fg tabular-nums w-14 shrink-0">{r.mx}%</b>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="eyebrow-tag text-accent w-16 shrink-0">Chiapas</span>
                  <MeterBar pct={r.chi} color="var(--c-accent)" delay={0.42} />
                  <b className="font-serif text-lg text-accent tabular-nums w-14 shrink-0">{r.chi}%</b>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-between h-full">
          <p className="eyebrow-tag text-accent mb-2">Otros indicadores</p>
          <div className="flex flex-col justify-center items-center flex-1 gap-8 py-3 text-center">
            {[
              {
                value: CASE_CONTEXT.tabletasChiapas2016.toLocaleString('es-MX'),
                l: 'tabletas entregadas en Chiapas en 2016, sin política sostenida de mantenimiento.',
              },
              {
                value: '262 mil',
                l: 'escuelas públicas en México sin diagnóstico uniforme de equipamiento (México Evalúa, 2026).',
              },
            ].map((n) => (
              <div key={n.l} className="w-full flex flex-col items-center text-center">
                <p className="metric-sm text-accent tabular-nums text-center font-bold">{n.value}</p>
                <p className="body-sm text-muted leading-snug mt-2 max-w-[22rem]">{n.l}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <SourceNote>
        <SourceLink source={SOURCES.pef2026} /> <SourceLink source={SOURCES.endutih2025} />{' '}
        <SourceLink source={SOURCES.ptic2026} />
      </SourceNote>
    </Slide>
  );
}

/* ================================================================== */
/*  13 · CONTEXTO SOCIAL                                                */
/* ================================================================== */
export function SlideContextoSocial() {
  return (
    <Slide>
      <Deco logo="cecocise" size={320} className="-top-20 -right-20" opacity={0.04} />
      <SlideHeader eyebrow="Capítulo 2 · 2.5 Contexto social" title="Contexto social" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="p-5 flex flex-col">
          <p className="eyebrow-tag text-accent mb-2">Contexto urbano periférico</p>
          <p className="body-md text-fg/90 leading-snug">
            La brecha digital en Chiapas opera como una nueva capa de vulnerabilidad que se superpone a
            otras formas de exclusión social, como la pobreza, la marginación y la pertenencia a pueblos
            indígenas. Las y los estudiantes se encuentran en un contexto urbano periférico donde las
            condiciones socioeconómicas de las familias limitan el acceso a dispositivos y conectividad en
            el hogar.
          </p>
        </Card>

        <Card className="p-5 flex flex-col">
          <p className="eyebrow-tag text-accent mb-2">Doble exclusión</p>
          <div className="flex flex-col gap-2 flex-1">
            {[
              ['Falta de acceso en el hogar', 'Las familias enfrentan limitaciones económicas para acceder a conectividad y dispositivos.'],
              ['Insuficiencia de recursos en la escuela', 'La institución no cuenta con los recursos necesarios para compensar esta desventaja.'],
            ].map(([t, d]) => (
              <div key={t} className="flex gap-2.5 body-sm text-muted leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span><strong className="text-fg">{t}.</strong> {d}</span>
              </div>
            ))}
          </div>
          <p className="body-sm text-muted mt-auto pt-3 border-t border-line">
            La prohibición de dispositivos tecnológicos en el aula, sumada a la falta de capacitación
            docente y de infraestructura adecuada, profundiza la brecha.
          </p>
        </Card>

        <Card className="p-5 flex flex-col">
          <p className="eyebrow-tag text-accent mb-2">Brecha digital y desigualdades</p>
          <p className="body-md text-fg/90 leading-snug flex-1">
            La evidencia disponible muestra que la brecha digital no es solo un problema técnico, sino un
            fenómeno social que reproduce desigualdades estructurales. Las y los estudiantes que no acceden
            a las TIC en condiciones de igualdad ven limitadas sus oportunidades educativas, laborales y
            de participación ciudadana, lo que afecta su desarrollo integral y su ejercicio pleno de
            derechos humanos.
          </p>
          <p className="body-sm text-muted mt-3 pt-3 border-t border-line">
            Tuxtla Gutiérrez concentra la mayor actividad económica del estado, pero aun en un contexto
            urbano las familias enfrentan limitaciones que hacen más urgente que la escuela compense estas
            desventajas.
          </p>
        </Card>
      </div>
    </Slide>
  );
}

/* ================================================================== */
/*  14 · EVOLUCIÓN NACIONAL (ENDUTIH)                                   */
/* ================================================================== */
export function SlideNumeralia() {
  const { palette } = useTheme();

  return (
    <Slide>
      <Deco size={340} className="-top-28 -left-24" opacity={0.05} />
      <SlideHeader
        eyebrow="Numeralia · Encuesta Nacional sobre Disponibilidad y Uso de Tecnologías de la Información en los Hogares (ENDUTIH)"
        title="Evolución del acceso a internet en hogares mexicanos"
        lead="La tendencia nacional crece de forma sostenida, pero la cifra promedio oculta disparidades regionales profundas que afectan directamente a la niñez de Chiapas."
      />

      <div className="grid grid-cols-1 sm:grid-cols-[0.85fr_1.3fr] gap-4 lg:gap-5 items-stretch">
        <Card className="p-6 md:p-8 flex flex-col justify-center text-center">
          <p className="eyebrow-tag text-muted mb-3">Hogares con internet · 2025</p>
          <p className="metric-xl text-fg mb-3">
            <AnimatedNumber value={78.3} decimals={1} delay={0.4} duration={2} />
            <span className="text-accent text-[0.55em] align-top">%</span>
          </p>
          <div className="w-14 h-[2px] bg-accent mx-auto my-3" />
          <p className="body-sm text-muted">Se duplicó respecto a 2015 (39.0 %).</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-accent">
            <Wifi className="w-4 h-4 shrink-0" />
            <span className="body-sm font-sans">+39.3 pp en una década</span>
          </div>
        </Card>

        <Card className="p-4 md:p-5 flex flex-col">
          <h4 className="body-md font-semibold text-fg mb-3">% de hogares con internet · serie histórica</h4>
          <div className="chart-frame">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={INTERNET_TREND} margin={{ top: 6, right: 8, bottom: 4, left: -12 }}>
                <defs>
                  <linearGradient id="gradInet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={palette.accent} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={palette.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 4" stroke={palette.line} vertical={false} />
                <XAxis dataKey="year" tick={{ fill: palette.muted, fontSize: 15 }} axisLine={{ stroke: palette.line }} tickLine={false} />
                <YAxis domain={[20, 90]} tick={{ fill: palette.muted, fontSize: 14 }} axisLine={false} tickLine={false} tickFormatter={(v: any) => `${v}%`} />
                <Tooltip
                  cursor={{ stroke: palette.accent, strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ backgroundColor: palette.surface, border: `1px solid ${palette.line}`, borderRadius: 12, color: palette.fg, fontSize: 16 }}
                  labelStyle={{ color: palette.muted }}
                  formatter={(v: any) => [`${v}%`, 'Hogares']}
                />
                <Area type="monotone" dataKey="value" stroke="none" fill="url(#gradInet)" animationDuration={1800} />
                <Line
                  type="monotone" dataKey="value" stroke={palette.accent} strokeWidth={3}
                  dot={{ fill: palette.accent, r: 5, strokeWidth: 0 }}
                  activeDot={{ r: 8, fill: palette.surface, stroke: palette.accent, strokeWidth: 3 }}
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <SourceNote href={SOURCES.endutih2025.url}>{SOURCES.endutih2025.short}</SourceNote>
    </Slide>
  );
}

/* ================================================================== */
/*  15 · MÉXICO VS. CHIAPAS (BRECHA REGIONAL)                           */
/* ================================================================== */
export function SlideComparativa() {
  const { palette } = useTheme();

  return (
    <Slide>
      <Deco size={330} className="-top-24 -right-20" opacity={0.05} />
      <SlideHeader
        eyebrow="Numeralia · Brecha regional"
        title="México vs. Chiapas: la brecha regional"
        lead="Datos 2024. La distancia entre los promedios nacionales y los de Chiapas es de 16 a 23 puntos porcentuales en los principales indicadores."
      />

      <Card className="p-4 md:p-5 flex flex-col">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-2">
          <h4 className="body-md font-semibold text-fg">Comparativa en porcentaje</h4>
          <div className="flex items-center gap-4 sm:ml-auto body-sm text-muted">
            <span className="flex items-center gap-2">
              <i className="w-3 h-3 rounded-sm inline-block shrink-0" style={{ backgroundColor: palette.neutralBar }} /> México
            </span>
            <span className="flex items-center gap-2">
              <i className="w-3 h-3 rounded-sm inline-block shrink-0" style={{ backgroundColor: palette.accent }} /> Chiapas
            </span>
          </div>
        </div>
        <div className="chart-frame chart-frame--tall">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REGIONAL_CHART_2024} barGap={6} barCategoryGap={26} margin={{ top: 22, right: 8, bottom: 4, left: -12 }}>
              <CartesianGrid strokeDasharray="3 4" stroke={palette.line} vertical={false} />
              <XAxis dataKey="name" tick={{ fill: palette.muted, fontSize: 13 }} axisLine={{ stroke: palette.line }} tickLine={false} interval={0} />
              <YAxis domain={[0, 100]} tick={{ fill: palette.muted, fontSize: 14 }} axisLine={false} tickLine={false} tickFormatter={(v: any) => `${v}%`} />
              <Tooltip
                cursor={{ fill: 'color-mix(in srgb, currentColor 6%, transparent)' }}
                contentStyle={{ backgroundColor: palette.surface, border: `1px solid ${palette.line}`, borderRadius: 12, color: palette.fg, fontSize: 16 }}
                labelStyle={{ color: palette.muted }}
                formatter={(v: any) => (v === null || v === undefined ? 'Sin dato estatal publicado' : `${v}%`)}
              />
              <Bar dataKey="México" fill={palette.neutralBar} radius={[6, 6, 0, 0]} animationDuration={1400}>
                <LabelList dataKey="México" position="top" fill={palette.fg} fontSize={13} formatter={(v: any) => `${v}%`} />
              </Bar>
              <Bar dataKey="Chiapas" fill={palette.accent} radius={[6, 6, 0, 0]} animationDuration={1700}>
                <LabelList dataKey="Chiapas" position="top" fill={palette.accent} fontSize={13} formatter={(v: any) => (v === null || v === undefined ? '' : `${v}%`)} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Dato complementario oficial para contextualizar la barra de Chiapas */}
        <div className="mt-3 p-3.5 bg-surface-2 rounded-xl border border-line">
          <p className="eyebrow-tag text-accent mb-1">Evidencia oficial complementaria sobre Chiapas</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs md:text-sm text-muted">
            <p>
              • <strong>Hogares con niñez (Censo INEGI 2020):</strong> en viviendas con población de 6 a 14 años en Chiapas, únicamente el <strong className="text-fg">21.4 %</strong> disponía de internet y <strong className="text-fg">11.2 %</strong> de computadora (vs. 52.1 % y 37.6 % nacional).
            </p>
            <p>
              • <strong>Adolescentes (ENDUTIH 2024, Tab. 3.14):</strong> en el grupo de 12 a 17 años, en Chiapas el <strong className="text-fg">77.2 %</strong> usa internet frente al <strong className="text-fg">95.1 %</strong> nacional (brecha de 17.9 pp).
            </p>
            <p>
              • <strong>Escuelas secundarias (Mejoredu / INEE):</strong> solo el <strong className="text-fg">50.7 %</strong> cuenta con al menos una computadora para uso educativo y apenas el <strong className="text-fg">23.2 %</strong> dispone de conexión a internet.
            </p>
          </div>
        </div>
      </Card>

      <SourceNote>
        <SourceLink source={SOURCES.endutih2024} /> <SourceLink source={SOURCES.redim2026} /> INEGI, Censo de Población 2020; Mejoredu (2023).
      </SourceNote>
    </Slide>
  );
}

/* ================================================================== */
/*  16 · RANKING ESTATAL                                                 */
/* ================================================================== */
export function SlideRanking() {
  const { palette } = useTheme();
  const data = [...STATE_RANKING_2025].sort((a, b) => a.value - b.value);

  const barColor = (kind: string) => {
    if (kind === 'chiapas') return palette.accent;
    if (kind === 'nacional') return palette.accent2;
    return palette.neutralBar;
  };

  const barOpacity = (kind: string) => {
    if (kind === 'chiapas') return 1;
    if (kind === 'nacional') return 0.85;
    return 0.38;
  };

  return (
    <Slide>
      <Deco logo="unach" size={320} className="-bottom-24 -right-20" opacity={0.04} />
      <SlideHeader
        eyebrow="Numeralia · Ranking estatal"
        title="Chiapas, entre los estados con menor acceso"
        lead="Porcentaje de hogares con internet. INEGI, ENDUTIH 2025."
      />

      <Card className="p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-3">
          <h4 className="body-md font-semibold text-fg">Hogares con internet por entidad federativa, 2025</h4>
          <div className="flex flex-wrap items-center gap-4 sm:ml-auto body-sm text-muted">
            <span className="flex items-center gap-2">
              <i className="w-3 h-3 rounded-sm inline-block shrink-0" style={{ backgroundColor: palette.accent }} /> Chiapas
            </span>
            <span className="flex items-center gap-2">
              <i className="w-3 h-3 rounded-sm inline-block shrink-0" style={{ backgroundColor: palette.accent2 }} /> Promedio nacional
            </span>
            <span className="flex items-center gap-2">
              <i className="w-3 h-3 rounded-sm inline-block shrink-0 opacity-40" style={{ backgroundColor: palette.neutralBar }} /> Otras entidades
            </span>
          </div>
        </div>

        <div className="chart-frame chart-frame--tall">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 4, right: 58, bottom: 4, left: 8 }} barSize={22}>
              <CartesianGrid strokeDasharray="3 4" stroke={palette.line} horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: palette.muted, fontSize: 13 }} axisLine={{ stroke: palette.line }} tickLine={false} tickFormatter={(v: any) => `${v}%`} />
              <YAxis dataKey="name" type="category" tick={{ fill: palette.muted, fontSize: 13 }} axisLine={false} tickLine={false} width={132} interval={0} />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{ backgroundColor: palette.surface, border: `1px solid ${palette.line}`, borderRadius: 12, color: palette.fg, fontSize: 16 }}
                labelStyle={{ color: palette.muted }}
                formatter={(v: any) => [`${v}%`, 'Hogares con internet']}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} animationDuration={1500}>
                {data.map((e, i) => (
                  <Cell key={i} fill={barColor(e.kind)} fillOpacity={barOpacity(e.kind)} />
                ))}
                <LabelList dataKey="value" position="right" fill={palette.fg} fontSize={13} formatter={(v: any) => `${v}%`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Card className="px-4 py-3">
          <p className="eyebrow-tag text-muted mb-1">Chiapas vs. Ciudad de México</p>
          <p className="metric-sm text-accent">36.6 pp</p>
          <p className="body-sm text-muted mt-1">53.9 % frente a 90.5 %</p>
        </Card>
        <Card className="px-4 py-3">
          <p className="eyebrow-tag text-muted mb-1">Lugar que ocupa Chiapas</p>
          <p className="metric-sm text-accent">32 de 32</p>
          <p className="body-sm text-muted mt-1">Último lugar nacional en 2025</p>
        </Card>
      </div>

      <SourceNote href={SOURCES.endutih2025.url}>{SOURCES.endutih2025.short}</SourceNote>
    </Slide>
  );
}

/* ================================================================== */
/*  17 · TIC Y EDUCACIÓN                                                */
/* ================================================================== */
export function SlideEducacionTic() {
  return (
    <Slide>
      <Deco logo="cecocise" size={320} className="-top-20 -right-16" opacity={0.04} />
      <SlideHeader
        eyebrow="Numeralia · Educación y TIC"
        title="Las TIC sostienen el aprendizaje"
        lead="El uso educativo de la tecnología es amplio, pero la desigualdad de acceso coincide con un contexto escolar más adverso en Chiapas."
      />

      <div className="grid grid-cols-2 lg:grid-cols-[1fr_1fr_2fr] lg:grid-rows-2 gap-3 lg:gap-4">
        <div className="lg:row-span-2">
          <Card className="p-7 lg:p-9 flex flex-col items-center justify-center text-center gap-5 h-full min-h-[17rem]">
            <School className="w-7 h-7 text-accent" aria-hidden />
            <p className="eyebrow-tag text-muted">Uso educativo de internet</p>
            <p className="metric-lg text-accent font-bold text-center">
              <AnimatedNumber value={85.6} decimals={1} delay={0.35} suffix="%" />
            </p>
            <p className="body-sm text-muted max-w-sm">
              Usuarios que lo emplearon para apoyar educación o capacitación, México, 2020.
            </p>
          </Card>
        </div>
        <div className="lg:row-span-2">
          <Card className="p-7 lg:p-9 flex flex-col items-center justify-center text-center gap-5 h-full min-h-[17rem]">
            <Laptop className="w-7 h-7 text-accent" aria-hidden />
            <p className="eyebrow-tag text-muted">Labores escolares</p>
            <p className="metric-lg text-accent font-bold text-center">
              <AnimatedNumber value={54.9} decimals={1} delay={0.5} suffix="%" />
            </p>
            <p className="body-sm text-muted max-w-sm">
              Usuarios de computadora en el hogar que realizaron labores escolares, México, 2020.
            </p>
          </Card>
        </div>
        {SECONDARY_EDUCATION_2024.map((metric, index) => (
          <ComparisonMetric key={metric.label} {...metric} delay={0.35 + index * 0.15} />
        ))}
      </div>

      <motion.div variants={fadeUp} className="mt-4 flex items-start gap-3 body-sm text-muted">
        <TriangleAlert className="w-5 h-5 text-accent shrink-0" aria-hidden />
        <p>
          En secundaria, la eficiencia terminal fue de 85.4 % en Chiapas frente a 90.5 % nacional; el
          abandono escolar fue de 5.4 % frente a 3.7 % en el ciclo 2023-2024.
        </p>
      </motion.div>

      <SourceNote>
        <SourceLink source={SOURCES.educationUse} /> <SourceLink source={SOURCES.sep2024} />
      </SourceNote>
    </Slide>
  );
}

/* ================================================================== */
/*  18 · PISA 2025 (MOVIDA DESPUÉS DE TIC Y EDUCACIÓN)                  */
/* ================================================================== */
export function SlidePisa2025() {
  const { palette } = useTheme();

  return (
    <Slide>
      <Deco logo="unach" size={330} className="-bottom-24 -left-20" opacity={0.04} />
      <SlideHeader
        eyebrow="Capítulo 2 · 2.4 Contexto económico y educativo"
        title="Brecha digital y desempeño educativo: PISA 2025"
        lead="México se ubica en el lugar 37 de 38 países miembros de la OCDE evaluados. La evaluación documenta el rezago estructural y la importancia de la orientación pedagógica en el uso de tecnologías."
      />

      <div className="grid grid-cols-1 gap-3 items-stretch">
        <Card className="p-4 flex flex-col">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
            <h4 className="body-md font-semibold text-fg">Resultados frente al promedio OCDE</h4>
            <div className="flex items-center gap-4 sm:ml-auto body-sm text-muted">
              <span className="flex items-center gap-2">
                <i className="w-3 h-3 rounded-sm inline-block shrink-0" style={{ backgroundColor: palette.accent }} /> México
              </span>
              <span className="flex items-center gap-2">
                <i className="w-3 h-3 rounded-sm inline-block shrink-0" style={{ backgroundColor: palette.neutralBar }} /> OCDE
              </span>
            </div>
          </div>
          <div className="chart-frame--short">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PISA_2025} barGap={6} barCategoryGap={24} margin={{ top: 6, right: 8, bottom: 4, left: -12 }}>
                <CartesianGrid strokeDasharray="3 4" stroke={palette.line} vertical={false} />
                <XAxis dataKey="subject" tick={{ fill: palette.muted, fontSize: 12 }} axisLine={{ stroke: palette.line }} tickLine={false} interval={0} />
                <YAxis
                  domain={[0, 550]}
                  ticks={[0, 100, 200, 300, 400, 500]}
                  interval={0}
                  tick={{ fill: palette.muted, fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: 'color-mix(in srgb, currentColor 6%, transparent)' }}
                  contentStyle={{ backgroundColor: palette.surface, border: `1px solid ${palette.line}`, borderRadius: 12, color: palette.fg, fontSize: 16 }}
                  labelStyle={{ color: palette.muted }}
                  formatter={(v: any) => `${v} puntos`}
                />
                <Bar dataKey="mexico" name="México" fill={palette.accent} radius={[6, 6, 0, 0]} animationDuration={1400} />
                <Bar dataKey="oecd" name="OCDE" fill={palette.neutralBar} radius={[6, 6, 0, 0]} animationDuration={1700} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="p-4 flex flex-col">
            <p className="eyebrow-tag text-accent mb-2">Niveles altos</p>
            <div className="flex flex-col gap-2">
              {PISA_LEVELS.map((n) => (
                <div key={n.subject} className="flex items-baseline justify-between gap-2">
                  <span className="body-sm text-fg">{n.subject}</span>
                  <span className="flex items-baseline gap-2">
                    <b className="font-serif text-lg text-accent tabular-nums">{n.mexico}%</b>
                    <span className="body-sm text-muted">vs.</span>
                    <b className="font-serif text-lg text-fg tabular-nums">{n.oecd}%</b>
                  </span>
                </div>
              ))}
            </div>
            <p className="body-sm text-muted mt-2 pt-2 border-t border-line">
              Solo el 0.1 % de los estudiantes mexicanos alcanza niveles altos en matemáticas, frente al 8 %
              del promedio OCDE.
            </p>
          </Card>

          <Card className="p-4 flex flex-col">
            <p className="eyebrow-tag text-accent mb-2">Uso de chatbots de IA</p>
            <div className="grid grid-cols-[auto_1fr] items-center gap-4">
              <p className="metric-md text-fg leading-none">
                <AnimatedNumber value={PISA_AI.mexico} decimals={1} delay={0.4} suffix="%" />
              </p>
              <p className="body-sm text-muted leading-snug">
                de estudiantes mexicanos usa chatbots para apoyar su aprendizaje al menos una vez por semana.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-line flex items-center justify-between gap-3">
              <span className="body-sm text-muted">Promedio OCDE</span>
              <strong className="font-serif text-xl text-fg tabular-nums">{PISA_AI.oecd}%</strong>
            </div>
            <p className="body-sm text-muted mt-3">
              La OCDE advierte que el uso de IA no se traduce automáticamente en mayor aprendizaje.
            </p>
          </Card>
        </div>
      </div>

      <SourceNote>
        <SourceLink source={SOURCES.pisa2025} /> <SourceLink source={SOURCES.imco2026} />
      </SourceNote>
    </Slide>
  );
}

/* ================================================================== */
/*  19 · BRECHA DOCENTE                                                 */
/* ================================================================== */
export function SlideBrechaDocente() {
  return (
    <Slide>
      <Deco logo="mddh" size={340} className="-bottom-20 -left-20" opacity={0.04} />
      <SlideHeader eyebrow="Numeralia · Capacitación docente" title="La brecha docente: capacitación insuficiente" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <Card className="p-5">
          <p className="eyebrow-tag text-muted mb-2">No saben usarlo</p>
          <p className="metric-md text-fg mb-2">
            <AnimatedNumber value={9.5} decimals={1} delay={0.4} />
            <span className="text-accent text-3xl align-top">%</span>
          </p>
          <p className="body-sm text-muted">
            de las personas que no usan internet lo atribuyen a falta de habilidades (ENDUTIH 2024)
          </p>
        </Card>

        {TEACHER_DIGITAL.map((t, i) => (
          <Card key={t.label} className="p-5">
            <p className="eyebrow-tag text-muted mb-2">{t.label}</p>
            <p className="metric-md text-fg mb-2">
              <AnimatedNumber value={t.value} prefix={t.prefix} delay={0.5 + i * 0.12} />
              <span className="text-accent text-3xl align-top">%</span>
            </p>
            <p className="body-sm text-muted">{t.detail}</p>
          </Card>
        ))}
      </div>

      <Card className="p-5 sm:p-6 mb-3 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-[4px] h-full"
          style={{ background: 'linear-gradient(180deg, var(--c-accent), transparent)' }}
        />
        <h4 className="font-serif text-2xl text-fg mb-2 font-semibold">La evidencia cruzada</h4>
        <p className="font-serif body-lg text-muted leading-relaxed">
          México Evalúa (2026) documenta que persiste una{' '}
          <strong className="text-fg">falta de claridad</strong> sobre las condiciones reales de
          conectividad y, sobre todo, sobre la capacitación docente, al cruzar la consulta de la SEP
          con los microdatos de ENDUTIH 2025. El problema no es la ausencia de tecnología: es la
          ausencia de <span className="text-accent font-semibold">preparación institucional</span> para
          que quienes enseñan sepan aprovecharla.
        </p>
      </Card>

      {/* Bloque independiente sin guiones em-dash «—» */}
      <Card className="p-5 sm:p-6 relative overflow-hidden">
        <p className="eyebrow-tag text-accent mb-2">Diagnóstico de herramientas oficiales</p>
        <p className="font-serif body-lg text-fg/90 leading-relaxed">
          Sobre las herramientas digitales que proporciona el gobierno la plataforma Nueva Escuela
          Mexicana Digital y los recursos de @prende.mx no existe un diagnóstico oficial público que
          mide si el personal docente sabe utilizarlas; la evidencia disponible proviene de estudios
          parciales y autodiagnósticos.
        </p>
      </Card>

      <SourceNote>
        <SourceLink source={SOURCES.endutih2024} /> <SourceLink source={SOURCES.talis2018} />{' '}
        <SourceLink source={SOURCES.apertura2023} /> México Evalúa (2026), Preguntar para regular.
      </SourceNote>
    </Slide>
  );
}

/* ================================================================== */
/*  20 · CONCLUSIÓN                                                     */
/* ================================================================== */
export function SlideMotivos() {
  return (
    <Slide className="deck-wheel-through">
      <Deco logo="mddh" size={380} className="-top-16 -right-24" opacity={0.04} />
      <Deco size={240} className="-bottom-20 -left-16" opacity={0.04} />
      <SlideHeader eyebrow="Conclusión" title="Por qué defender este derecho" />

      <Card className="p-7 sm:p-10 lg:p-12 relative overflow-hidden w-full">
        <span
          className="absolute top-2 right-6 md:right-10 font-serif leading-none select-none pointer-events-none text-[clamp(6rem,12vw,11rem)]"
          style={{ color: 'var(--c-accent)', opacity: 0.08 }}
        >
          “
        </span>
        <blockquote className="relative z-10 max-w-5xl">
          <p className="font-serif text-[clamp(1.25rem,2.2vw,2.2rem)] text-fg/90 leading-[1.4] mb-6 text-justify">
            Aunque la niñez en entornos urbanos cuenta con dispositivos electrónicos en casa,{' '}
            <span className="text-accent font-semibold">
              el Estado no está garantizando una educación que asegure su aprovechamiento pedagógico
            </span>
            , lo que genera brecha digital, marginación y desigualdad frente a estudiantes de otros
            contextos. Defender este derecho implica exigir una política de inclusión digital educativa con
            equidad, calidad y no regresividad.
          </p>
          <div
            className="w-16 h-[3px] mb-3"
            style={{ background: 'linear-gradient(90deg, var(--c-accent), transparent)' }}
          />
          <footer className="body-md text-muted font-sans">Víctor Jesús Rumaya Medina</footer>
        </blockquote>
      </Card>
    </Slide>
  );
}

/* ================================================================== */
/*  21 · FUENTES                                                        */
/* ================================================================== */
export function SlideFuentes() {
  const cols = [
    {
      title: 'Legislación',
      refs: [
        'Cámara de Diputados (2024a). Constitución Política de los Estados Unidos Mexicanos.',
        'Cámara de Diputados (2024b). Ley General de los Derechos de Niñas, Niños y Adolescentes.',
        'DOF (2018). Decreto que adiciona el art. 101 Bis a la LGDNNA.',
      ],
    },
    {
      title: 'Instrumentos internacionales',
      refs: [
        'Naciones Unidas (1948). Declaración Universal de los Derechos Humanos.',
        'Naciones Unidas (1966). PIDESC.',
        'Naciones Unidas (1989). Convención sobre los Derechos del Niño.',
        'OCDH (2009). Observación General Núm. 13: el derecho a la educación.',
      ],
    },
    {
      title: 'Hemerografía académica',
      refs: [
        'Martínez Domínguez, M. (2018). Paakat, 8(14).',
        'Moranchel Pocaterra, M. (2019). Rev. Fac. Derecho de México, 69(274).',
        'Torres, R. M. (2006). Ponencia en el Simposio Ciutat.edu.',
        'Villela Cortés, F., y Contreras Islas, D. S. (2021). Academia y Virtualidad, 14(1).',
        'Apertura (2023). Retos en el desarrollo de la competencia digital en docentes de secundaria, 15(1).',
      ],
    },
    {
      title: 'Informes institucionales y estadísticos',
      refs: [
        'ATDT (2026a). Plan Nacional de Conectividad 2026-2030.',
        'ATDT (2026b). Programa de Cobertura Social 2026.',
        'ATDT (2026c). Programa de Conectividad en Sitios Públicos y Áreas de Atención Prioritaria 2026.',
        'ASF (2013). Informe de la Cuenta Pública 2012: HDT (Auditoría 0383).',
        'BID (2026). PISA en América Latina y el Caribe 2025.',
        'BID. Nota CIMA 18: TALIS 2018.',
        'CONEVAL (2013, 2018). Fichas de monitoreo U077.',
        'IMCO (2026). Resultados PISA 2025.',
        'INEGI (2024, 2025, 2026). ENDUTIH 2024 y 2025.',
        'México Evalúa (2026). Preguntar para regular.',
        'OCDE (2026). PISA 2025 Results.',
        'REDIM (2026). Uso de internet de la infancia y adolescencia de México (2015-2024).',
        'SEP (2016). Lineamientos del Programa de Inclusión Digital.',
        'SEP (2020). Agenda Digital Educativa.',
        'SEP-DGPPyEE (2025). Estadística educativa Chiapas 2024-2025.',
      ],
    },
  ];

  return (
    <Slide>
      <Deco logo="unach" size={280} className="-top-14 -right-14" opacity={0.04} />
      <SlideHeader eyebrow="Referencias" title="Fuentes consultadas" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {cols.map((c) => (
          <Card key={c.title} className="p-5 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-[4px] h-full"
              style={{ background: 'linear-gradient(180deg, var(--c-accent), transparent)' }}
            />
            <h4 className="eyebrow-tag text-accent mb-4">{c.title}</h4>
            <ul className="flex flex-col gap-2.5">
              {c.refs.map((r) => (
                <li key={r} className="flex gap-2.5 body-sm text-muted leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span className="font-sans">{r}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

/* ================================================================== */
/*  22 · CIERRE                                                         */
/* ================================================================== */
export function SlideCierre() {
  return (
    <section className="presentation-slide h-[100dvh] w-full relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 dot-grid opacity-[0.12] pointer-events-none" />
      <Deco size={460} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" opacity={0.04} />

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-10">
        <LogoUNACH style={{ height: 74, width: 'auto' }} />
        <span className="h-12 w-px bg-line" aria-hidden />
        <LogoCECOCISE style={{ height: 64, width: 'auto' }} />
        <span className="h-12 w-px bg-line" aria-hidden />
        <LogoMDDH style={{ height: 74, width: 'auto' }} />
      </div>

      <h2 className="relative z-10 font-serif font-bold text-fg leading-[0.85] tracking-tighter text-[clamp(3.4rem,8vw,8.5rem)]">
        {'Gracias'.split('').map((ch, i) => (
          <span key={i} className="inline-block">
            {ch}
          </span>
        ))}
      </h2>

      <div
        className="relative z-10 w-28 h-[3px] my-7 rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent, var(--c-accent), transparent)' }}
      />

      <p className="relative z-10 body-md text-muted tracking-wide text-center">
        Víctor Jesús Rumaya Medina · Maestría en Defensa de los Derechos Humanos · UNACH-CECOCISE
      </p>
      <p className="relative z-10 body-sm text-muted/70 mt-2 text-center">
        Rúbrica II, Módulo I · Agosto-diciembre 2026 · 5 de octubre de 2026
      </p>
    </section>
  );
}

export const SLIDES = [
  SlidePortada, SlideIntroduccion, SlideDescripcionCaso, SlideVictimas,
  SlideDerechoVentana, SlideDerechosInterdependientes, SlideAutoridadesInvolucradas,
  SlideExposicion, SlideEtapaDefensaResultado, SlideEvidenciasNormativo,
  SlideContextoPolitico, SlideContextoEconomico, SlideContextoSocial,
  SlideNumeralia, SlideComparativa, SlideRanking, SlideEducacionTic,
  SlidePisa2025, SlideBrechaDocente, SlideMotivos, SlideFuentes, SlideCierre,
];

export const SLIDE_TITLES = [
  'Portada', 'Introducción: Objeto de defensa', 'Descripción del caso', 'Víctimas del caso',
  'El Derecho Ventana', 'Derechos y principios interdependientes',
  'Autoridades y servidores públicos involucrados', 'Exposición del caso',
  'Orientación, evaluación y resultado esperado', 'Evidencias del caso y contexto normativo',
  'Contexto político', 'Contexto económico y presupuestario', 'Contexto social',
  'Evolución del acceso a internet (ENDUTIH)', 'México vs. Chiapas: la brecha regional',
  'Chiapas, entre los estados con menor acceso', 'Las TIC sostienen el aprendizaje',
  'Brecha digital y desempeño educativo: PISA 2025', 'La brecha docente: capacitación insuficiente',
  'Conclusión', 'Fuentes consultadas', 'Cierre',
];
