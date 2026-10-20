# Pismarie Android-app

Android-udgaven er spillet fra `src/pismarie.html` pakket ind med [Capacitor](https://capacitorjs.com). Hjemmesiden påvirkes ikke.

- Hver gang `src/`, `build.sh` eller `app/` ændres på `main`, bygger GitHub Actions (`.github/workflows/android.yml`) en ny `Pismarie.apk` og lægger den på udgivelsen **Pismarie Android-test** under Releases.
- Bygget lokalt (kræver Android SDK): `cd app && npm ci && npm run sync && cd android && ./gradlew assembleRelease`.
- Ikonet og opstartsskærmen laves fra `assets/` med `npx @capacitor/assets generate --android`.

## Test-nøgle

Test-APK'erne er signeret med `android/test.keystore`, som ligger i repoet med vilje, så en ny test-APK kan installeres oven på den gamle. Den må aldrig bruges til Google Play.

## Klar til Google Play

App-id'et er `dk.woodmandk.pismarie` (kan ikke ændres efter første upload til Play). Når der skal laves et signeret AAB:

1. Lav en upload-nøgle én gang: `keytool -genkeypair -keystore upload.keystore -alias upload -keyalg RSA -keysize 2048 -validity 10000`. Gem den og koderne et sikkert sted.
2. Tilføj fire secrets under Settings → Secrets and variables → Actions: `UPLOAD_KEYSTORE_BASE64` (output af `base64 -w0 upload.keystore`), `UPLOAD_STORE_PASSWORD`, `UPLOAD_KEY_ALIAS` og `UPLOAD_KEY_PASSWORD`.
3. Næste bygning laver også `Pismarie.aab` (under Actions-kørslens artifacts), som uploades i Play Console.

## Reklamer (Google AdMob)

`web/ads.js` lægges kun ind i app-udgaven. Den viser en helskærmsannonce højst efter hvert 3. færdige spil og højst én gang hvert 3. minut, aldrig midt i et spil og ikke i online-spil (de tæller dog med). Den lytter på hændelsen `pismarie:gameover`, som spillet sender, når et spil er slut.

Lige nu bruges Googles test-annoncer. Når AdMob-kontoen er klar:

1. Opret appen i AdMob og en mellemsideannonce (Interstitial).
2. Sæt app-id'et (`ca-app-pub-…~…`) i `android/app/src/main/res/values/strings.xml` (`admob_app_id`).
3. Sæt annonce-id'et (`ca-app-pub-…/…`) i `web/ads.js` (`AD_UNIT`) og skift `TESTING` til `false`.
4. Lav en samtykkemeddelelse (GDPR) under Privacy & messaging i AdMob, så EU-spillere bliver spurgt første gang.
