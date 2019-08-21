export function createUrl(urlLayout, parts) {
  let url = urlLayout;

  for (let key in parts) {
    const value = parts[key];
    const idx = url.indexOf(key);
    if (idx !== -1) {
      url = url.slice(0, idx - 1) + value + url.slice(idx + key.length);
    }
  }

  return url;
}
