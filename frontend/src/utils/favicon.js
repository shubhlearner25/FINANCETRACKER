// Updates the site's favicon depending on the selected theme.
// Expects an existing <link id="favicon" rel="icon"> in the HTML.

export function updateFavicon(theme = 'light') {
  const faviconEl = document.querySelector('link#favicon');

  if (!faviconEl) {
    console.warn("Favicon element with id='favicon' not found.");
    return;
  }

  const iconPath =
    theme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg';

  // Only update if different (optimization)
  if (faviconEl.getAttribute('href') !== iconPath) {
    faviconEl.setAttribute('href', iconPath);
  }
}
