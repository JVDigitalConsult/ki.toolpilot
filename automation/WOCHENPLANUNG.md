# Wochenplanung KI ToolPilot

Läuft jeden Sonntag nach der Auswertung (`analysen/ANLEITUNG.md`). Niemand ist live dabei: selbstständig arbeiten,
keine Rückfragen, bei Unklarheiten die vernünftigste Entscheidung treffen.

## Aufgabe

In jeder der nächsten zwei Kalenderwochen (ab dem kommenden Montag) sollen 3 bis 4 Beiträge von Montag bis Freitag
LIVE in Metricool eingeplant sein: autoPublish true, draft false, Instagram, Brand-ID `7689690`, Zeitzone
Europe/Berlin, isAiGenerated false. Bereits eingeplante Posts bleiben unverändert und zählen mit. Nur Lücken füllen,
nie in der Vergangenheit.

Der Kanal veröffentlicht NUR Erklär-Reels aus der Video-Engine (Jessicas Stimme, Stichpunkte, Untertitel, Avatar mit
Gesten) mit eigenem Startbild. Karussell nur als Notlösung, wenn die Engine technisch scheitert.
Kein Hinweis "AI generated" im Bild oder in der Caption.

## Schritt 0 – Einrichten

- `cd /home/user/ki.toolpilot/engine && npm ci`; `engine/README.md` vollständig lesen und befolgen.
- Umgebungsvariable `ELEVENLABS_API_KEY` prüfen. Fehlt sie oder liefert ElevenLabs 401/402: nichts bauen, nichts
  planen, genau das melden.

## Schritt 1 – Auswertung lesen (Pflicht vor jeder Planung)

- `analysen/latest.json` und den zugehörigen Bericht `analysen/<datum>.md` lesen.
- Fehlt die Datei oder ist sie älter als 3 Tage: zuerst die komplette Auswertung nach `analysen/ANLEITUNG.md`
  durchführen, Bericht schreiben und pushen, dann weiter.
- Verbindlich übernehmen: `regelnFuerPlanung`, `vermeiden`, Lehren aus `eigeneBeitraege`.
  Themen bevorzugt aus `themenvorschlaege` wählen; anstehende Termine aus `anstehend` nutzen, wenn sie passen.
- `getScheduledPosts` für die kommenden 4 Wochen. Bereits verwendete Themen und Headlines nicht wiederholen
  (auch `engine/reels/` ansehen). Zähle pro Woche die Posts Montag bis Freitag. Hat jede Woche schon 3 oder mehr,
  nichts neu planen und das melden.

## Schritt 2 – Faktencheck

- Faktenliste der Autopilot-Seite lesen (Artifact-Tool, action read):
  https://claude.ai/artifact/VVKfK37YhWAYc4P5RaYxS9
- Jede Aussage der neuen Reels gegen offizielle Quellen (anthropic.com, support.claude.com, metricool.com,
  funnelcockpit.com) oder mindestens zwei unabhängige seriöse Quellen prüfen. Nicht Bestätigtes weglassen oder als
  "je nach Tarif, bitte im eigenen Konto prüfen" formulieren. Keine Preise, keine Einkommensversprechen,
  keine Garantien.

## Viralitäts-Modell (verbindlich)

Quelle: NP Digital, Sept. 2025 (Umfrage unter 614 Marketern, 22.381 Instagram-Posts). Gewichte:
Engagement 10 · Novelty 9,3 · Trend Fit 9,2 · Relatability 8,3 · Emotional Punch 8,2 · Shareability 8,1 ·
Hook Strength 6,5 · Visual Impact 4,1. Score = Summe (Faktor 1–10 × Gewicht) / 63,7.

- **Engagement:** letzte Szene mit konkreter, leicht beantwortbarer Frage an die Zuschauer plus Link-in-Bio-Hinweis;
  Caption endet mit derselben Frage. Keine Kommentar-Stichwort-Aktionen, die DM-Automation voraussetzen.
- **Novelty:** höchstens ein reines "Was ist …?"-Reel pro Woche; sonst wenig bekannte Funktionen, Mythos vs. Realität,
  typische Fehler, bestätigte Neuigkeiten mit Monat. Keine erfundenen Zahlen.
- **Trend Fit:** pro Reel ein bewährtes Format ("3 Dinge, die ich gern früher gewusst hätte", "Hör auf mit X, mach Y",
  "POV:", "Vorher/Nachher") und, wenn belegt, Bezug zu aktuellen Anlässen.
- **Relatability:** Szene 1 oder 2 zeigt eine konkrete Alltagssituation der Zielgruppe (Selbstständige, Coaches,
  Fotografinnen, Dienstleister im DACH-Raum).
- **Emotional Punch:** Problem → Aha → Erleichterung.
- **Shareability:** ein Element zum Speichern oder Weiterschicken; in der Caption ein Aufruf dazu.
- **Hook Strength:** Szene 1 höchstens ca. 2 Sekunden; Titel höchstens 5 Wörter, nicht im Muster "Was ist X?".
  Ziel: mindestens 50 % der Zuschauer bleiben länger als 3 Sekunden.
