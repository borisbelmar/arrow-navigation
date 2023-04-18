import { ArrowNavigationState, FocusableGroup } from '../types.d'
import getHtmlElementMock from './getHtmlElement.mock'

const getSquareElement = (id: string, group: string, x: number, y: number) => ({
  el: getHtmlElementMock({ id, x, y, width: 10, height: 10 }),
  group,
  cachedNextElementByDirection: {}
})

const groups = new Map<string, FocusableGroup>()

const group1: FocusableGroup = {
  el: getHtmlElementMock({ id: 'group-0', x: 0, y: 0, width: 16, height: 52 }),
  elements: [
    getSquareElement('element-0-0', 'group-0', 3, 3),
    getSquareElement('element-0-1', 'group-0', 3, 15),
    getSquareElement('element-0-2', 'group-0', 3, 27),
    getSquareElement('element-0-3', 'group-0', 3, 39)
  ]
}
groups.set(group1.el.id, group1)

const group2: FocusableGroup = {
  el: getHtmlElementMock({ id: 'group-1', x: 16, y: 0, width: 52, height: 16 }),
  elements: [
    getSquareElement('element-1-0', 'group-1', 19, 3),
    getSquareElement('element-1-1', 'group-1', 31, 3),
    getSquareElement('element-1-2', 'group-1', 43, 3),
    getSquareElement('element-1-3', 'group-1', 55, 3)
  ]
}
groups.set(group2.el.id, group2)

const group3: FocusableGroup = {
  el: getHtmlElementMock({ id: 'group-2', x: 16, y: 18, width: 52, height: 16 }),
  elements: [
    getSquareElement('element-2-0', 'group-2', 19, 21),
    getSquareElement('element-2-1', 'group-2', 31, 21),
    getSquareElement('element-2-2', 'group-2', 43, 21),
    getSquareElement('element-2-3', 'group-2', 55, 21)
  ]
}
groups.set(group3.el.id, group3)

const group4: FocusableGroup = {
  el: getHtmlElementMock({ id: 'group-3', x: 16, y: 36, width: 52, height: 16 }),
  elements: [
    getSquareElement('element-3-0', 'group-3', 19, 39),
    getSquareElement('element-3-1', 'group-3', 31, 39),
    getSquareElement('element-3-2', 'group-3', 43, 39),
    getSquareElement('element-3-3', 'group-3', 55, 39)
  ]
}
groups.set(group4.el.id, group4)

const group5: FocusableGroup = {
  el: getHtmlElementMock({ id: 'group-4', x: 0, y: 52, width: 16, height: 16 }),
  elements: [
    getSquareElement('element-4-0', 'group-4', 3, 55)
  ]
}
groups.set(group5.el.id, group5)

const allElements = new Set<HTMLElement>()
groups.forEach(group => {
  group.elements.forEach(element => {
    allElements.add(element.el)
  })
})

const viewNavigationStateMock: ArrowNavigationState = {
  currentElement: group1.elements[0],
  elements: allElements,
  groups,
  groupsWithElements: groups
}

export default viewNavigationStateMock
