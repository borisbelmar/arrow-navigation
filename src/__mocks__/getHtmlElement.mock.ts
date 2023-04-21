import getDOMRectMock from './getDOMRect.mock'

interface Props {
  tagName?: string
  id?: string
  x?: number,
  y?: number,
  width?: number,
  height?: number
}

export default function getHtmlElementMock ({
  tagName = 'div',
  id = '',
  x = 0,
  y = 0,
  width = 0,
  height = 0
}: Props): HTMLElement {
  const getBoundingClientRect = jest.fn(() => getDOMRectMock(x, y, width, height))
  const focus = jest.fn()

  const element = document.createElement(tagName)
  element.id = id
  element.getBoundingClientRect = getBoundingClientRect
  element.focus = focus
  return element
}
