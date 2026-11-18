/** Index of the scene being read: the last one whose top is above the reading line. */
export function currentSceneIndex(offsets: readonly number[], readingLine: number): number {
  let current = 0;
  offsets.forEach((offset, index) => {
    if (offset <= readingLine) current = index;
  });
  return current;
}

/** Next scene index after moving `delta` steps, kept inside the deck. */
export function moveSceneIndex(current: number, delta: number, total: number): number {
  return Math.max(0, Math.min(total - 1, current + delta));
}
