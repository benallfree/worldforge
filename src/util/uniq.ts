export function uniq<T>(array: T[]): T[] {
  return array.filter((value, index, self) => {
    return self.indexOf(value) === index
  })
}
