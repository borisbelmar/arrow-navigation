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
  return {
    id,
    tagName,
    getBoundingClientRect: jest.fn(() => getDOMRectMock(x, y, width, height)),
    focus: jest.fn()
  } as unknown as HTMLElement
}
