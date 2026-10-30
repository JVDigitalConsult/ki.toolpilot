import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

// Farben aus dem KI-ToolPilot-CI (wie im Planungs-Artefakt)
const C = {bg: '#0B1229', bg2: '#121B3A', accent: '#0A68FF', cyan: '#00D1FF', muted: '#94A3B8', fg: '#FFFFFF', card: 'rgba(18,27,58,0.88)'};
const FONT = 'Montserrat, sans-serif';

type Word = {text: string; startMs: number; endMs: number};
type Bullet = {text: string; atMs: number};
export type Scene = {poses: string[]; title: string; text: string; audio: string; startMs: number; durationMs: number; words: Word[]; bullets: Bullet[]};
export type ReelProps = {brand: string; partner: boolean; scene?: string | null; scenes: Scene[]};

export const reelDuration = (p: ReelProps, fps: number) => {
  const last = p.scenes[p.scenes.length - 1];
  return Math.ceil(((last.startMs + last.durationMs) / 1000 + 0.8) * fps);
};

const useMs = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (frame / fps) * 1000;
};

// Untertitel in kurze Häppchen (max. 4 Wörter, Umbruch nach Satzzeichen)
const chunk = (words: Word[]) => {
  const out: Word[][] = [];
  let cur: Word[] = [];
  for (const w of words) {
    cur.push(w);
    if (cur.length >= 4 || /[.,!?:;]$/.test(w.text)) {
      out.push(cur);
      cur = [];
    }
  }
  if (cur.length) out.push(cur);
  return out;
};

// Hintergrund: CI-Verlauf oder optionale Szene (Bild aus public/scenes, abgedunkelt für Lesbarkeit)
const Background: React.FC<{scene?: string | null}> = ({scene}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 60;
  if (scene) {
    const zoom = 1.05 + frame * 0.00008;
    return (
      <AbsoluteFill style={{background: C.bg}}>
        <Img src={staticFile(`scenes/${scene}`)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})`}} />
        <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.bg}F2 0%, ${C.bg}CC 45%, ${C.bg}66 75%, ${C.bg}99 100%)`}} />
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{background: `linear-gradient(170deg, ${C.bg} 0%, ${C.bg2} 55%, #0A2A6B 100%)`}}>
      <div style={{position: 'absolute', width: 900, height: 900, borderRadius: '50%', left: 350 + drift, top: 900, background: `radial-gradient(circle, ${C.accent}55 0%, transparent 65%)`}} />
      <div style={{position: 'absolute', width: 600, height: 600, borderRadius: '50%', left: -200 - drift, top: 150, background: `radial-gradient(circle, ${C.cyan}22 0%, transparent 65%)`}} />
    </AbsoluteFill>
  );
};

const Header: React.FC<{brand: string; partner: boolean}> = ({brand, partner}) => (
  <div style={{position: 'absolute', top: 110, left: 70, right: 70, fontFamily: FONT}}>
    <div style={{color: C.fg, fontWeight: 800, fontSize: 44}}>{brand}</div>
    {partner && <div style={{color: C.muted, fontSize: 28, fontWeight: 500, marginTop: 8}}>Werbung | Partner-Links</div>}
  </div>
);

const Title: React.FC<{title: string; index: number; total: number}> = ({title, index, total}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const inn = spring({frame, fps, config: {damping: 14}});
  return (
    <div style={{position: 'absolute', top: 290, left: 70, right: 70, fontFamily: FONT}}>
      <div style={{display: 'flex', gap: 10, marginBottom: 28}}>
        {Array.from({length: total}).map((_, i) => (
          <div key={i} style={{height: 12, borderRadius: 6, width: i === index ? 120 : 40, background: i <= index ? C.cyan : '#26335C'}} />
        ))}
      </div>
      <div
        style={{
          color: C.fg,
          fontWeight: 800,
          fontSize: title.length > 20 ? 80 : 96,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          transform: `translateX(${interpolate(inn, [0, 1], [-60, 0])}px)`,
          opacity: inn,
        }}
      >
        {title}
      </div>
    </div>
  );
};

