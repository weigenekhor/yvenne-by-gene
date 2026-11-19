// The former site can forward these three public demo preferences in the
// fragment. Restore the visitor's bookmark before the rest of the page starts.
const migration = /^#yvenne-move=(legacy|pentimento|),(on|off|),(\d{0,13})(#.*)?$/.exec(location.hash);
if (migration) {
  const [, mode, notifications, muteUntil, bookmark = ''] = migration;
  history.replaceState(history.state, '', location.pathname + location.search + bookmark);
  try {
    if (mode && !localStorage.getItem('yvenne-mode') && !localStorage.getItem('yvenne-edition')) {
      localStorage.setItem('yvenne-mode', mode);
      localStorage.setItem('yvenne-edition', mode);
    }
    if (notifications && !localStorage.getItem('yvenne-showcase-notifications')) {
      const mutes = muteUntil ? {temperature: Number(muteUntil)} : {};
      localStorage.setItem('yvenne-showcase-notifications', JSON.stringify({enabled: notifications === 'on', mutes}));
    }
  } catch {
    // The site also supports browsers with storage disabled.
  }
  if (bookmark) {
    try {
      document.getElementById(decodeURIComponent(bookmark.slice(1)))?.scrollIntoView();
    } catch {
      // A bookmark can carry an arbitrary string.
    }
  }
}
