// Text in Sprache umwandeln über ElevenLabs – immer mit der festen Stimme aus engine.config.json
// Nutzung: node scripts/tts.mjs "<Text>" [name]   -> public/<name>.mp3
//          node scripts/tts.mjs voices            -> verfügbare Stimmen auflisten
import fs from 'node:fs';
import path from 'node:path';

const config = JSON.parse(fs.readFileSync('engine.config.json', 'utf8'));
const key = process.env.ELEVENLABS_API_KEY;
if (!key) {
  console.error('ELEVENLABS_API_KEY fehlt (in den Umgebungseinstellungen hinterlegen).');
  process.exit(1);
}
const api = (p, init = {}) =>
  fetch('https://api.elevenlabs.io/v1' + p, {...init, headers: {'xi-api-key': key, 'Content-Type': 'application/json', ...init.headers}});

const [text, name = 'stimme'] = process.argv.slice(2);

if (text === 'voices') {
  const res = await api('/voices');
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const {voices} = await res.json();
  for (const v of voices) console.log(`${v.voice_id}  ${v.name}  (${v.category})`);
} else {
  // VOICE_ID nur für Hörproben – sonst immer die Markenstimme
  const voiceId = process.env.VOICE_ID ?? config.voice.id;
  const res = await api(`/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: 'POST',
    body: JSON.stringify({text, model_id: config.ttsModel, language_code: config.language}),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const out = path.join('public', name + '.mp3');
  fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  console.log(`Gespeichert: ${out} (Stimme: ${process.env.VOICE_ID ? voiceId : config.voice.name})`);
}
