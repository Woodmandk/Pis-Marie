// App-only: a full-screen ad now and then, between games, never during one.
// Listens for the game's "pismarie:gameover" event (sent from finish(), not during the tutorial).
(function () {
  const AdMob = window.Capacitor && window.Capacitor.isNativePlatform() && window.Capacitor.registerPlugin("AdMob");
  if (!AdMob) return;

  // Google's test interstitial. Swap for the real ad unit id from AdMob before going live.
  const AD_UNIT = "ca-app-pub-3940256099942544/1033173712";
  const TESTING = true;
  const EVERY = 3;                  // at most one ad per 3 finished games
  const MIN_GAP = 3 * 60 * 1000;    // and never twice within 3 minutes
  const KEY = "pismarie.ads";

  let ready = false, loading = false;
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } };
  const save = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} };

  function prepare() {
    if (ready || loading) return;
    loading = true;
    AdMob.prepareInterstitial({ adId: AD_UNIT, isTesting: TESTING })
      .then(() => { ready = true; }, () => {})
      .finally(() => { loading = false; });
  }

  async function start() {
    try {
      let info = await AdMob.requestConsentInfo();
      if (info.isConsentFormAvailable && info.status === "REQUIRED") info = await AdMob.showConsentForm();
      if (!info.canRequestAds && !TESTING) return;
    } catch (e) { if (!TESTING) return; }
    await AdMob.initialize();
    prepare();
  }

  window.addEventListener("pismarie:gameover", (e) => {
    const s = load();
    s.games = (s.games || 0) + 1;
    save(s);
    // Online games count, but the ad waits for a game against the computer so nobody is left waiting.
    if (e.detail && e.detail.online || s.games < EVERY || Date.now() - (s.last || 0) < MIN_GAP) return;
    if (!ready) { prepare(); return; }
    setTimeout(() => {
      ready = false;
      AdMob.showInterstitial().then(() => save({ games: 0, last: Date.now() }), () => {}).finally(prepare);
    }, 1200);
  });

  start().catch(() => {});
})();
