import getNextByOrderHorizontal from './getNextByOrderHorizontal'

describe('getNextByOrderHorizontal', () => {
  const props = {
    group: 'group-1',
    order: 0,
    groupSize: 5,
    nextGroupByDirection: {
      right: 'group-2',
      down: 'group-3',
      left: null,
      up: null
    }
  }
  it('should return the next element by order in the horizontal group', () => {
    const nextByDirection1 = getNextByOrderHorizontal(props)
    expect(nextByDirection1).toEqual({
      left: { id: null, kind: 'group' },
      right: { id: 'group-1-1', kind: 'element' },
      up: { id: null, kind: 'group' },
      down: { id: 'group-3', kind: 'group' }
    })

    const nextByDirection2 = getNextByOrderHorizontal({
      ...props,
      order: 1
    })
    expect(nextByDirection2).toEqual({
      left: { id: 'group-1-0', kind: 'element' },
      right: { id: 'group-1-2', kind: 'element' },
      up: { id: null, kind: 'group' },
      down: { id: 'group-3', kind: 'group' }
    })

    const nextByDirection3 = getNextByOrderHorizontal({
      ...props,
      order: 5
    })
    expect(nextByDirection3).toEqual({
      left: { id: 'group-1-4', kind: 'element' },
      right: { id: 'group-2', kind: 'group' },
      up: { id: null, kind: 'group' },
      down: { id: 'group-3', kind: 'group' }
    })
  })
})
