# Auswertung KI ToolPilot

Läuft jeden Sonntag vor der Wochenplanung. Ergebnis ist die Grundlage für die Themenwahl der nächsten Reels.
Die Auswertung ändert nichts in Metricool, sie liest nur.

## 1. Eigene Beiträge auswerten

- Metricool `getAnalyticsDataByMetrics`, Brand `7689690`, letzte 60 Tage:
  - Reels: `IGRE02` Datum, `IGRE03` Text, `IGRE06` URL, `IGRE11` Reichweite, `IGRE23` Views, `IGRE10` Likes,
    `IGRE07` Kommentare, `IGRE12` Gespeichert, `IGRE21` Geteilt, `IGRE24` durchschnittliche Wiedergabezeit,
    `IGRE28` Anteil Views länger als 3 Sekunden
  - Konto: `IGEV01` Follower, `IGEV43` neue Follower, `IGEV06` Reichweite
- Ordne jedes veröffentlichte Reel seinem Skript zu: Datum im Dateinamen `reels/<datum>-<id>.mp4`,
  Skript in `engine/reels/<id>.json` (Hook-Titel, Format, Cover, Szenen).
- Kennzahlen je Reel: 3-Sekunden-Quote, Wiedergabezeit im Verhältnis zur Länge, Speichern, Teilen, Kommentare, Reichweite.
- Bewerte jedes Reel zusätzlich nach dem Viralitäts-Modell (acht Faktoren, siehe Wochenplanung) und vergleiche
  den Score mit den echten Zahlen: Wo lag die Einschätzung daneben?
- Leite 3 bis 5 konkrete Lehren ab (z. B. welche Hook-Art, welches Format, welche Länge, welche Uhrzeit funktioniert).
  Bei wenigen Daten ausdrücklich sagen, dass die Aussagen vorläufig sind.

## 2. Was andere machen

- **Vergleichskanäle:** Die festen Vergleichskanäle stehen in `analysen/konkurrenz.json`. Werte sie immer aus,
  vorrangig über Metricool (siehe nächster Punkt). Fehlen dort Daten zu einem Kanal, recherchiere per WebSearch,
  worüber er in den letzten 14 Tagen gepostet hat (Themen, Hooks, Formate, Startbilder), und kennzeichne das als
  Websuche statt Messwert. Melde Kanäle aus der Liste, die in Metricool noch fehlen.
- **Konkurrenz in Metricool:** `IGCO02` Name, `IGCO07` Follower, `IGCO12` Reels, `IGCO10` Engagement und
  `IGCR01` bis `IGCR10` (Reels der Konkurrenz mit Text, URL, Datum, Likes, Kommentaren, Engagement), letzte 30 Tage.
  Welche Themen, Hooks und Formate haben das höchste Engagement? Sind keine Konkurrenten hinterlegt,
  das melden und vorschlagen, 3 bis 5 passende Kanäle in Metricool unter Konkurrenz hinzuzufügen.
- **Markt-Scan per WebSearch** (letzte 14 Tage, DACH und international), getrennt für
  - Claude / Anthropic: neue Funktionen, Ankündigungen, worüber Creator und Medien gerade sprechen
  - Metricool: Updates, neue Funktionen, Blog-Themen, Webinare
  - FunnelCockpit: Updates, neue Funktionen, Blog-Themen, Webinare, Aktionen
  - Creator zu KI-Tools und KI-Business: welche Themen, Hooks, Formate und Startbilder gerade laufen
- **Was andere planen:** angekündigte Launches, Events, Webinare, Feature-Termine und saisonale Anlässe der
  nächsten 2 bis 4 Wochen (z. B. Jahresplanung, Black Friday, Jahresrückblick), jeweils mit Datum und Quelle.
- Nur belegte Angaben mit Quelle und Datum. Offizielle Quellen bevorzugen (anthropic.com, support.claude.com,
  metricool.com, funnelcockpit.com), sonst mindestens zwei unabhängige seriöse Quellen. Nichts erfinden.
  Ist eine Seite nicht erreichbar, nicht weiter probieren und mit den Suchergebnissen arbeiten.

## 3. Empfehlungen

- 6 bis 8 Themenvorschläge für die nächsten zwei Wochen: Titel, Tool, Blickwinkel, Format, Hook-Idee,
  warum jetzt, Quellen. Lücken bevorzugen, die andere nicht oder schlecht abdecken.
- Themen, die vermieden werden sollen (schon behandelt, gesättigt, nicht belegbar).
- Regeln für die nächste Planung, die sich aus den Zahlen ergeben.

## 4. Ablage

- `analysen/<YYYY-MM-DD>.md`: lesbarer Bericht auf Deutsch.
- `analysen/latest.json`: dieselben Ergebnisse strukturiert, Schema:

```json
{
  "datum": "YYYY-MM-DD",
  "datenlage": "kurze Einschätzung, wie belastbar die Zahlen sind",
  "eigeneBeitraege": {
    "follower": 0,
    "reels": [{"datum": "", "id": "", "titel": "", "reichweite": 0, "views": 0, "quote3s": 0, "wiedergabeSek": 0,
               "laengeSek": 0, "gespeichert": 0, "geteilt": 0, "kommentare": 0, "scoreModell": 0}],
    "lehren": [""]
  },
  "konkurrenz": {"hinterlegt": false, "kanaele": [], "topReels": [], "muster": [""]},
  "markt": {
    "claude": [{"thema": "", "warum": "", "quelle": "", "datum": ""}],
    "metricool": [],
    "funnelcockpit": [],
    "creatorMuster": [""]
  },
  "anstehend": [{"ereignis": "", "datum": "", "quelle": ""}],
  "themenvorschlaege": [{"titel": "", "tool": "claude|metricool|funnelcockpit|kombi", "blickwinkel": "",
                          "format": "", "hook": "", "warumJetzt": "", "quellen": [""]}],
  "vermeiden": [""],
  "regelnFuerPlanung": [""]
}
```

- Committen und auf `main` pushen (Commit-Nachricht auf Deutsch).
- Kurze Push-Meldung: 3 wichtigste Lehren, 3 stärkste Themenvorschläge, Hinweis auf fehlende Daten.
