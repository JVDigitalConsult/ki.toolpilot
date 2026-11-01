import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import type {ReelProps} from './Reel';

// Startbild (Cover) eines Reels. Wichtiges liegt im mittleren 3:4-Ausschnitt (y 240–1680), den das Profil-Raster zeigt.
const C = {bg: '#0B1229', bg2: '#121B3A', accent: '#0A68FF', cyan: '#00D1FF', muted: '#94A3B8', fg: '#FFFFFF'};
const FONT = 'Montserrat, sans-serif';

export type CoverInfo = {title: string; highlight?: string; subtitle?: string; tag?: string; pose?: string};

// Titel mit hervorgehobenem Teil in Cyan
const Headline: React.FC<{title: string; highlight?: string}> = ({title: raw, highlight: rawHl}) => {
  // geschützter Bindestrich, damit z. B. "Prompt-Fehler" nicht am Bindestrich umbricht
  const title = raw.replace(/-/g, '\u2011');
  const highlight = rawHl?.replace(/-/g, '\u2011');
  const i = highlight ? title.indexOf(highlight) : -1;
  if (i < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, i)}
      <span style={{color: C.cyan}}>{highlight}</span>
      {title.slice(i + highlight!.length)}
    </>
  );
};

export const Cover: React.FC<ReelProps & {cover?: CoverInfo}> = ({brand, partner, scene, scenes, cover}) => {
  const info: CoverInfo = cover ?? {title: scenes[0].title};
  const pose = info.pose ?? scenes[0].poses[0];
  const len = info.title.length;
  const size = len > 30 ? 104 : len > 20 ? 120 : 136;
  return (
    <AbsoluteFill style={{background: `linear-gradient(170deg, ${C.bg} 0%, ${C.bg2} 55%, #0A2A6B 100%)`, fontFamily: FONT}}>
      {scene && (
        <AbsoluteFill>
          <Img src={staticFile(`scenes/${scene}`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.bg}F2 0%, ${C.bg}CC 50%, ${C.bg}80 100%)`}} />
        </AbsoluteFill>
      )}
      <div style={{position: 'absolute', width: 1000, height: 1000, borderRadius: '50%', left: 380, top: 900, background: `radial-gradient(circle, ${C.accent}66 0%, transparent 65%)`}} />
      <div style={{position: 'absolute', top: 290, left: 70, right: 70}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span style={{color: C.fg, fontWeight: 800, fontSize: 44}}>{brand}</span>
          {info.tag && (
            <span style={{color: C.bg, background: C.cyan, fontWeight: 800, fontSize: 30, letterSpacing: '0.08em', padding: '10px 22px', borderRadius: 999}}>
              {info.tag}
            </span>
          )}
        </div>
        <div style={{height: 12, width: 160, borderRadius: 6, background: C.cyan, marginTop: 70}} />
        <div style={{color: C.fg, fontWeight: 800, fontSize: size, lineHeight: 1.02, letterSpacing: '-0.025em', marginTop: 40, width: 940}}>
          <Headline title={info.title} highlight={info.highlight} />
        </div>
        {info.subtitle && (
          <div style={{display: 'inline-block', marginTop: 44, color: C.fg, background: 'rgba(18,27,58,0.9)', border: `3px solid ${C.accent}`, fontWeight: 700, fontSize: 46, padding: '18px 28px', borderRadius: 22, maxWidth: 560}}>
            {info.subtitle}
          </div>
        )}
      </div>
      <div style={{position: 'absolute', right: -110, bottom: -120, width: 760, height: 1140, filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.5))'}}>
        <Img src={staticFile(`avatar/${pose}.png`)} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
      </div>
      {partner && <div style={{position: 'absolute', left: 70, bottom: 260, color: C.muted, fontSize: 28, fontWeight: 500}}>Werbung | Partner-Links</div>}
    </AbsoluteFill>
  );
};
