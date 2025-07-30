export function getEmptyArray(len: number) {
  return Array(len)
    .fill(0)
    .map((_, i) => i + 1);
}
