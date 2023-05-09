import ORDER from './order'

describe('ORDER', () => {
  // This test is for coverage only
  it('should be an object with the correct keys', () => {
    expect(ORDER).toEqual({
      HORIZONTAL: 'horizontal',
      VERTICAL: 'vertical',
      GRID: 'grid'
    })
  })
})
