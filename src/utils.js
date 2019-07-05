export function createUrl(urlLayout, parts) {
  let url = urlLayout;

  if (urlLayout.indexOf("/") !== -1 && !Object.keys(parts).length) {
    throw new Error("Invalid URL params.");
  }

  for (let key in parts) {
    const value = parts[key];
    const idx = url.indexOf(key);
    if (idx !== -1) {
      url = url.slice(0, idx - 1) + value + url.slice(idx + key.length);
    }
  }

  return url;
}
