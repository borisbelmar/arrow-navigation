import { FocusableGroupOptions, getArrowNavigation } from '@arrow-navigation/core'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { FocusableElementOptions } from '@arrow-navigation/core'
import type { GroupOptions } from '../FocusableGroup'

type Props = {
  groupId: string
} & GroupOptions

export default function useFocusableGroupContext({
  groupId,
  firstElement,
  nextDown,
  nextLeft,
  nextRight,
  nextUp,
  byOrder,
  cols,
  saveLast,
  viewportSafe,
  threshold,
  onFocus,
  onBlur,
  keepFocus,
  arrowDebounce
}: Props) {
  const idRef = useRef<string | null>(null)
  const arrowNavigationApi = getArrowNavigation()

  const registerElement = useCallback((
    id: string,
    elOptions?: FocusableElementOptions
  ) => {
    arrowNavigationApi.registerElement(id, groupId, elOptions)
  }, [arrowNavigationApi, groupId])

  const unregisterElement = useCallback((id: string) => {
    arrowNavigationApi.unregisterElement(id)
  }, [arrowNavigationApi])

  const options: FocusableGroupOptions = useMemo(() => ({
    firstElement,
    nextGroupByDirection: {
      up: nextUp,
      down: nextDown,
      left: nextLeft,
      right: nextRight
    },
    byOrder,
    cols,
    saveLast,
    viewportSafe,
    threshold,
    onFocus,
    onBlur,
    keepFocus,
    arrowDebounce
  }), [
    firstElement,
    nextUp,
    nextDown,
    nextLeft,
    nextRight,
    byOrder,
    cols,
    saveLast,
    viewportSafe,
    threshold,
    onFocus,
    onBlur,
    keepFocus,
    arrowDebounce
  ])

  useEffect(() => {
    if (!groupId) {
      throw new Error('groupRef must be a ref object with a current property containing a HTMLElement with an id')
    }
    if (idRef.current !== groupId) {
      arrowNavigationApi.registerGroup(groupId, options)
      idRef.current = groupId
    } else {
      arrowNavigationApi.updateGroup(groupId, options)
    }
  }, [groupId, options, arrowNavigationApi])

  useEffect(() => {
    return () => {
      arrowNavigationApi.resetGroupState(groupId)
    }
  }, [arrowNavigationApi, groupId])

  return {
    registerElement,
    unregisterElement
  }
}
