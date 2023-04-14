import getAxisCenter from './getAxisCenter'

export default function getEuclideanDistance (
  direction: string,
  currentElement: HTMLElement,
  candidateElement: HTMLElement
) {
  const currentRect = currentElement.getBoundingClientRect()
  const candidateRect = candidateElement.getBoundingClientRect()

  const candidateCenter = getAxisCenter(candidateElement)
  const currentCenter = getAxisCenter(currentElement)

  switch (direction) {
    case 'up':
      return Math.sqrt(
        (candidateCenter.x - currentCenter.x) ** 2 + (candidateRect.bottom - currentRect.top) ** 2
      )
    case 'down':
      return Math.sqrt(
        (candidateCenter.x - currentCenter.x) ** 2 + (currentRect.bottom - candidateRect.top) ** 2
      )
    case 'left':
      return Math.sqrt(
        (candidateRect.right - currentRect.left) ** 2 + (candidateCenter.y - currentCenter.y) ** 2
      )
    case 'right':
      return Math.sqrt(
        (currentRect.right - candidateRect.left) ** 2 + (candidateCenter.y - currentCenter.y) ** 2
      )
    default:
      throw new Error('Invalid direction provided')
  }
}
