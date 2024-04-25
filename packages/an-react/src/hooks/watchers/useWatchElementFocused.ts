import { ArrowNavigationEvents, FocusEventResult, FocusableElement } from '@arrow-navigation/core'
import { useEffect, useState } from 'react'
import useArrowNavigation from '../useArrowNavigation'

export default function useWatchElementFocused(id: string) {
  const api = useArrowNavigation()
  const [focused, setFocused] = useState(api.getFocusedElement()?.id === id)

  useEffect(() => {
    const onFocus = ({ current }: FocusEventResult<FocusableElement>) => {
      setFocused(current?.id === id)
    }

    api.on(ArrowNavigationEvents.CURRENT_ELEMENT_CHANGE, onFocus)

    return () => {
      api.off(ArrowNavigationEvents.CURRENT_ELEMENT_CHANGE, onFocus)
    }
  }, [api, id])

  return focused
}
