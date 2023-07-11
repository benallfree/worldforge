export function assert<T>(v: T | undefined | void | null): asserts v is T {
  if (!v) {
    throw new Error(`Assertion failure`)
  }
}
