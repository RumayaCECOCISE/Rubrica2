import {
  Children, isValidElement, useEffect, useLayoutEffect, useRef, useState,
  type ReactNode,
} from 'react';
import { motion, animate, useMotionValue, type Variants } from 'framer-motion';
import { InstitutionalLogo, type LogoName } from './Logos';
import type { LucideIcon } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

/* ------------------------------------------------------------------ */
/*  Variantes reutilizables                                            */
/* ------------------------------------------------------------------ */
export const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const growBar: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/* ------------------------------------------------------------------ */
/*  Círculo de acento                                                  */
/* ------------------------------------------------------------------ */
export function AccentCircle({
  size = 40,
  label,
}: {
  size?: number;
  label?: string | number;
}) {
  return (
    <span
      className="relative flex items-center justify-center rounded-full shrink-0"
      style={{ width: size, height: size, backgroundColor: 'var(--c-accent)' }}
    >
      {label !== undefined && (
        <span
          className="font-serif font-semibold leading-none select-none"
          style={{ color: 'var(--c-onaccent)', fontSize: size * 0.4 }}
        >
          {label}
        </span>
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Encabezado: se coloca a la derecha del círculo con el número       */
/* ------------------------------------------------------------------ */
export function SlideHeader({
  eyebrow,
  title,
  lead,
}: {
  n?: number;
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="slide-topbar">
      <div className="slide-topbar__row">
        <h2 className="slide-title font-serif font-semibold tracking-tight text-fg">{title}</h2>
        {eyebrow && (
          <span className="slide-eyebrow uppercase tracking-[0.22em] text-muted font-sans">{eyebrow}</span>
        )}
      </div>
      <div
        className="w-24 h-[3px] mt-2 rounded-full"
        style={{ background: 'linear-gradient(90deg, var(--c-accent), transparent)' }}
      />
      {lead && <p className="slide-lead text-muted mt-2 max-w-5xl leading-snug">{lead}</p>}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Tarjeta con microinteracción académica                             */
/* ------------------------------------------------------------------ */
export function Card({
  children,
  className = '',
  variants = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div
      variants={variants}
      whileHover={{
        y: -2,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      className={`fit-card min-w-0 bg-surface border border-line rounded-2xl soft-shadow transition-colors duration-500 hover:border-accent/45 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Contador animado                                                   */
/* ------------------------------------------------------------------ */
export function AnimatedNumber({
  value,
  decimals = 0,
  duration = 1.5,
  delay = 0.2,
  suffix = '',
  prefix = '',
}: {
  value: number;
  decimals?: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
}) {
  const mv = useMotionValue(0);
  const [txt, setTxt] = useState('0');

  useEffect(() => {
    const controls = animate(mv, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setTxt(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [value, decimals, duration, delay, mv]);

  return (
    <span>
      {prefix}
      {txt}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Decoración de fondo                                                */
/* ------------------------------------------------------------------ */
export function Deco({
  logo,
  size = 320,
  className = '',
  opacity = 0.05,
}: {
  logo?: LogoName;
  size?: number;
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ opacity }}
    >
      {logo ? (
        <InstitutionalLogo name={logo} decorative style={{ width: size, height: 'auto' }} />
      ) : (
        <div
          className="rounded-full"
          style={{ width: size, height: size, backgroundColor: 'var(--c-accent)' }}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Barra de progreso horizontal (métrica)                             */
/* ------------------------------------------------------------------ */
export function MeterBar({
  pct,
  color,
  delay = 0,
}: {
  pct: number;
  color: string;
  delay?: number;
}) {
  return (
    <div
      className="h-2.5 w-full rounded-full overflow-hidden"
      style={{ backgroundColor: 'var(--c-app-2)' }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Atribución de fuente (se reubica al pie izquierdo de la diapositiva) */
/* ------------------------------------------------------------------ */
export function SourceNote({
  children,
  href,
}: {
  children: ReactNode;
  href?: string;
}) {
  return (
    <p className="source-note">
      Fuente:{' '}
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-accent/40 underline-offset-2 hover:text-accent"
        >
          {children}
        </a>
      ) : (
        children
      )}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Contenedor base de diapositiva                                     */
/* ------------------------------------------------------------------ */
const DESKTOP_QUERY = '(min-width: 1024px)';

/**
 * Estructura fija: encabezado junto al círculo, contenido al centro y
 * fuentes al pie izquierdo. En escritorio el contenido se reduce de forma
 * proporcional solo si excede el alto disponible, para no desbordar.
 */
export function Slide({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
  center?: boolean;
}) {
  const items = Children.toArray(children);
  const is = (child: ReactNode, type: unknown) => isValidElement(child) && child.type === type;
  const header = items.filter((c) => is(c, SlideHeader));
  const decos = items.filter((c) => is(c, Deco));
  const sources = items.filter((c) => is(c, SourceNote));
  const body = items.filter((c) => !header.includes(c) && !decos.includes(c) && !sources.includes(c));

  const stageRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const fit = fitRef.current;
    if (!stage || !fit) return;
    const desktop = window.matchMedia(DESKTOP_QUERY);

    const measure = () => {
      if (!desktop.matches) {
        setScale(1);
        return;
      }
      const styles = getComputedStyle(stage);
      const available =
        stage.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
      const needed = fit.offsetHeight;
      const next = needed > 0 ? Math.min(1, available / needed) : 1;
      setScale((prev) => (Math.abs(prev - next) < 0.005 ? prev : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(fit);
    desktop.addEventListener('change', measure);
    return () => {
      observer.disconnect();
      desktop.removeEventListener('change', measure);
    };
  }, []);

  return (
    <section className={`presentation-slide presentation-slide--content ${className}`}>
      {decos}
      {header}
      <div ref={stageRef} className="slide-stage">
        <div
          ref={fitRef}
          className="slide-fit"
          style={scale < 1 ? { transform: `scale(${scale})` } : undefined}
        >
          <motion.div variants={container} initial="hidden" animate="show" className="slide-content">
            {body}
          </motion.div>
        </div>
      </div>
      {sources.length > 0 && <footer className="slide-sources">{sources}</footer>}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Cifra de proyección                                                 */
/* ------------------------------------------------------------------ */
interface ProjectionStatProps {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
  detail: string;
  icon?: LucideIcon;
  delay?: number;
}

export function ProjectionStat({
  label,
  value,
  decimals = 0,
  suffix = '',
  detail,
  icon: Icon,
  delay = 0.3,
}: ProjectionStatProps) {
  return (
    <Card className="p-5 md:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="eyebrow-tag text-muted">{label}</p>
        {Icon && <Icon className="w-5 h-5 text-accent shrink-0" aria-hidden />}
      </div>
      <p className="metric-md text-fg mt-auto">
        <AnimatedNumber value={value} decimals={decimals} suffix={suffix} delay={delay} />
      </p>
      <p className="body-sm text-muted mt-2 leading-snug">{detail}</p>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Gráfica de pastel para participaciones presupuestales               */
/* ------------------------------------------------------------------ */
export function SharePie({
  data,
  highlightColor,
  restColor,
  centerValue,
  centerLabel,
  formatter,
}: {
  data: { name: string; value: number }[];
  highlightColor: string;
  restColor: string;
  centerValue: string;
  centerLabel: string;
  formatter: (v: number) => string;
}) {
  return (
    <div className="relative chart-frame--short w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="62%"
            outerRadius="92%"
            startAngle={90}
            endAngle={-270}
            stroke="none"
            animationDuration={1200}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={i === 0 ? highlightColor : restColor} fillOpacity={i === 0 ? 1 : 0.22} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--c-surface)',
              border: '1px solid var(--c-line)',
              borderRadius: 12,
              color: 'var(--c-fg)',
              fontSize: 15,
            }}
            formatter={(v: any) => formatter(Number(v))}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="font-serif font-bold leading-none text-fg text-[clamp(1.8rem,3.4vw,2.9rem)]">
          {centerValue}
        </span>
        <span className="body-sm text-muted mt-1">{centerLabel}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Métrica comparada México vs. Chiapas                                */
/* ------------------------------------------------------------------ */
export function ComparisonMetric({
  label,
  national,
  chiapas,
  delay = 0.3,
}: {
  label: string;
  national: number;
  chiapas: number;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-surface border border-line rounded-xl p-4 md:p-5 min-w-0 h-full"
    >
      <p className="body-md font-semibold text-fg mb-3">{label}</p>
      <div className="grid grid-cols-1 sm:grid-cols-[5.6rem_1fr] items-center gap-x-3 gap-y-1.5">
        <span className="body-sm text-muted">México</span>
        <div className="flex items-center gap-3 min-w-0">
          <MeterBar pct={national} color="var(--c-fg)" delay={delay} />
          <b className="font-serif text-xl text-fg tabular-nums w-16 shrink-0">{national}%</b>
        </div>
        <span className="eyebrow-tag text-accent">Chiapas</span>
        <div className="flex items-center gap-3 min-w-0">
          <MeterBar pct={chiapas} color="var(--c-accent)" delay={delay + 0.12} />
          <b className="font-serif text-xl text-accent tabular-nums w-16 shrink-0">{chiapas}%</b>
        </div>
      </div>
    </motion.div>
  );
}
