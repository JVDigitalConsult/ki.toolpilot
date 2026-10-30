#!/usr/bin/env bash
# Selbsttest der Video-Engine
cd "$(dirname "$0")/.."
ok(){ echo "✅ $1"; }; fail(){ echo "❌ $1"; }
node -v >/dev/null 2>&1 && ok "Node $(node -v)" || fail "Node fehlt"
ffmpeg -version >/dev/null 2>&1 && ok "ffmpeg $(ffmpeg -version | head -1 | cut -d' ' -f3)" || fail "ffmpeg fehlt"
npx remotion render src/index.ts HelloWorld out/hello.mp4 --log=error >/dev/null 2>&1 && ok "Remotion rendert out/hello.mp4" || fail "Remotion-Render fehlgeschlagen"
[ -x whisper.cpp/main ] && ok "whisper.cpp gebaut" || fail "whisper.cpp fehlt (npm run whisper:install)"
[ -s whisper.cpp/ggml-base.bin ] && ok "Whisper-Modell base vorhanden" || fail "Whisper-Modell fehlt (huggingface.co erreichbar? -> npm run whisper:install)"
