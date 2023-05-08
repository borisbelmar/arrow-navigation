import getNextByOrderVertical from './getNextByOrderVertical'

describe('getNextByOrderVertical', () => {
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

  it('should return the next element by order in the vertical group', () => {
    const nextByDirection1 = getNextByOrderVertical(props)
    expect(nextByDirection1).toEqual({
      up: { id: null, kind: 'group' },
      down: { id: 'group-1-1', kind: 'element' },
      left: { id: null, kind: 'group' },
      right: { id: 'group-2', kind: 'group' }
    })

    const nextByDirection2 = getNextByOrderVertical({
      ...props,
      order: 1
    })
    expect(nextByDirection2).toEqual({
      up: { id: 'group-1-0', kind: 'element' },
      down: { id: 'group-1-2', kind: 'element' },
      left: { id: null, kind: 'group' },
      right: { id: 'group-2', kind: 'group' }
    })

    const nextByDirection3 = getNextByOrderVertical({
      ...props,
      order: 5
    })
    expect(nextByDirection3).toEqual({
      up: { id: 'group-1-4', kind: 'element' },
      down: { id: 'group-3', kind: 'group' },
      left: { id: null, kind: 'group' },
      right: { id: 'group-2', kind: 'group' }
    })
  })
})
