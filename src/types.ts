import type { TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import type { EventEmitter } from './utils/createEventEmitter'

export type Direction = 'up' | 'down' | 'left' | 'right'

export type FocusType = 'first' | 'closest' | 'manual'

export type ORDER = {
  HORIZONTAL: 'horizontal'
  VERTICAL: 'vertical'
  GRID: 'grid'
}

export type Point = { x: number, y: number }

export type FocusableWithKind = {
  id: string | null | undefined
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

export type FocusEventResult<T> = EventResult<T> & {
  prev: T | undefined | null
}

export type BlurEventResult<T> = EventResult<T> & {
  next: T | undefined | null
}

export type Focusable = {
  id: string
  /**
   * @deprecated
   * Now it uses the id to find the element and ref for React Native adapter.
   * It keeps the el property for backward compatibility.
   */
  el: HTMLElement
}

export type FocusableElement = Focusable & {
  instance?: TextInput | TouchableHighlight | TouchableOpacity
  group: string
  /**
   * If group is setted byOrder, the order will be used to find the next element.
   * nextByDirection will be overrided by this property.
   */
  order?: number
  nextByDirection?: FocusableByDirection
  onFocus?: (result: FocusEventResult<FocusableElement>) => void
  onBlur?: (result: BlurEventResult<FocusableElement>) => void
}

export type FocusableElementOptions = Omit<FocusableElement, 'el' | 'group' | 'id'>

export type FocusableGroup = Focusable & {
  elements: Set<string>
}

export type FocusableGroupConfig = Focusable & {
  instance?: View
  firstElement?: string
  lastElement?: string
  nextGroupByDirection?: ElementByDirection
  byOrder?: ORDER[keyof ORDER]
  cols?: number | Record<number, number>
  saveLast?: boolean
  viewportSafe?: boolean
  threshold?: number
  onFocus?: (result: FocusEventResult<FocusableGroupConfig>) => void
  onBlur?: (result: BlurEventResult<FocusableGroupConfig>) => void
  keepFocus?: boolean
  arrowDebounce?: boolean
}

export type FocusableGroupOptions = Omit<FocusableGroupConfig, 'el' | 'id'>

export type Rect = {
  x: number
  y: number
  width: number
  height: number
  left: number
  top: number
  right: number
  bottom: number
}

export type FocusNodeOptions = {
  preventScroll?: boolean
}

export type Adapter = {
  type: 'web' | 'react-native'
  getNodeRect: (focusable: FocusableElement | FocusableGroupConfig) => Rect
  isNodeDisabled: (focusable: FocusableElement) => boolean
  focusNode: (focusable: FocusableElement, opts?: FocusNodeOptions) => void
  isNodeFocusable: (focusable: FocusableElement) => boolean
}

export type ArrowNavigationState = {
  currentElement: string | null,
  groupsConfig: Map<string, FocusableGroupConfig>
  groups: Map<string, FocusableGroup>
  elements: Map<string, FocusableElement>
  debug?: boolean
  readonly adapter: Adapter
  initialFocusElement?: string
}

export type ArrowNavigationOptions = {
  debug?: boolean
  errorOnReinit?: boolean
  preventScroll?: boolean
  adapter?: Adapter
  disableWebListeners?: boolean
  initialFocusElement?: string
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
  setFocusElement: (id: string) => void
  setInitialFocusElement: (id: string) => void
  registerGroup: (el: HTMLElement, options?: FocusableGroupOptions) => void
  registerElement: (el: HTMLElement, groupId: string, options?: FocusableElementOptions) => void
  unregisterElement: (id: string) => void
  destroy: () => void
  getCurrentGroups: () => Set<string>
  getGroupElements: (group: string) => Set<string>
  getGroupConfig: (group: string) => FocusableGroupConfig | undefined
  getRegisteredElements: () => Set<string>
  getFocusedGroup: () => string | undefined
  getNextElement: (opts: GetNextElementOptions) => string | null
  getNextGroup: (opts: GetNextGroupOptions) => string | null
  handleDirectionPress: (direction: Direction, repeat: boolean) => void
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
