export function isString(str: unknown): str is string {
  return typeof str === 'string';
}
