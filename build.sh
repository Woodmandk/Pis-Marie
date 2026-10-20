#!/bin/sh
# Wraps src/pismarie.html (the same page that runs as a Claude artifact) into index.html for GitHub Pages,
# and makes the English site en/index.html from it with the texts in i18n/en.py.
set -e
d=$(dirname "$0")
wrap() {  # wrap <lang> <path to peerjs>
  printf '%s' '<!doctype html><html lang="'"$1"'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#113a2d"><style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}</style><script src="'"$2"'"></script></head><body>'
  cat; printf '%s\n' '</body></html>'
}
wrap da peerjs.min.js < "$d/src/pismarie.html" > "$d/index.html"
mkdir -p "$d/en"
python3 "$d/i18n/en.py" "$d/src/pismarie.html" > "$d/en/body.tmp"
wrap en ../peerjs.min.js < "$d/en/body.tmp" > "$d/en/index.html"
rm "$d/en/body.tmp"
