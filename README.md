# Pismarie

Det danske kortspil Pismarie i browseren. Spil mod computeren, eller mod en anden telefon med en 4-cifret kode (ingen login).

Spil: https://woodmandk.github.io/Pis-Marie/
English: https://woodmandk.github.io/Pis-Marie/en/

- `src/pismarie.html` er spillet. Kør `sh build.sh` for at lave `index.html` og den engelske `en/index.html`.
- `i18n/en.py` har de engelske tekster. Ændres en dansk tekst, stopper build.sh og viser hvilken, så den engelske også bliver rettet.
- `peerjs.min.js` (PeerJS 1.5.4, MIT) forbinder to telefoner direkte.
