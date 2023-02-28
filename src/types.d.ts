export type ArrowNavigationState = {
  currentElement: HTMLElement | null
  elements: HTMLElement[]
}

export type ElementCenter = {
  x: number
  y: number
}

export type FilterFunction = (elementCenter: ElementCenter) => boolean
