# KI ToolPilot Video-Engine

Erzeugt Erklär-Reels (1080×1920) für den Instagram-Kanal KI ToolPilot:
Jessicas Stimme (ElevenLabs) → Stichpunkte und Untertitel wortgenau → animierter Avatar (Remotion).

## Einrichtung in einer frischen Cloud-Session

```bash
cd engine && npm ci
```

Benötigt die Umgebungsvariable `ELEVENLABS_API_KEY` und Netzwerkzugriff auf
`api.elevenlabs.io`. Remotion nutzt das vorinstallierte Chromium (`.env.sh`).

## Ein Reel erstellen

1. Skript anlegen: `engine/reels/<reel-id>.json` (Vorbild: die vorhandenen Dateien).
2. Bauen: `bash scripts/make-reel.sh <reel-id> <YYYY-MM-DD>` – erzeugt Sprache, rendert und legt
   das Video als `reels/<YYYY-MM-DD>-<reel-id>.mp4` im Repo ab.
3. Committen und pushen. Die öffentliche Video-URL für Metricool lautet
   `https://raw.githubusercontent.com/JVDigitalConsult/ki.toolpilot/main/reels/<datei>.mp4`.

## Aufbau eines Reel-Skripts

```json
{
  "id": "claude-was-ist",
  "topic": "claude | metricool | funnelcockpit | kombi",
  "partner": false,
  "scene": null,
  "scenes": [
    {
      "poses": ["laptop", "zeigen2"],
      "title": "Dein KI-Assistent",
      "text": "Gesprochener Text dieser Szene (1–3 kurze Sätze).",
      "bullets": [{"text": "Stichpunkt auf dem Bildschirm", "at": "Stichwort"}]
    }
  ]
}
```

- **4–5 Szenen**, Gesamtlänge 20–35 Sekunden. Szene 1 = Hook, letzte Szene = CTA „Link in meiner Bio“.
- **title** max. ca. 28 Zeichen, **bullets** 1–4 pro Szene, je max. ca. 30 Zeichen.
- **at** ist ein Wort aus `text`; der Stichpunkt erscheint, sobald Jessica es sagt.
  Bei jedem weiteren Stichpunkt wechselt der Avatar seine Geste (nächste Pose aus `poses`).
- **poses**: nur Posen **eines** Outfits pro Reel (siehe `avatars.json`), passend zum Inhalt.
- **partner**: `true` bei Metricool/FunnelCockpit → Einblendung „Werbung | Partner-Links“.
- **scene** (optional): Name eines Hintergrundbilds aus `public/scenes/` ohne Endung, sonst CI-Verlauf.

## Avatar und Szenen erweitern

- Neue Posen oder Outfits: freigestelltes PNG 1024×1536 (transparenter Hintergrund) nach
  `public/avatar/<name>.png` und in `avatars.json` eintragen. Gleiches Gesicht und gleiche Person beibehalten.
- Neue Szenen: Bild 1080×1920 ohne Text nach `public/scenes/<name>.jpg`.
- HD-Bilder aus Canva: Assets auf Seiten einer Hilfsdatei setzen und als PNG
  (`transparent_background: true`) exportieren; die Thumbnail-URLs von `get-assets` sind nur 133×200 px.

## Stimme

Stimme, Tempo und Modell stehen in `engine.config.json` (Jessica, Tempo 1,15, `eleven_multilingual_v2`).
