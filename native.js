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

    // Release keep-awake on app background
    const AppPlugin = plugin('App');
    if (AppPlugin) {
      AppPlugin.addListener('appStateChange', ({ isActive }) => {
        if (!isActive) window.MelodiaNative.keepAwake(false);
      });
    }
  }

})();
