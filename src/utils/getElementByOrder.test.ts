import getElementIdByOrder from './getElementIdByOrder'

describe('getElementIdByOrder', () => {
  it('should return the element id', () => {
    expect(getElementIdByOrder('group-0', 0)).toBe('group-0-0')
  })
})
