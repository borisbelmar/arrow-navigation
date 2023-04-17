export type Direction = 'up' | 'down' | 'left' | 'right'

export type FocusType = 'auto' | 'manual'

export type Point = { x: number, y: number }

export type ElementByDirection = {
  [key in Direction]?: string
}

export type FocusableElement = {
  el: HTMLElement
  group: string
  cachedNextElementByDirection: ElementByDirection
  nextElementByDirection?: ElementByDirection
  focusType?: FocusType
}

export type FocusableGroup = {
  elements: FocusableElement[]
  el: HTMLElement
  firstElement?: FocusableElement
  lastElement?: FocusableElement
  nextGroupByDirection?: ElementByDirection
  keepAlive?: boolean
  saveLast?: boolean
  focusType?: FocusType
}

export type GroupMap = Map<string, FocusableGroup>

export type ArrowNavigationState = {
  currentElement: FocusableElement | null,
  groups: GroupMap,
  elements: Set<HTMLElement>
}
