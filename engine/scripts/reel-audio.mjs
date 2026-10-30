// Erzeugt pro Szene Jessicas Sprache mit Wort-Zeitstempeln (ElevenLabs) und baut die Props für die Reel-Vorlage
// Nutzung: node scripts/reel-audio.mjs reels/<id>.json
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const config = JSON.parse(fs.readFileSync('engine.config.json', 'utf8'));
const reel = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const key = process.env.ELEVENLABS_API_KEY;
if (!key) throw new Error('ELEVENLABS_API_KEY fehlt.');

const GAP_MS = 350; // Pause zwischen den Szenen
const dir = path.join('public', 'reels', reel.id);
fs.mkdirSync(dir, {recursive: true});

// Zeichen-Zeitstempel zu Wörtern zusammenfassen
const toWords = ({characters, character_start_times_seconds: s, character_end_times_seconds: e}) => {
  const words = [];
  let cur = null;
  characters.forEach((ch, i) => {
    if (/\s/.test(ch)) {
      cur = null;
      return;
    }
    if (!cur) words.push((cur = {text: '', startMs: Math.round(s[i] * 1000), endMs: 0}));
    cur.text += ch;
    cur.endMs = Math.round(e[i] * 1000);
  });
  return words;
};

let offset = 0;
const scenes = [];
for (const [i, sc] of reel.scenes.entries()) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${config.voice.id}/with-timestamps?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: {'xi-api-key': key, 'Content-Type': 'application/json'},
    body: JSON.stringify({text: sc.text, model_id: config.ttsModel, language_code: config.language, voice_settings: {speed: config.voiceSpeed ?? 1}}),
  });
  if (!res.ok) throw new Error(`Szene ${i + 1}: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const file = path.join(dir, `szene-${i + 1}.mp3`);
  fs.writeFileSync(file, Buffer.from(data.audio_base64, 'base64'));
  const durMs = Math.round(Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file])) * 1000);
  const words = toWords(data.alignment);
  // Stichpunkt erscheint, sobald sein Stichwort gesprochen wird
  const norm = (t) => t.toLowerCase().replace(/[^a-zäöüß0-9-]/g, '');
  const bullets = (sc.bullets ?? []).map((b) => {
    const w = words.find((x) => norm(x.text) === norm(b.at)) ?? words.find((x) => norm(x.text).startsWith(norm(b.at)));
    if (!w) throw new Error(`Szene ${i + 1}: Stichwort "${b.at}" nicht im Text`);
    return {text: b.text, atMs: w.startMs};
  });
  scenes.push({...sc, audio: `reels/${reel.id}/szene-${i + 1}.mp3`, startMs: offset, durationMs: durMs + GAP_MS, words, bullets});
  offset += durMs + GAP_MS;
  console.log(`Szene ${i + 1}: ${(durMs / 1000).toFixed(1)} s`);
}
// Szene: Dateiname in public/scenes (mit Endung) oder null für den CI-Verlauf
const sceneFile = reel.scene ? fs.readdirSync('public/scenes').find((f) => path.parse(f).name === reel.scene) : null;
if (reel.scene && !sceneFile) throw new Error(`Szene "${reel.scene}" nicht in public/scenes gefunden`);
const props = {brand: config.brand, partner: reel.partner, scene: sceneFile ?? null, scenes};
fs.writeFileSync(path.join(dir, 'props.json'), JSON.stringify(props, null, 2));
console.log(`Gesamt ${(offset / 1000).toFixed(1)} s -> ${dir}/props.json`);
