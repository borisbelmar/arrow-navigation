import { ArrowNavigationState, FocusableElement, FocusableGroup, FocusableGroupConfig } from '../types'
import getHtmlElementMock from './getHtmlElement.mock'

export default function getViewNavigationStateMock (): ArrowNavigationState {
  const elements = new Map<string, FocusableElement>()

  const getSquareElement = (id: string, group: string, x: number, y: number) => {
    const focusableElement = {
      el: getHtmlElementMock({ id, x, y, width: 10, height: 10 }),
      group
    }
    elements.set(focusableElement.el.id, focusableElement)
    return focusableElement
  }

  const groups = new Map<string, FocusableGroup>()
  const groupsConfig = new Map<string, FocusableGroupConfig>()

  const group1: FocusableGroup = {
    el: getHtmlElementMock({ id: 'group-0', x: 0, y: 0, width: 16, height: 52 }),
    elements: new Map()
  }
  group1.elements.set('element-0-0', getSquareElement('element-0-0', 'group-0', 3, 3))
  group1.elements.set('element-0-1', getSquareElement('element-0-1', 'group-0', 3, 15))
  group1.elements.set('element-0-2', getSquareElement('element-0-2', 'group-0', 3, 27))
  group1.elements.set('element-0-3', getSquareElement('element-0-3', 'group-0', 3, 39))
  groups.set(group1.el.id, group1)
  groupsConfig.set(group1.el.id, { el: group1.el })

  const group2: FocusableGroup = {
    el: getHtmlElementMock({ id: 'group-1', x: 16, y: 0, width: 52, height: 16 }),
    elements: new Map()
  }
  group2.elements.set('element-1-0', getSquareElement('element-1-0', 'group-1', 19, 3))
  group2.elements.set('element-1-1', getSquareElement('element-1-1', 'group-1', 31, 3))
  group2.elements.set('element-1-2', getSquareElement('element-1-2', 'group-1', 43, 3))
  group2.elements.set('element-1-3', getSquareElement('element-1-3', 'group-1', 55, 3))
  groups.set(group2.el.id, group2)
  groupsConfig.set(group2.el.id, { el: group2.el })

  const group3: FocusableGroup = {
    el: getHtmlElementMock({ id: 'group-2', x: 16, y: 18, width: 52, height: 16 }),
    elements: new Map()
  }
  group3.elements.set('element-2-0', getSquareElement('element-2-0', 'group-2', 19, 21))
  group3.elements.set('element-2-1', getSquareElement('element-2-1', 'group-2', 31, 21))
  group3.elements.set('element-2-2', getSquareElement('element-2-2', 'group-2', 43, 21))
  group3.elements.set('element-2-3', getSquareElement('element-2-3', 'group-2', 55, 21))
  groups.set(group3.el.id, group3)
  groupsConfig.set(group3.el.id, { el: group3.el })

  const group4: FocusableGroup = {
    el: getHtmlElementMock({ id: 'group-3', x: 16, y: 36, width: 52, height: 16 }),
    elements: new Map()
  }
  group4.elements.set('element-3-0', getSquareElement('element-3-0', 'group-3', 19, 39))
  group4.elements.set('element-3-1', getSquareElement('element-3-1', 'group-3', 31, 39))
  group4.elements.set('element-3-2', getSquareElement('element-3-2', 'group-3', 43, 39))
  group4.elements.set('element-3-3', getSquareElement('element-3-3', 'group-3', 55, 39))
  groups.set(group4.el.id, group4)
  groupsConfig.set(group4.el.id, { el: group4.el })

  const group5: FocusableGroup = {
    el: getHtmlElementMock({ id: 'group-4', x: 0, y: 52, width: 16, height: 16 }),
    elements: new Map()
  }
  group5.elements.set('element-4-0', getSquareElement('element-4-0', 'group-4', 3, 55))
  groups.set(group5.el.id, group5)
  groupsConfig.set(group5.el.id, { el: group5.el })
  return {
    currentElement: Array.from(elements.values())[0],
    elements,
    groups,
    groupsConfig
  }
}
