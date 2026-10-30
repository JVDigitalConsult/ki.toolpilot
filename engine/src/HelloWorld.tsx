import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const HelloWorld: React.FC<{title: string}> = ({title}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scale = spring({frame, fps});
  const opacity = interpolate(frame, [0, 20], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(#1e1b4b, #7c3aed)', justifyContent: 'center', alignItems: 'center'}}>
      <h1 style={{color: 'white', fontSize: 90, fontFamily: 'sans-serif', textAlign: 'center', transform: `scale(${scale})`, opacity}}>
        {title}
      </h1>
    </AbsoluteFill>
  );
};
