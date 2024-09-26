import { useCallback, useMemo, useRef } from 'react'
import getSliderElementId from '../utils/getSliderElementId'
import { Content } from '../../../../atoms/content'
import { ElementFocusEventResult, GroupBlurEvent, GroupBlurEventResult, GroupFocusEvent } from '@arrow-navigation/react'

interface SliderOptions {
  items: Content[]
  sliderId: string | number
  onReachLastElement?: () => void
  backToStart?: boolean
  onSliderFocus?: GroupFocusEvent
  onSliderBlur?: GroupBlurEvent
  nextGroupByDirection?: { up?: string; down?: string }
  saveLast?: boolean
}

export default function useSlider({
  items,
  sliderId,
  onReachLastElement,
  backToStart = false,
  onSliderFocus,
  onSliderBlur,
  nextGroupByDirection,
  saveLast
}: SliderOptions) {
  const translation = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const onElementFocus = useCallback((result: ElementFocusEventResult, idx: number) => {
    const currentElement = document.getElementById(result.current?.id || '')
    const lastSlideIdx = items.length - 1
    const lastElement = document.getElementById(getSliderElementId(sliderId, lastSlideIdx))

    if (idx === lastSlideIdx) {
      onReachLastElement?.()
    }

    const groupContainer = containerRef.current
    const trans = -(idx * (currentElement?.getBoundingClientRect().width ?? 0 + 16))

    const isOutOfViewStart = currentElement?.getBoundingClientRect().left ?? 0 < 0
    const isOutOfViewEnd = lastElement?.getBoundingClientRect().right ?? 0 > window.innerWidth

    if (
      (isOutOfViewEnd && translation.current > trans)
      || (isOutOfViewStart && translation.current < trans)
    ) {
      if (groupContainer) {
        groupContainer.style.transform = `translateX(${trans}px)`
      }
    }
    translation.current = trans
  }, [items, sliderId, onReachLastElement])

  const onGroupBlur = useCallback((result: GroupBlurEventResult) => {
    onSliderBlur?.(result)
    if (!backToStart || saveLast) return
    const groupContainer = containerRef.current
    if (groupContainer) {
      groupContainer.style.transform = 'translateX(0)'
    }
  }, [backToStart, onSliderBlur, saveLast])

  const groupOptions = useMemo(() => ({
    onBlur: onGroupBlur,
    firstElement: backToStart ? getSliderElementId(sliderId, 0) : undefined,
    viewportSafe: false,
    onFocus: onSliderFocus,
    nextGroupByDirection
  }), [backToStart, sliderId, onGroupBlur, onSliderFocus, nextGroupByDirection])

  return {
    onElementFocus,
    groupOptions,
    containerRef
  }
}
