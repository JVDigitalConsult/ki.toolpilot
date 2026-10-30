#!/usr/bin/env bash
# Komplettes Reel: Sprache (Jessica) + Render + Ablage im Repo-Ordner reels/
# Nutzung: bash scripts/make-reel.sh <reel-id> <YYYY-MM-DD>
# Erwartet reels/<reel-id>.json und die Umgebungsvariable ELEVENLABS_API_KEY.
set -euo pipefail
cd "$(dirname "$0")/.."
id="$1"; date="$2"
source .env.sh
NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt node --no-warnings scripts/reel-audio.mjs "reels/$id.json"
npx remotion render src/index.ts Reel "out/reel-$id.mp4" --props="public/reels/$id/props.json" --log=error --concurrency=4
mkdir -p ../reels
cp "out/reel-$id.mp4" "../reels/$date-$id.mp4"
echo "Fertig: reels/$date-$id.mp4"
echo "Metricool-URL nach dem Push: https://raw.githubusercontent.com/JVDigitalConsult/ki.toolpilot/main/reels/$date-$id.mp4"
