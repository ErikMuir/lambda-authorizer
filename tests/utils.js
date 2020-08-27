export function recordError(delegate) {
  try { delegate(); }
  catch (e) { return e; }
  return undefined;
}
