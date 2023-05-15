import { Adapter, ArrowNavigationState, Focusable, FocusableElement, FocusableGroup, FocusableGroupConfig, Rect } from '../types'
import getHtmlElementMock from './getHtmlElement.mock'

export default function getViewNavigationStateMock (
  adapter?: Adapter
): ArrowNavigationState {
  const elements = new Map<string, FocusableElement>()

  const getSquareElement = (id: string, group: string, x: number, y: number) => {
    const focusableElement = {
      id,
      el: getHtmlElementMock({ id, x, y, width: 10, height: 10 }),
      group
    }
    elements.set(focusableElement.id, focusableElement)
    return focusableElement
  }

  const groups = new Map<string, FocusableGroup>()
  const groupsConfig = new Map<string, FocusableGroupConfig>()

  const group1: FocusableGroup = {
    id: 'group-0',
    el: getHtmlElementMock({ id: 'group-0', x: 0, y: 0, width: 16, height: 52 }),
    elements: new Set()
  };
  [0, 1, 2, 3].forEach(i => {
    const id = `element-0-${i}`
    getSquareElement(id, 'group-0', 3, 3 + (12 * i))
    group1.elements.add(id)
  })
  groups.set(group1.id, group1)
  groupsConfig.set(group1.id, { el: group1.el, id: group1.id })

  const group2: FocusableGroup = {
    id: 'group-1',
    el: getHtmlElementMock({ id: 'group-1', x: 16, y: 0, width: 52, height: 16 }),
    elements: new Set()
  };
  [0, 1, 2, 3].forEach(i => {
    const id = `element-1-${i}`
    getSquareElement(id, 'group-1', 19 + (12 * i), 3)
    group2.elements.add(id)
  })
  groups.set(group2.id, group2)
  groupsConfig.set(group2.id, { el: group2.el, id: group2.id })

  const group3: FocusableGroup = {
    id: 'group-2',
    el: getHtmlElementMock({ id: 'group-2', x: 16, y: 18, width: 52, height: 16 }),
    elements: new Set()
  };
  [0, 1, 2, 3].forEach(i => {
    const id = `element-2-${i}`
    getSquareElement(id, 'group-2', 19 + (12 * i), 21)
    group3.elements.add(id)
  })
  groups.set(group3.id, group3)
  groupsConfig.set(group3.id, { el: group3.el, id: group3.id })

  const group4: FocusableGroup = {
    id: 'group-3',
    el: getHtmlElementMock({ id: 'group-3', x: 16, y: 36, width: 52, height: 16 }),
    elements: new Set()
  };
  [0, 1, 2, 3].forEach(i => {
    const id = `element-3-${i}`
    getSquareElement(id, 'group-3', 19 + (12 * i), 39)
    group4.elements.add(id)
  })
  groups.set(group4.id, group4)
  groupsConfig.set(group4.id, { el: group4.el, id: group4.id })

  const group5: FocusableGroup = {
    id: 'group-4',
    el: getHtmlElementMock({ id: 'group-4', x: 0, y: 52, width: 16, height: 16 }),
    elements: new Set()
  }
  getSquareElement('element-4-0', 'group-4', 3, 55)
  group5.elements.add('element-4-0')
  groups.set(group5.id, group5)
  groupsConfig.set(group5.id, { el: group5.el, id: group5.id })
  return {
    currentElement: 'element-0-0',
    elements,
    groups,
    groupsConfig,
    adapter: {
      type: 'web',
      getNodeRect: (focusable: Focusable) => focusable?.el?.getBoundingClientRect() as Rect,
      focusNode: (focusable: FocusableElement) => focusable?.el.focus(),
      isNodeDisabled: (focusable: FocusableElement) => focusable?.el.getAttribute('disabled') !== null,
      isNodeFocusable: (focusable: FocusableElement) => {
        const focusableSelector = 'input, select, textarea, button, a, [tabindex], [contenteditable]'
        return focusable.el.matches(focusableSelector)
      },
      ...adapter
    }
  }
}
