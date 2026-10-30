import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
import {Reel, ReelProps, reelDuration} from './Reel';

// Platzhalter für die Studio-Vorschau; echte Props kommen per --props aus scripts/reel-audio.mjs
const demo: ReelProps = {
  brand: 'KI ToolPilot',
  partner: false,
  scene: null,
  scenes: [
    {
      poses: ['laptop'],
      title: 'Vorschau',
      text: 'Vorschau',
      audio: '',
      startMs: 0,
      durationMs: 3000,
      words: [{text: 'Vorschau', startMs: 0, endMs: 1000}],
      bullets: [{text: 'Stichpunkt', atMs: 500}],
    },
  ],
};

export const Root: React.FC = () => (
  <>
    <Composition id="HelloWorld" component={HelloWorld} durationInFrames={90} fps={30} width={1080} height={1920} defaultProps={{title: 'Video-Engine läuft!'}} />
    {/* Erklär-Reel mit animiertem KI-ToolPilot-Avatar */}
    <Composition
      id="Reel"
      component={Reel}
      durationInFrames={30}
      calculateMetadata={({props}) => ({durationInFrames: reelDuration(props, 30)})}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={demo}
    />
  </>
);
