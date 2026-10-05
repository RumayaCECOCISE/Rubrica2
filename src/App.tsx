import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon, ArrowLeft, ArrowRight, LayoutGrid, X } from 'lucide-react';
import { ThemeProvider, useTheme } from './theme';
import { SLIDES, SLIDE_TITLES } from './slides';
import { AccentCircle } from './components/ui';
import { CaseTitleProvider } from './components/CaseTitle';

/* ------------------------------------------------------------------ */
/*  Toggle de tema                                                     */
/* ------------------------------------------------------------------ */
function ThemeToggle() {
  const { mode, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Cambiar tema"
      className="relative w-14 h-8 rounded-full border border-line bg-surface flex items-center px-1 transition-colors duration-500 cursor-pointer"
    >
      <span
        className="w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-500"
        style={{
          backgroundColor: 'var(--c-accent)',
          transform: mode === 'dark' ? 'translateX(24px)' : 'translateX(0)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {mode === 'light' ? (
            <motion.span
              key="s"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-3 h-3" style={{ color: 'var(--c-onaccent)' }} />
            </motion.span>
          ) : (
            <motion.span
              key="m"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-3 h-3" style={{ color: 'var(--c-onaccent)' }} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Índice de diapositivas                                             */
/* ------------------------------------------------------------------ */
function SlideIndex({
  open,
  onClose,
  current,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  current: number;
  onPick: (i: number) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] backdrop-blur-md flex items-center justify-center p-6"
          style={{ backgroundColor: 'color-mix(in srgb, var(--c-app) 88%, transparent)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.97, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.97, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-2xl text-fg">Índice de la presentación</h3>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="p-2 rounded-full border border-line hover:border-accent transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-muted" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-2 max-h-[65vh] overflow-y-auto pr-1">
              {SLIDE_TITLES.map((t, i) => (
                <button
                  key={t}
                  onClick={() => {
                    onPick(i);
                    onClose();
                  }}
                  className={`text-left flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors cursor-pointer ${
                    i === current
                      ? 'border-accent bg-surface font-semibold'
                      : 'border-line bg-surface hover:border-accent/50'
                  }`}
                >
                  <span
                    className="eyebrow-tag w-7 shrink-0"
                    style={{ color: i === current ? 'var(--c-accent)' : 'var(--c-muted)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="body-sm text-fg">{t}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Presentación                                                       */
/* ------------------------------------------------------------------ */
function Deck() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [indexOpen, setIndexOpen] = useState(false);
  const lock = useRef(false);

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(SLIDES.length - 1, next));
      if (clamped === current) return;
      setDir(clamped > current ? 1 : -1);
      setCurrent(clamped);
    },
    [current]
  );

  /**
   * Si la diapositiva activa tiene desplazamiento interno (pantallas bajas
   * o móvil), primero se recorre su contenido y solo al llegar al borde se
   * cambia de diapositiva.
   */
  const scrollEdge = useCallback((d: 1 | -1) => {
    const section = document.querySelector<HTMLElement>('.presentation-slide');
    if (!section) return true;
    if (
      section.classList.contains('deck-wheel-through') &&
      window.matchMedia('(min-width: 1024px)').matches
    ) return true;
    const overflow = section.scrollHeight - section.clientHeight;
    if (overflow <= 4) return true;
    return d > 0 ? section.scrollTop >= overflow - 4 : section.scrollTop <= 4;
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (lock.current || indexOpen) return;
      if (Math.abs(e.deltaY) < 22) return;
      const d = e.deltaY > 0 ? 1 : -1;
      if (!scrollEdge(d)) return;
      lock.current = true;
      setTimeout(() => (lock.current = false), 780);
      go(current + d);
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [current, go, indexOpen, scrollEdge]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return setIndexOpen(false);
      if (indexOpen) return;
      if (
        e.target instanceof Element &&
        e.target.closest('button, a, input, textarea, select, [contenteditable="true"], .policy-timeline')
      )
        return;
      if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        go(current + 1);
      } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        go(current - 1);
      } else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(SLIDES.length - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, go, indexOpen]);

  // Soporte táctil: respeta el desplazamiento interno de la diapositiva.
  useEffect(() => {
    let startY = 0;
    const ts = (e: TouchEvent) => (startY = e.touches[0].clientY);
    const te = (e: TouchEvent) => {
      if (indexOpen) return;
      const d = startY - e.changedTouches[0].clientY;
      if (Math.abs(d) < 70) return;
      const direction = d > 0 ? 1 : -1;
      if (!scrollEdge(direction)) return;
      go(current + direction);
    };
    window.addEventListener('touchstart', ts, { passive: true });
    window.addEventListener('touchend', te, { passive: true });
    return () => {
      window.removeEventListener('touchstart', ts);
      window.removeEventListener('touchend', te);
    };
  }, [current, go, indexOpen, scrollEdge]);

  const Active = SLIDES[current];
  const progress = ((current + 1) / SLIDES.length) * 100;

  return (
    <div className="relative h-[100dvh] w-full bg-app text-fg overflow-hidden transition-colors duration-700">
      {/* Barra de progreso superior */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[80] origin-left transition-[width] duration-500"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--c-accent-2), var(--c-accent))',
        }}
      />

      {/* Círculo fijo con el número de diapositiva (arriba a la izquierda en todas) */}
      <div className="fixed top-4 left-5 z-[75]" aria-label={`Diapositiva ${current + 1} de ${SLIDES.length}`}>
        <AccentCircle size={40} label={current + 1} />
      </div>

      {/* Controles superiores: indicador de avance + menú de diapositivas + cambio de tema */}
      <div className="deck-controls fixed top-4 right-5 z-[75] flex items-center gap-2 sm:gap-2.5">
        {/* Indicador de avance de diapositivas */}
        <div className="bg-surface/90 backdrop-blur-md border border-line rounded-full px-2 py-1 flex items-center gap-1.5 sm:gap-2 soft-shadow">
          <button
            onClick={() => go(current - 1)}
            disabled={current === 0}
            aria-label="Anterior diapositiva"
            className="w-6 h-6 rounded-full flex items-center justify-center disabled:opacity-30 hover:text-accent transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-muted hover:text-accent" />
          </button>

          <span className="eyebrow-tag text-muted tabular-nums text-xs font-semibold px-1 select-none">
            {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>

          <button
            onClick={() => go(current + 1)}
            disabled={current === SLIDES.length - 1}
            aria-label="Siguiente diapositiva"
            className="w-6 h-6 rounded-full flex items-center justify-center disabled:opacity-30 hover:text-accent transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-3.5 h-3.5 text-muted hover:text-accent" />
          </button>
        </div>

        {/* Botón de índice */}
        <button
          onClick={() => setIndexOpen(true)}
          aria-label="Abrir índice de diapositivas"
          className="w-8 h-8 rounded-full border border-line bg-surface flex items-center justify-center transition-colors hover:border-accent/50 soft-shadow cursor-pointer"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-muted" />
        </button>

        {/* Botón de cambio de tema */}
        <ThemeToggle />
      </div>

      {/* Diapositiva activa */}
      <main className="relative z-10">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current}
            custom={dir}
            initial={{ opacity: 0, y: dir * 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: dir * -18 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Active />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navegación lateral sutil en desktop */}
      <nav
        className="fixed right-5 top-1/2 -translate-y-1/2 z-[75] hidden sm:flex flex-col gap-2.5"
        aria-label="Navegación"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            className="rounded-full transition-all duration-500 cursor-pointer"
            style={{
              width: i === current ? 10 : 7,
              height: i === current ? 10 : 7,
              backgroundColor: i === current ? 'var(--c-accent)' : 'var(--c-line)',
            }}
          />
        ))}
      </nav>

      <SlideIndex open={indexOpen} onClose={() => setIndexOpen(false)} current={current} onPick={go} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CaseTitleProvider>
        <Deck />
      </CaseTitleProvider>
    </ThemeProvider>
  );
}
