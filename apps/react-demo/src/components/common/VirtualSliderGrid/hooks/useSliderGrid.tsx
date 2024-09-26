import { GroupFocusEventResult } from '@arrow-navigation/react'
import { useCallback, useRef } from 'react'

interface UseSliderGridProps {
  slidersContainerRef: React.RefObject<HTMLDivElement>
}

export default function useSliderGrid({ slidersContainerRef }: UseSliderGridProps) {
  const accumulator = useRef(0)

  const onSliderFocus = useCallback(({ prev, current, direction }: GroupFocusEventResult) => {
    const isSliderGroup = /^virtual_\d+$/gm.test(prev?.id || '')
    if (!isSliderGroup) return

    const currentSlider = document.getElementById(current?.id || '')
    const prevSlider = document.getElementById(prev?.id || '')

    const currentSliderRect = currentSlider?.getBoundingClientRect()
    const prevSliderRect = prevSlider?.getBoundingClientRect()

    const isGoingUp = direction === 'up'

    if (!isGoingUp) {
      accumulator.current += prevSliderRect?.height || 0
    } else {
      accumulator.current -= currentSliderRect?.height || 0
    }

    if (slidersContainerRef.current) {
      slidersContainerRef.current.style.transform = `translateY(-${accumulator.current}px)`
    }
  }, [slidersContainerRef])

  return {
    onSliderFocus
  }
}
