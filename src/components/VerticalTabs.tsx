import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface TabItem {
  title: string;
  detail: string;
}

export interface TabGroup {
  id: string;
  label: string;
  items: TabItem[];
}

/**
 * Pestañas verticales en columna 1 con panel de altura fija y estable en escritorio
 * para evitar saltos o desplazamientos verticales al alternar entre pestañas.
 */
export function VerticalTabs({
  groups,
  label,
  desktopHeight = 'md:h-[34rem] lg:h-[36rem]',
}: {
  groups: TabGroup[];
  label: string;
  desktopHeight?: string;
}) {
  const [active, setActive] = useState(0);
  const baseId = useId().replace(/:/g, '');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const next = (index + groups.length) % groups.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: groups.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key]);
  };

  const group = groups[active];

  return (
    <div className="vtabs grid grid-cols-1 md:grid-cols-[minmax(12rem,16rem)_1fr] gap-3 md:gap-5 items-start w-full">
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-visible pb-1 md:pb-0 shrink-0"
      >
        {groups.map((g, i) => {
          const selected = i === active;
          return (
            <button
              key={g.id}
              ref={(node) => {
                tabs.current[i] = node;
              }}
              role="tab"
              id={`${baseId}-tab-${g.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) => onKeyDown(event, i)}
              className={`shrink-0 flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-150 ${
                selected
                  ? 'bg-accent border-accent text-onaccent shadow-sm'
                  : 'bg-surface border-line text-fg hover:border-accent/50'
              }`}
            >
              <span className="body-md font-semibold leading-snug">{g.label}</span>
              <span
                className={`eyebrow-tag ${
                  selected ? 'text-onaccent opacity-90' : 'text-muted'
                }`}
              >
                {g.items.length}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${group.id}`}
        tabIndex={0}
        className={`bg-surface border border-line rounded-2xl soft-shadow p-5 min-w-0 ${desktopHeight} overflow-hidden`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={group.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={`grid gap-x-6 gap-y-3 ${
              group.items.length > 2 ? 'md:grid-cols-2' : 'grid-cols-1'
            }`}
          >
            {group.items.map((item) => (
              <li key={item.title} className="flex gap-3 min-w-0 items-start">
                <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" aria-hidden />
                <div className="min-w-0">
                  <p className="body-md font-semibold text-fg leading-snug">{item.title}</p>
                  <p className="body-sm text-muted leading-relaxed mt-1">{item.detail}</p>
                </div>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
