export type Direction = 'up' | 'down' | 'left' | 'right'

export type FocusType = 'first' | 'closest' | 'manual'

export type Point = { x: number, y: number }

export type ElementByDirection = {
  [key in Direction]?: string | null
}

export type FocusableElement = {
  el: HTMLElement
  group: string
  nextElementByDirection?: ElementByDirection
}

export type FocusableGroup = {
  el: HTMLElement
  elements: Map<string, FocusableElement>
}

export type FocusableGroupConfig = {
  el: HTMLElement
  firstElement?: string
  nextGroupByDirection?: ElementByDirection
  saveLast?: boolean
  viewportSafe?: boolean
  threshold?: number
}

export type ArrowNavigationState = {
  currentElement: FocusableElement | null,
  groupsConfig: Map<string, FocusableGroupConfig>,
  groups: Map<string, FocusableGroup>
  elements: Map<string, FocusableElement>
}

// TODO: Apply all this
export type ArrowNavigationOptions = {
  onElementFocus?: (element: FocusableElement) => void
  onElementBlur?: (element: FocusableElement) => void
  onGroupFocus?: (group: FocusableGroup) => void
  onGroupBlur?: (group: FocusableGroup) => void
  onReachLastGroup?: (group: FocusableGroup) => void
  debug?: boolean
  errorOnReinit?: boolean
}

export type ArrowNavigationInstance = {
  getFocusedElement: () => FocusableElement | null
  setFocusElement: (id: string, group: string) => void
  registerGroup: (element: HTMLElement, options?: Pick<FocusableGroupConfig, 'firstElement' | 'nextGroupByDirection' | 'saveLast'>) => void
  registerElement: (element: HTMLElement, group: string, options?: Omit<FocusableElement, 'el' | 'group'>) => void
  unregisterElement: (element: string | HTMLElement) => void
  destroy: () => void
}