- **Visual Impact:** starkes Cover, Abwechslung bei Outfits und Szenen, passende Posenwechsel.

Jedes Skript vor dem Bauen bewerten: mindestens 6,0 gesamt sowie mindestens 6 bei Engagement und Hook Strength,
sonst überarbeiten (höchstens 2 Runden) oder das nächststärkere Thema nehmen. Ehrlich bewerten.

## Schritt 3 – Themen und Skripte

- Themenmix Claude Basics, Metricool, FunnelCockpit, höchstens ein Kombinations-Reel pro Woche.
  Metricool-/FunnelCockpit-Reels erklären genau ein Tool bzw. eine Funktion und nennen den Tarif.
- Lead-Content-Manager scoutet 3 Themen (bevorzugt aus der Auswertung) und wählt das stärkste; Hook-Agent schärft
  Szene 1 und das Cover; Challenger prüft hart (Fakten, Jargon, Dopplungen, Längen, Score).
- Skript `engine/reels/<reel-id>.json` nach `engine/README.md`: 4–5 Szenen, 20–35 Sekunden, Du-Form, einfache Wörter,
  letzte Szene mit Frage und "Link in meiner Bio", `partner: true` bei Metricool/FunnelCockpit, Posen nur eines
  Outfits, Stichwort (`at`) wörtlich im gesprochenen Text, `cover`-Block (Titel 2–6 Wörter mit dem Kernthema,
  kein Einzelwort über ca. 12 Zeichen).

## Schritt 4 – Avatar und Szene

Bei jedem Lauf prüfen, ob der Avatar eine neue Szene oder ein neues Outfit braucht (nicht mehr als 3 Reels
hintereinander mit gleichem Outfit und gleicher Szene). Vorgehen, HD-Download über die Canva-Hilfsdatei
`DAHZgSirMAU` und Ablage stehen in `engine/README.md`. Neue Szenen ohne Personen und ohne Text; neue Outfits mit
dem bestehenden Avatar als Referenz, gleiche Figur, mindestens 3 Posen, misslungene Bilder verwerfen.
Bestehende Avatar-Dateien nie überschreiben oder löschen. Scheitert es, vorhandene nehmen und melden.

## Schritt 5 – Reels bauen

- Je Reel `bash scripts/make-reel.sh <reel-id> <YYYY-MM-DD>` im Ordner `engine`. Das Skript bringt den Ton auf die
  Instagram-Vorgabe (AAC, 128 kbit/s, 48 kHz, -14 LUFS) und erzeugt das Cover; nicht ändern.
- Prüfen: Dauer 18–40 s, Tonspur aac/48000 Hz/höchstens 128 kbit/s, 2–3 Standbilder und das Cover ansehen.
- Committen und auf `main` pushen (bei Netzwerkfehlern bis zu 4 Wiederholungen mit 2/4/8/16 s Pause).
- Für Metricool die URLs mit Commit-Hash verwenden:
  `https://raw.githubusercontent.com/JVDigitalConsult/ki.toolpilot/<commit-sha>/reels/<datei>`; per curl prüfen.

## Schritt 6 – Metricool

- `createScheduledPost`: instagramData `{"type":"REEL","showReelOnFeed":true,"isAiGenerated":false}`,
  media = Video-URL, videoThumbnailUrl = Cover-URL, autoPublish true, draft false.
  Lehnt Metricool das Cover ab, einmal mit `videoCoverMilliseconds: 0` versuchen und melden.
- Termine möglichst Mo/Mi/Do/Fr 10:00 Europe/Berlin, oder wie es `regelnFuerPlanung` aus der Auswertung empfiehlt.
- Caption 400–900 Zeichen: Hook als erste Zeile, Mehrwert, Aufruf zum Speichern oder Weiterschicken, Frage an die
  Leser, "Link in meiner Bio"; bei Tool-Reels "Werbung | Partner-Links" und "Je nach Tarif, bitte im eigenen Konto
  prüfen"; 8–10 Hashtags; Alt-Text.
- Danach `getScheduledPosts`: richtiges Datum, Typ REEL, Video vorhanden, kein Entwurf.

## Regeln

Kein ManyChat, keine DM-Automation, CTA immer "Link in der Bio", keine Preise. Bei einem Fehler einmal erneut
versuchen; scheitert ein Reel endgültig, überspringen, die anderen fertigstellen, Fehler melden.

## Abschlussmeldung (Deutsch, Push)

Welche Auswertung genutzt wurde (Datum) und welche Lehren und Themenvorschläge übernommen wurden; neue Reels mit
Datum, Titel, Cover-Titel, Tool, Score gesamt und je Faktor, Outfit, Szene, Metricool-Link; neue Outfits/Szenen;
Ergebnis des Faktenchecks; Probleme.
