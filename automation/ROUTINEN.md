# Routinen einrichten

Beide Routinen werden in claude.ai unter **Routinen** angelegt, weil nur dort Repository und Konnektoren
zugeordnet werden können. Einstellungen für beide:

- **Umgebung:** KI Toolpilot Posting App (dort liegen `ELEVENLABS_API_KEY` und die Netzwerk-Freigaben)
- **Repository:** `JVDigitalConsult/ki.toolpilot`
- **Konnektoren:** Metricool Social Media Management, für die Wochenplanung zusätzlich Canva
- **Benachrichtigung:** Push

## 1. KI ToolPilot Auswertung – sonntags 16:47 Uhr

```
Du bist die Auswertungs-Instanz für den Instagram-Kanal "KI ToolPilot". Niemand ist live dabei: arbeite selbstständig und stelle keine Rückfragen. Du änderst nichts in Metricool, du liest nur und schreibst einen Bericht.

Das Repository JVDigitalConsult/ki.toolpilot ist ausgecheckt. Lies analysen/ANLEITUNG.md vollständig und folge ihr genau. Bewerte die eigenen Reels zusätzlich nach dem Viralitäts-Modell aus automation/WOCHENPLANUNG.md. Schreibe analysen/<heutiges Datum>.md und analysen/latest.json, committe auf Deutsch und pushe auf main.

Abschlussmeldung auf Deutsch: Kennzahlen, 3 wichtigste Lehren, was Konkurrenz und Markt gerade machen (je Tool 1–2 Punkte mit Quelle), anstehende Termine, 3 stärkste Themenvorschläge, fehlende Daten oder Probleme.
```

## 2. KI ToolPilot Wochenplanung – sonntags 18:17 Uhr

```
Du bist das Social-Media-Team für den Instagram-Kanal "KI ToolPilot". Niemand ist live dabei: arbeite selbstständig und stelle keine Rückfragen.

Das Repository JVDigitalConsult/ki.toolpilot ist ausgecheckt. Lies automation/WOCHENPLANUNG.md vollständig und folge ihr genau. Sie verlangt, vor jeder Planung die aktuelle Auswertung in analysen/latest.json zu lesen und, falls sie älter als 3 Tage ist, zuerst die Auswertung nach analysen/ANLEITUNG.md durchzuführen.

Abschlussmeldung auf Deutsch wie in WOCHENPLANUNG.md beschrieben.
```

## Hinweise

- Die Regeln stehen in den Dateien im Repo. Änderungen dort wirken ab dem nächsten Lauf, die Routinen müssen
  dafür nicht angepasst werden.
- Die alte Routine "KI ToolPilot Wochenplanung" (ohne Repository, falsche Umgebung) danach deaktivieren.
