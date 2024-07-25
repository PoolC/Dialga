/**
 * Asserts that a condition is true. If the condition is false, an error is thrown.
 *
 * @param condition - The condition to check.
 * @param error - The error to throw if the condition is false. Defaults to a new Error object.
 * @throws {Error} - Throws an error if the condition is false.
 */
export function assert(condition: unknown, error: Error | string = new Error()): asserts condition {
  if (!condition) {
    if (typeof error === 'string') {
      throw new Error(error);
    } else {
      throw error;
    }
  }
}
