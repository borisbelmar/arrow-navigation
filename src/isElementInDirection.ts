import getAxisCenter from './getAxisCenter'

export function isElementInDirection (
  direction: string,
  currentElement: HTMLElement,
  candidateElement: HTMLElement
): boolean {
  const currentRect = currentElement.getBoundingClientRect()
  const candidateRect = candidateElement.getBoundingClientRect()

  const candidateCenter = getAxisCenter(candidateElement)
  const currentCenter = getAxisCenter(currentElement)

  switch (direction) {
    case 'up':
      return candidateCenter.y < currentCenter.y && candidateRect.bottom < currentRect.top
    case 'down':
      return candidateCenter.y > currentCenter.y && candidateRect.top > currentRect.bottom
    case 'left':
      return candidateCenter.x < currentCenter.x && candidateRect.right < currentRect.left
    case 'right':
      return candidateCenter.x > currentCenter.x && candidateRect.left > currentRect.right
    default:
      return false
  }
}
