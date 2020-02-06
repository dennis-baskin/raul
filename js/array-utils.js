export const groupBy = (array, key) => {
  return array.reduce((accumulator, currentValue) => {
    (accumulator[currentValue[key]] = accumulator[currentValue[key]] || []).push(currentValue)
    return accumulator
  }, {})
}