// Stichpunkte: erscheinen, sobald ihr Stichwort gesprochen wird
const Bullets: React.FC<{bullets: Bullet[]}> = ({bullets}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const ms = useMs();
  return (
    <div style={{position: 'absolute', top: 560, left: 70, width: 600, display: 'flex', flexDirection: 'column', gap: 22, fontFamily: FONT}}>
      {bullets.map((b, i) => {
        const startF = Math.round((b.atMs / 1000) * fps) - 3;
        const p = spring({frame: frame - startF, fps, config: {damping: 15}});
        const active = ms >= b.atMs && (bullets[i + 1] ? ms < bullets[i + 1].atMs : true);
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              padding: '20px 26px',
              borderRadius: 22,
              background: C.card,
              border: `3px solid ${active ? C.cyan : 'transparent'}`,
              opacity: p,
              transform: `translateX(${interpolate(p, [0, 1], [-80, 0])}px)`,
            }}
          >
            <div style={{flex: '0 0 52px', height: 52, borderRadius: 26, background: active ? C.cyan : C.accent, color: C.bg, fontWeight: 800, fontSize: 30, display: 'grid', placeItems: 'center'}}>
              {i + 1}
            </div>
            <div style={{color: C.fg, fontWeight: 700, fontSize: 46, lineHeight: 1.15}}>{b.text}</div>
          </div>
        );
      })}
    </div>
  );
};

// Avatar: steht ruhig (nur Atmen) und wechselt bei jedem Stichpunkt die Geste – so bewegen sich die Arme
const Avatar: React.FC<{poses: string[]; bullets: Bullet[]; first: boolean}> = ({poses, bullets, first}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const ms = useMs();
  const enter = spring({frame, fps, config: {damping: 13}});
  const enterX = first ? interpolate(enter, [0, 1], [700, 0]) : 0;
  const breathe = Math.sin(frame / 22) * 0.006;

  // Gestenwechsel ab dem zweiten Stichpunkt
  const switches = bullets.slice(1).map((b) => b.atMs - 120);
  const idx = switches.filter((t) => ms >= t).length;
  const lastSwitch = idx > 0 ? switches[idx - 1] : first ? -1e9 : 0;
  const t = ms - lastSwitch;
  const fade = interpolate(t, [0, 160], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const settle = interpolate(t, [0, 220], [0.97, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const cur = poses[idx % poses.length];
  const prev = idx > 0 ? poses[(idx - 1) % poses.length] : null;

  const box: React.CSSProperties = {position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain'};
  return (
    <div
      style={{
        position: 'absolute',
        right: -90,
        bottom: -70,
        width: 700,
        height: 1050,
        transformOrigin: '50% 100%',
        transform: `translateX(${enterX}px) scale(${settle}) scaleY(${1 + breathe})`,
        filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.45))',
      }}
    >
      {prev && fade < 1 && <Img src={staticFile(`avatar/${prev}.png`)} style={{...box, opacity: 1 - fade}} />}
      <Img src={staticFile(`avatar/${cur}.png`)} style={{...box, opacity: prev ? fade : 1}} />
    </div>
  );
};

const Captions: React.FC<{words: Word[]}> = ({words}) => {
  const ms = useMs();
  const groups = chunk(words);
  const g = groups.find((grp, i) => ms < (groups[i + 1]?.[0].startMs ?? Infinity) && ms >= grp[0].startMs - 150);
  if (!g) return null;
  return (
    <div style={{position: 'absolute', left: 70, width: 620, top: 1330}}>
      <div style={{display: 'inline-block', fontFamily: FONT, fontWeight: 800, fontSize: 52, lineHeight: 1.15, padding: '16px 24px', borderRadius: 20, background: 'rgba(11,18,41,0.85)'}}>
        {g.map((w, i) => (
          <span key={i} style={{color: ms >= w.startMs && ms < w.endMs ? C.cyan : C.fg}}>
            {w.text}{' '}
          </span>
        ))}
      </div>
    </div>
  );
};

export const Reel: React.FC<ReelProps> = ({brand, partner, scene, scenes}) => {
  const {fps} = useVideoConfig();
  const f = (ms: number) => Math.round((ms / 1000) * fps);
  return (
    <AbsoluteFill>
      <Background scene={scene} />
      <Header brand={brand} partner={partner} />
      {scenes.map((s, i) => (
        <Sequence key={i} from={f(s.startMs)} durationInFrames={i === scenes.length - 1 ? Infinity : f(s.durationMs)} layout="none">
          {s.audio && <Audio src={staticFile(s.audio)} />}
          <Title title={s.title} index={i} total={scenes.length} />
          <Avatar poses={s.poses} bullets={s.bullets} first={i === 0} />
          <Bullets bullets={s.bullets} />
          <Captions words={s.words} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
