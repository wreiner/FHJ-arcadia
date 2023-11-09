import { randomBytes } from 'crypto';

// Source: https://stackoverflow.com/a/40191779
export function generate_urlpath(): string {
  return randomBytes(16).toString('hex');
}

export function getNextPlayerUrl(
  currentUrl: string,
  players: any,
): string | null {
  const keys = Object.keys(players);

  // Sort the keys based on the 'order' field
  keys.sort((a, b) => players[a].order - players[b].order);

  const currentIndex = keys.indexOf(currentUrl);

  if (currentIndex !== -1) {
    const nextIndex = (currentIndex + 1) % keys.length;
    return keys[nextIndex];
  }

  return null; // Return null if the provided key is not found.
}
