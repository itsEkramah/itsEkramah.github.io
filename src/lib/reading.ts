export function readingMinutes(body: string | undefined) {
  return Math.max(
    1,
    Math.ceil((body || '').split(/\s+/).filter(Boolean).length / 220),
  );
}
