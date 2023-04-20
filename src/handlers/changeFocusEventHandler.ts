import type { ArrowNavigationEvents, ArrowNavigationState, FocusableElement } from '@/types.d'

export default function changeFocusEventHandler (
  nextElement: FocusableElement,
  state: ArrowNavigationState,
  events: ArrowNavigationEvents
) {
  const prevElement = state.currentElement
  const sameGroup = prevElement?.group === nextElement.group

  if (!sameGroup) {
    const prevGroup = state.groupsConfig.get(prevElement?.group as string)
    const nextGroup = state.groupsConfig.get(nextElement.group)

    if (prevGroup) {
      prevGroup.onBlur?.()
      events.onGroupBlur?.(prevGroup)
    }

    if (nextGroup) {
      nextGroup.onFocus?.()
      events.onGroupFocus?.(nextGroup)
    }
  }
  if (prevElement) {
    prevElement.onBlur?.()
    events.onElementBlur?.(prevElement)
  }
  nextElement.onFocus?.()
  events.onElementFocus?.(nextElement)
}
