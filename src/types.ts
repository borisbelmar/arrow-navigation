import type { EventEmitter } from './utils/createEventEmitter'

export type Direction = 'up' | 'down' | 'left' | 'right'

export type FocusType = 'first' | 'closest' | 'manual'

export type Point = { x: number, y: number }

export type FocusableWithKind = {
  id: string
  kind: 'group' | 'element'
}

export type FocusableByDirection = {
  [key in Direction]?: string | FocusableWithKind | null
}

export type ElementByDirection = {
  [key in Direction]?: string | null
}

type EventResult<T> = {
  current: T | undefined | null
  direction: Direction | undefined | null
}

type FocusEventResult<T> = EventResult<T> & {
  prev: T | undefined | null
}

type BlurEventResult<T> = EventResult<T> & {
  next: T | undefined | null
}

export type Focusable = {
  id: string
  el: HTMLElement
}

export type FocusableElement = Focusable & {
  group: string
  /**
   * @deprecated
   * Use nextByDirection instead. This property will be removed in the next major version.
   */
  nextElementByDirection?: ElementByDirection
  nextByDirection?: FocusableByDirection
  onFocus?: (result: FocusEventResult<FocusableElement>) => void
  onBlur?: (result: BlurEventResult<FocusableElement>) => void
}

export type FocusableElementOptions = Omit<FocusableElement, 'el' | 'group' | 'id'>

export type FocusableGroup = Focusable & {
  elements: Set<string>
}

export type FocusableGroupConfig = Focusable & {
  firstElement?: string
  lastElement?: string
  nextGroupByDirection?: ElementByDirection
  saveLast?: boolean
  viewportSafe?: boolean
  threshold?: number
  onFocus?: (result: FocusEventResult<FocusableGroupConfig>) => void
  onBlur?: (result: BlurEventResult<FocusableGroupConfig>) => void
  keepFocus?: boolean
}

export type FocusableGroupOptions = Omit<FocusableGroupConfig, 'el' | 'id'>

export type ArrowNavigationState = {
  currentElement: string | null,
  groupsConfig: Map<string, FocusableGroupConfig>
  groups: Map<string, FocusableGroup>
  elements: Map<string, FocusableElement>
  debug?: boolean
}

export type ArrowNavigationOptions = {
  debug?: boolean
  errorOnReinit?: boolean
}

export type GetNextOptions = {
  direction: Direction
  elementId?: string
}

export type GetNextGroupOptions = GetNextOptions

export type GetNextElementOptions = GetNextOptions & {
  inGroup?: boolean
}

export type ChangeFocusEventHandlerOptions = {
  nextElement: FocusableElement | null,
  prevElement: FocusableElement | null,
  direction: Direction | undefined,
  state: ArrowNavigationState,
  emit: EventEmitter['emit']
}

export type ArrowNavigationInstance = {
  getFocusedElement: () => FocusableElement | null
  setFocusElement: (id: string, group: string) => void
  registerGroup: (element: HTMLElement, options?: Pick<FocusableGroupConfig, 'firstElement' | 'nextGroupByDirection' | 'saveLast'>) => void
  registerElement: (element: HTMLElement, group: string, options?: Omit<FocusableElement, 'el' | 'group'>) => void
  unregisterElement: (element: string | HTMLElement) => void
  destroy: () => void
  getCurrentGroups: () => Set<string>
  getGroupElements: (group: string) => Set<string>
  getGroupConfig: (group: string) => FocusableGroupConfig | undefined
  getRegisteredElements: () => Set<string>
  getFocusedGroup: () => string | undefined
  getNextElement: (opts: GetNextElementOptions) => string | null
  getNextGroup: (opts: GetNextGroupOptions) => string | null
  on: EventEmitter['on']
  off: EventEmitter['off']
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
