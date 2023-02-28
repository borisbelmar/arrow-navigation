import getClosestElementByDirection from './getClosestElementByDirection'
import type { ArrowNavigationState } from './types.d'

let singletonState: ArrowNavigationState | null = null

const onKeydown = (event: KeyboardEvent) => {
  if (!singletonState) {
    throw new Error('Arrow navigation not initialized. Use initArrowNavigation to initialize.')
  }

  const { key } = event

  const keyToDirection: { [x: string]: string } = {
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'up',
    ArrowDown: 'down'
  }

  const element = getClosestElementByDirection(keyToDirection[key], singletonState)

  if (element) {
    singletonState.currentElement = element
    element.focus()
  }
}

export function getArrowNavigationInstance () {
  if (!singletonState) {
    throw new Error('Arrow navigation not initialized. Use initArrowNavigation to initialize.')
  }

  const state = singletonState as ArrowNavigationState

  return {
    getFocusedElement: () => state.currentElement,
    setFocus: (element: HTMLElement) => {
      state.currentElement = element
      element.focus()
    },
    registerElement (element: HTMLElement) {
      state.elements.push(element)
      if (!state.currentElement) {
        state.currentElement = element
        element.focus()
      }
    },
    unregisterElement (element: HTMLElement) {
      state.elements = state.elements.filter(el => el !== element)
      if (state.currentElement === element) {
        state.currentElement = state.elements[0] || null
      }
    },
    destroy () {
      document.removeEventListener('keydown', onKeydown)
      singletonState = null
    }
  }
}

export function initArrowNavigation () {
  if (singletonState) {
    throw new Error('Arrow navigation already initialized. Use destroy if you want to reinitialize.')
  }

  const innerState: ArrowNavigationState = {
    currentElement: null,
    elements: []
  }

  singletonState = innerState

  document.addEventListener('keydown', onKeydown)

  return getArrowNavigationInstance()
}
