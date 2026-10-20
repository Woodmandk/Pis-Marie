#!/bin/sh
# Wraps src/pismarie.html (the same page that runs as a Claude artifact) into index.html for GitHub Pages.
d=$(dirname "$0")
{ printf '%s' '<!doctype html><html lang="da"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#113a2d"><style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}</style><script src="peerjs.min.js"></script></head><body>'
  cat "$d/src/pismarie.html"; printf '%s\n' '</body></html>'; } > "$d/index.html"
