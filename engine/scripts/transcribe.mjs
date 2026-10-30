// Nutzung: node scripts/transcribe.mjs <video-oder-audio> [modell] [sprache]  (Standard: medium, de)
import path from 'node:path';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {transcribe, toCaptions} from '@remotion/install-whisper-cpp';

const input = process.argv[2];
const model = process.argv[3] ?? 'medium';
const language = process.argv[4] ?? 'de';
const whisperPath = path.join(process.cwd(), 'whisper.cpp');
const wav = path.resolve('out', path.parse(input).name + '.16k.wav');

// whisper.cpp braucht 16 kHz Mono-WAV
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', input, '-ar', '16000', '-ac', '1', wav]);

const result = await transcribe({inputPath: wav, whisperPath, whisperCppVersion: '1.5.5', model, language, tokenLevelTimestamps: true});
const {captions} = toCaptions({whisperCppOutput: result});
const outFile = path.join('out', path.parse(input).name + '.captions.json');
fs.writeFileSync(outFile, JSON.stringify(captions, null, 2));
const txtFile = path.join('out', path.parse(input).name + '.transcript.txt');
fs.writeFileSync(txtFile, captions.map((c) => c.text).join('').trim() + '\n');
console.log(`${captions.length} Captions (${language}) -> ${outFile}, Text -> ${txtFile}`);
