import {Config} from '@remotion/cli/config';

// Remotion kann seinen eigenen Chrome hier nicht laden (kein Proxy-Support) -> vorinstallierten nutzen
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
}
Config.setChromiumOpenGlRenderer('swangle');
