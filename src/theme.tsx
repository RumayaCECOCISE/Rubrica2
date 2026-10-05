import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Mode = 'light' | 'dark';

export interface Palette {
  app: string;
  app2: string;
  surface: string;
  surface2: string;
  fg: string;
  muted: string;
  line: string;
  accent: string;
  accent2: string;
  logo: string;
  neutralBar: string;
}

export const PALETTES: Record<Mode, Palette> = {
  light: {
    app: '#F4F2ED',
    app2: '#EAE7E0',
    surface: '#FFFFFF',
    surface2: '#F7F5F1',
    fg: '#1B1B20',
    muted: '#5C5C67',
    line: '#D9D5CC',
    accent: '#C0202D',
    accent2: '#8C1620',
    logo: '#3A3A42',
    neutralBar: '#3A3A42',
  },
  dark: {
    app: '#17171B',
    app2: '#101014',
    surface: '#232329',
    surface2: '#2A2A31',
    fg: '#FFFFFF',
    muted: '#B9B9C2',
    line: '#3A3A42',
    accent: '#D42E3C',
    accent2: '#8C1620',
    logo: '#FFFFFF',
    neutralBar: '#FFFFFF',
  },
};

interface Ctx {
  mode: Mode;
  palette: Palette;
  toggle: () => void;
}

const ThemeCtx = createContext<Ctx>({
  mode: 'light',
  palette: PALETTES.light,
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const toggle = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  return (
    <ThemeCtx.Provider value={{ mode, palette: PALETTES[mode], toggle }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
