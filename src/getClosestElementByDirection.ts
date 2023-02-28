import type { ArrowNavigationState, ElementCenter, FilterFunction } from './types'

const getClosestElementByDirection = (
  direction: string,
  state: ArrowNavigationState
): HTMLElement | null => {
  const { currentElement, elements } = state

  if (!currentElement) {
    return null
  }

  const currentElementRect = currentElement.getBoundingClientRect()
  const currentElementCenter: ElementCenter = {
    x: currentElementRect.left + currentElementRect.width / 2,
    y: currentElementRect.top + currentElementRect.height / 2
  }

  const filterFuncs: { [x: string]: FilterFunction } = {
    left: elementCenter => elementCenter.x < currentElementCenter.x,
    right: elementCenter => elementCenter.x > currentElementCenter.x,
    up: elementCenter => elementCenter.y < currentElementCenter.y,
    down: elementCenter => elementCenter.y > currentElementCenter.y,
    'up-left': elementCenter => elementCenter.x < currentElementCenter.x && elementCenter.y < currentElementCenter.y,
    'up-right': elementCenter => elementCenter.x > currentElementCenter.x && elementCenter.y < currentElementCenter.y,
    'down-left': elementCenter => elementCenter.x < currentElementCenter.x && elementCenter.y > currentElementCenter.y,
    'down-right': elementCenter => elementCenter.x > currentElementCenter.x && elementCenter.y > currentElementCenter.y
  }

  let closestElement: HTMLElement | null = null
  let closestDistance = Number.MAX_SAFE_INTEGER

  // Find closest element in given direction
  elements.forEach(element => {
    const elementRect = element.getBoundingClientRect()
    const elementCenter = {
      x: elementRect.left + elementRect.width / 2,
      y: elementRect.top + elementRect.height / 2
    }

    const filterFunc = filterFuncs[direction]
    if (filterFunc && filterFunc(elementCenter)) {
      const distance = Math.sqrt(
        (elementCenter.x - currentElementCenter.x) ** 2
        + (elementCenter.y - currentElementCenter.y) ** 2
      )

      if (distance < closestDistance) {
        closestElement = element
        closestDistance = distance
      }
    }
  })

  // If closest element not found, check other directions
  if (!closestElement) {
    if (direction === 'left') {
      closestElement = getClosestElementByDirection('up-left', state) || getClosestElementByDirection('down-left', state)
    } else if (direction === 'right') {
      closestElement = getClosestElementByDirection('up-right', state) || getClosestElementByDirection('down-right', state)
    } else if (direction === 'up') {
      closestElement = getClosestElementByDirection('up-left', state) || getClosestElementByDirection('up-right', state)
    } else if (direction === 'down') {
      closestElement = getClosestElementByDirection('down-left', state) || getClosestElementByDirection('down-right', state)
    }
  }

  return closestElement
}

export default getClosestElementByDirection
