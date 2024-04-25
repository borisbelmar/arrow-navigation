/* eslint-disable no-underscore-dangle */
import { renderHook } from '@testing-library/react-hooks'
import { getArrowNavigation, initArrowNavigation } from '@arrow-navigation/core'
import useFocusableGroupContext from './useFocusableGroupContext'

describe('useFocusableGroupContext', () => {
  window.console.error = jest.fn()
  window.console.warn = jest.fn()

  const TEST_GROUP_ID = 'test-group'

  beforeEach(() => {
    initArrowNavigation({ debug: true })
  })

  it('should register a group', () => {
    const group = document.createElement('div')
    group.id = TEST_GROUP_ID
    document.body.appendChild(group)
    const { result } = renderHook(() => useFocusableGroupContext({ groupId: TEST_GROUP_ID }))

    const api = getArrowNavigation()

    expect(result.current.registerElement).toBeDefined()
    expect(result.current.unregisterElement).toBeDefined()
    expect(api.getGroupConfig(TEST_GROUP_ID)).toBeDefined()
  })

  it('should register and unregister an element from group', () => {
    const { result } = renderHook(() => useFocusableGroupContext({ groupId: TEST_GROUP_ID }))
    const element = document.createElement('button')
    element.id = 'test-element'
    document.body.appendChild(element)
    result.current.registerElement(element.id)

    const api = getArrowNavigation()

    expect(api.getRegisteredElements().has(element.id)).toBeDefined()
    expect(api._getState()?.groups.get(TEST_GROUP_ID)?.elements.has(element.id)).toBeDefined()

    result.current.unregisterElement(element.id)

    expect(api.getRegisteredElements().has(element.id)).toBeFalsy()
    expect(api._getState()?.groups.get(TEST_GROUP_ID)?.elements.has(element.id)).toBeFalsy()
  })

  it('should throw an error if used without a ref node without id', () => {
    const { result } = renderHook(() => useFocusableGroupContext({ groupId: '' }))

    expect(result.error).toBeDefined()
    expect(result.error?.message).toBe('groupRef must be a ref object with a current property containing a HTMLElement with an id')
  })

  it('should update group options', () => {
    const group = document.createElement('div')
    const TEST_ELEMENT = 'test-element'
    group.id = TEST_GROUP_ID
    document.body.appendChild(group)

    const api = getArrowNavigation()

    jest.spyOn(api, 'updateGroup')
    jest.spyOn(api, 'registerGroup')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hook = renderHook(({ groupId, firstElement }) => useFocusableGroupContext({
      groupId,
      firstElement
    }), {
      initialProps: {
        groupId: TEST_GROUP_ID,
        firstElement: TEST_ELEMENT
      }
    })

    expect(api.registerGroup).toHaveBeenCalled()

    hook.rerender({
      groupId: TEST_GROUP_ID,
      firstElement: 'another-element'
    })

    expect(api.updateGroup).toHaveBeenCalled()

    hook.unmount()
  })
})
