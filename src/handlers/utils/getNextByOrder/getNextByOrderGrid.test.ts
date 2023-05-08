import getNextByOrderGrid from './getNextByOrderGrid'

describe('getNextByOrderGrid', () => {
  it('should return the next element by order in the grid', () => {
    const props = {
      group: 'group-1',
      order: 0,
      groupSize: 10,
      nextGroupByDirection: {
        right: 'group-2',
        down: 'group-3',
        left: null,
        up: null
      },
      groupCols: 2,
      viewportWidth: 1000
    }
    const nextByDirection1 = getNextByOrderGrid({
      ...props,
      order: 0
    })
    expect(nextByDirection1).toEqual({
      left: { id: null, kind: 'group' },
      right: { id: 'group-1-1', kind: 'element' },
      up: { id: null, kind: 'group' },
      down: { id: 'group-1-2', kind: 'element' }
    })

    const nextByDirection2 = getNextByOrderGrid({
      ...props,
      order: 1
    })
    expect(nextByDirection2).toEqual({
      left: { id: 'group-1-0', kind: 'element' },
      right: { id: 'group-2', kind: 'group' },
      up: { id: null, kind: 'group' },
      down: { id: 'group-1-3', kind: 'element' }
    })

    const nextByDirection3 = getNextByOrderGrid({
      ...props,
      order: 9
    })
    expect(nextByDirection3).toEqual({
      left: { id: 'group-1-8', kind: 'element' },
      right: { id: 'group-2', kind: 'group' },
      up: { id: 'group-1-7', kind: 'element' },
      down: { id: 'group-3', kind: 'group' }
    })

    const nextByDirection4 = getNextByOrderGrid({
      ...props,
      order: 8
    })
    expect(nextByDirection4).toEqual({
      left: { id: null, kind: 'group' },
      right: { id: 'group-1-9', kind: 'element' },
      up: { id: 'group-1-6', kind: 'element' },
      down: { id: 'group-3', kind: 'group' }
    })

    const nextByDirection5 = getNextByOrderGrid({
      ...props,
      nextGroupByDirection: {
        right: undefined,
        down: undefined,
        left: undefined,
        up: undefined
      },
      order: 9
    })
    expect(nextByDirection5).toEqual({
      left: { id: 'group-1-8', kind: 'element' },
      right: { id: undefined, kind: 'group' },
      up: { id: 'group-1-7', kind: 'element' },
      down: { id: undefined, kind: 'group' }
    })

    const nextByDirection6 = getNextByOrderGrid({
      ...props,
      order: 0,
      groupCols: { 0: 1, 600: 2, 900: 3 },
      viewportWidth: 500
    })
    expect(nextByDirection6.right).toEqual({ id: 'group-2', kind: 'group' })

    const nextByDirection7 = getNextByOrderGrid({
      ...props,
      order: 0,
      groupCols: 0
    })
    expect(nextByDirection7.down).toEqual({ id: 'group-1-1', kind: 'element' })
    expect(nextByDirection7.right).toEqual({ id: 'group-2', kind: 'group' })

    const nextByDirection8 = getNextByOrderGrid({
      ...props,
      order: 0,
      groupCols: undefined
    })
    expect(nextByDirection8.down).toEqual({ id: 'group-1-1', kind: 'element' })
    expect(nextByDirection8.right).toEqual({ id: 'group-2', kind: 'group' })
  })
})
