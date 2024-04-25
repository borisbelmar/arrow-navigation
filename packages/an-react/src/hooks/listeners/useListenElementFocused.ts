import { ArrowNavigationEvents, FocusEventResult, FocusableElement } from '@arrow-navigation/core'
import { useEffect } from 'react'
import useArrowNavigation from '../useArrowNavigation'

type Callback = () => void

export default function useListenElementFocused(cb: Callback, id: string) {
  const api = useArrowNavigation()

  useEffect(() => {
    const onFocus = ({ current }: FocusEventResult<FocusableElement>) => {
      if (current?.id === id) {
        cb()
      }
    }
    api.on(ArrowNavigationEvents.CURRENT_ELEMENT_CHANGE, onFocus)

    return () => {
      api.off(ArrowNavigationEvents.CURRENT_ELEMENT_CHANGE, onFocus)
    }
  }, [api, id, cb])
}
