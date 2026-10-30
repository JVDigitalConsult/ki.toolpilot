import path from 'node:path';
import {installWhisperCpp, downloadWhisperModel} from '@remotion/install-whisper-cpp';
const to = path.join(process.cwd(), 'whisper.cpp');
await installWhisperCpp({to, version: '1.5.5'});
await downloadWhisperModel({model: process.argv[2] ?? 'base', folder: to});
console.log('Whisper installiert in', to);
