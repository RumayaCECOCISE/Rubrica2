import { createContext, useContext, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const NEW_CASE_TITLE =
  "Desigualdad digital y regresividad en la garantía del derecho de acceso efectivo a las TIC para niños, niñas y adolescentes de la Escuela Secundaria Técnica núm. 156 'Real del Bosque', Tuxtla Gutiérrez, Chiapas";

const CaseTitleContext = createContext({
  alternate: false,
  setAlternate: (_alternate: boolean) => {},
});

export function CaseTitleProvider({ children }: { children: ReactNode }) {
  const [alternate, setAlternate] = useState(false);
  return (
    <CaseTitleContext.Provider value={{ alternate, setAlternate }}>
      {children}
    </CaseTitleContext.Provider>
  );
}

/** Título nuevo con el fragmento clave en rojo, igual que el título anterior. */
export function NewCaseTitle() {
  return (
    <>
      Desigualdad digital y regresividad en la{' '}
      <span className="text-accent">garantía del derecho de acceso efectivo a las TIC</span>{' '}
      para niños, niñas y adolescentes de la Escuela Secundaria Técnica núm. 156 'Real del Bosque',
      Tuxtla Gutiérrez, Chiapas
    </>
  );
}

export function TitleVersionControls() {
  const { alternate, setAlternate } = useContext(CaseTitleContext);
  return (
    <div className="flex flex-wrap gap-2.5 mt-4" role="group" aria-label="Elegir versión del título">
      <button
        type="button"
        aria-pressed={alternate}
        onClick={() => setAlternate(true)}
        className={`body-sm font-semibold rounded-full px-5 py-2.5 transition-colors duration-200 border-0 ${
          alternate
            ? 'bg-accent text-onaccent shadow-sm'
            : 'bg-surface text-fg hover:bg-surface-2'
        }`}
      >
        Título nuevo
      </button>
      <button
        type="button"
        aria-pressed={!alternate}
        onClick={() => setAlternate(false)}
        className={`body-sm font-semibold rounded-full px-5 py-2.5 transition-colors duration-200 border-0 ${
          !alternate
            ? 'bg-accent text-onaccent shadow-sm'
            : 'bg-surface text-fg hover:bg-surface-2'
        }`}
      >
        Título actual
      </button>
    </div>
  );
}

export function DissolveTitle({
  original,
  alternate,
}: {
  original: ReactNode;
  alternate: ReactNode;
}) {
  const { alternate: showAlternate } = useContext(CaseTitleContext);
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={showAlternate ? 'new' : 'original'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {showAlternate ? alternate : original}
      </motion.div>
    </AnimatePresence>
  );
}
