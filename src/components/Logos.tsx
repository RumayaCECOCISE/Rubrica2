import { useState, type CSSProperties } from 'react';

export type LogoName = 'unach' | 'cecocise' | 'mddh';

const LOGOS: Record<LogoName, { src: string; alt: string; label: string; ratio: number }> = {
  unach: {
    src: '/logos/unach.png',
    alt: 'Universidad Autónoma de Chiapas',
    label: 'Logo UNACH',
    ratio: 300 / 292,
  },
  cecocise: {
    src: '/logos/cecocise.png',
    alt: 'Centro de Estudios para la Construcción de la Ciudadanía y la Seguridad',
    label: 'Logo CECOCISE',
    ratio: 300 / 268,
  },
  mddh: {
    src: '/logos/mddh.png',
    alt: 'Maestría en Defensa de los Derechos Humanos',
    label: 'Logo MDDH',
    ratio: 340 / 300,
  },
};

interface LogoProps {
  name: LogoName;
  className?: string;
  style?: CSSProperties;
  decorative?: boolean;
}

/**
 * Renderiza el PNG institucional con fondo transparente desde /public/logos.
 * Si el archivo aún no existe, conserva su espacio con un placeholder visible
 * del mismo tamaño. El logo es estático: solo recibe filtros CSS por tema.
 */
export function InstitutionalLogo({ name, className = '', style, decorative = false }: LogoProps) {
  const logo = LOGOS[name];
  const [failed, setFailed] = useState(false);

  if (failed) {
    if (decorative) return null;
    const height = typeof style?.height === 'number' ? style.height : 80;
    return (
      <div
        role="img"
        aria-label={`Espacio reservado para el logo: ${logo.alt}`}
        className={`logo-placeholder ${className}`}
        style={{ height, width: Math.round(height * logo.ratio) }}
      >
        <span className="eyebrow-tag">{logo.label}</span>
      </div>
    );
  }

  return (
    <img
      src={logo.src}
      alt={decorative ? '' : logo.alt}
      aria-hidden={decorative || undefined}
      className={`institutional-logo object-contain ${className}`}
      style={style}
      loading="eager"
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}

export function LogoUNACH(props: Omit<LogoProps, 'name'>) {
  return <InstitutionalLogo name="unach" {...props} />;
}

export function LogoCECOCISE(props: Omit<LogoProps, 'name'>) {
  return <InstitutionalLogo name="cecocise" {...props} />;
}

export function LogoMDDH(props: Omit<LogoProps, 'name'>) {
  return <InstitutionalLogo name="mddh" {...props} />;
}
