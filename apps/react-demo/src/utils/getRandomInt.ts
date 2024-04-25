const getRandomInt = (min: number, max: number) => {
  const ceilMin = Math.ceil(min)
  const ceilMax = Math.floor(max)
  return Math.floor(Math.random() * (ceilMax - ceilMin)) + ceilMin
}

export default getRandomInt
