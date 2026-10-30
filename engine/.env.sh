# Vorinstalliertes Chromium für Remotion (der eigene Chrome-Download ist in der Cloud-Umgebung gesperrt)
export REMOTION_BROWSER=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell 2>/dev/null | head -1)
