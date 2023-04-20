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
  onFocus?: () => void
  onBlur?: () => void
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
  onFocus?: () => void
  onBlur?: () => void
  keepFocus?: boolean
}

export type ArrowNavigationState = {
  currentElement: FocusableElement | null,
  groupsConfig: Map<string, FocusableGroupConfig>
  groups: Map<string, FocusableGroup>
  elements: Map<string, FocusableElement>
  debug?: boolean
}

export type ElementEvents = {
  onElementFocus?: (element: FocusableElement) => void
  onElementBlur?: (element: FocusableElement) => void
  onReachLastElement?: (direction: Direction, element: FocusableElement) => void
}

export type GroupEvents = {
  onGroupFocus?: (group: FocusableGroupConfig) => void
  onGroupBlur?: (group: FocusableGroupConfig) => void
  onReachLastGroup?: (direction: Direction, group: FocusableGroup) => void
}

export type ArrowNavigationEvents = ElementEvents & GroupEvents

export type ArrowNavigationOptions = {
  debug?: boolean
  errorOnReinit?: boolean
} & ArrowNavigationEvents

export type ArrowNavigationInstance = {
  getFocusedElement: () => FocusableElement | null
  setFocusElement: (id: string, group: string) => void
  registerGroup: (element: HTMLElement, options?: Pick<FocusableGroupConfig, 'firstElement' | 'nextGroupByDirection' | 'saveLast'>) => void
  registerElement: (element: HTMLElement, group: string, options?: Omit<FocusableElement, 'el' | 'group'>) => void
  unregisterElement: (element: string | HTMLElement) => void
  destroy: () => void
  /**
   * @deprecated
   * @returns The current state of the arrow navigation instance.
   * This is a helper function to test arrow navigation. It is not part of the public API.
   */
  _getState: () => ArrowNavigationState | null
  /**
   * This is a helper function to test arrow navigation. It is not part of the public API.
   * @deprecated
   */
  _setState: (state: ArrowNavigationState) => void
  /**
   * This is a helper function to test arrow navigation. It is not part of the public API.
   * @deprecated
   */
  _forceNavigate: (key: string) => void
}

declare global {
  interface Window {
    arrowNavigation: {
      init: (options?: ArrowNavigationOptions) => void
      get(): ArrowNavigationInstance
    }
  }
}
