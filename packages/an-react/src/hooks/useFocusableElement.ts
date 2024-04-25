import { useEffect, useMemo, useRef } from 'react'
import { useFocusableGroup } from '@/components/FocusableGroup/FocusableGroup'
import { Options } from '@/components/FocusableElement'
import { FocusableElementOptions, getArrowNavigation } from '@arrow-navigation/core'

type Props = {
  id: string
} & Options

export default function useFocusableElement({
  id,
  nextDown,
  nextLeft,
  nextRight,
  nextUp,
  order,
  onBlur,
  onFocus
}: Props) {
  const idRef = useRef<string | null>(null)
  const { registerElement, unregisterElement } = useFocusableGroup()

  const options: FocusableElementOptions = useMemo(() => ({
    nextByDirection: {
      down: nextDown,
      left: nextLeft,
      right: nextRight,
      up: nextUp
    },
    order,
    onBlur,
    onFocus
  }), [
    nextDown,
    nextLeft,
    nextRight,
    nextUp,
    order,
    onBlur,
    onFocus
  ])

  useEffect(() => {
    if (idRef.current !== id) {
      registerElement(id, options)
      idRef.current = id
    } else {
      getArrowNavigation().updateElement(id, options)
    }
  }, [options, registerElement, id])

  useEffect(() => {
    return () => {
      unregisterElement(id)
    }
  }, [unregisterElement, id])
}
