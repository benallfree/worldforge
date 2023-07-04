export function assert<T>(v: T | undefined | void): asserts v is T {
  if (!v) {
    throw new Error(`Assertion failure`)
  }
}
