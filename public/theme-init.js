// Apply the saved theme before first paint to avoid a light/dark flash.
try {
  var saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved;
} catch (e) {
  /* storage blocked — fall back to the system preference */
}
