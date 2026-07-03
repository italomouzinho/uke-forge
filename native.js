(function() {
  'use strict';

  const Cap = window.Capacitor;
  const isNativePlatform = !!(Cap && Cap.isNativePlatform && Cap.isNativePlatform());

  function plugin(name) {
    return Cap?.Plugins?.[name] ?? null;
  }

  window.MelodiaNative = {
    isNative() { return isNativePlatform; },

    async keepAwake(on) {
      const KA = plugin('KeepAwake');
      if (!KA) return;
      try { await (on ? KA.keepAwake() : KA.allowSleep()); }
      catch (e) { console.warn('[native] keepAwake:', e); }
    },

    async haptic() {
      const H = plugin('Haptics');
      if (!H) return;
      try { await H.impact({ style: 'LIGHT' }); }
      catch {}
    },
  };

  // E3-S3: Subscribe to facade events — runs on web too (keepAwake/haptic are no-ops there)
  function wireEvents() {
    const app = globalThis.MelodiaApp;
    if (!app) return;
    app.onPerfChange(isOpen => window.MelodiaNative.keepAwake(isOpen));
    app.onFretToggle(() => window.MelodiaNative.haptic());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireEvents);
  } else {
    wireEvents(); // already loaded
  }

  if (isNativePlatform) {
    // Status bar
    const SB = plugin('StatusBar');
    if (SB) {
      SB.setStyle({ style: 'DARK' }).catch(() => {});
      SB.setBackgroundColor({ color: '#0B1622' }).catch(() => {});
    }

    // Hide splash after first render (double-rAF = after paint)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const SS = plugin('SplashScreen');
      if (SS) SS.hide({ fadeOutDuration: 200 }).catch(() => {});
    }));

    // E3-S2: Back-button pop-stack + release keep-awake on app background
    const AppPlugin = plugin('App');
    if (AppPlugin) {
      AppPlugin.addListener('backButton', () => {
        const app = globalThis.MelodiaApp;
        if (!app) return;
        if (app.isDrawerOpen())            { app.closeDrawer();     return; }
        if (app.isPopupOpen())             { app.hidePopup();       return; }
        if (app.isPerfOpen())              { app.exitPerformance(); return; }
        if (app.isBrowseOpen())            { app.closeBrowse();     return; }
        if (app.currentTab() !== 'chords') { app.showTab('chords'); return; }
        AppPlugin.minimizeApp();
      });

      AppPlugin.addListener('appStateChange', ({ isActive }) => {
        if (!isActive) window.MelodiaNative.keepAwake(false);
      });
    }
  }

})();
