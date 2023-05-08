import getColsByWidth from './getColsByWidth'

describe('getColsByWidth', () => {
  it('should return the number of columns by the width', () => {
    const breakpoints = {
      0: 1,
      768: 2,
      1024: 3
    }
    expect(getColsByWidth(breakpoints, 0)).toBe(1)
    expect(getColsByWidth(breakpoints, 767)).toBe(1)
    expect(getColsByWidth(breakpoints, 768)).toBe(2)
    expect(getColsByWidth(breakpoints, 1023)).toBe(2)
    expect(getColsByWidth(breakpoints, 1024)).toBe(3)
  })
})
