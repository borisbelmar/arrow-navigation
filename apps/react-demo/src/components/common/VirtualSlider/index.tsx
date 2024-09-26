import { useCallback, useMemo } from 'react'
import Slider from '../Slider'
import VirtualSlide from './components/VirtualSlide'
import { Content } from '../../../atoms/content'
import type { SliderConfig } from '../../../utils/getSliders'
import { GroupBlurEvent, GroupFocusEvent } from '@arrow-navigation/react'

interface VirtualSliderProps {
  slider: SliderConfig
  idx: number
  slidersLength: number
  itemRenderer: (item: Content, idx: number) => JSX.Element
  focusableSlideClassName: string
  virtualContainerRef: React.RefObject<HTMLDivElement>
  itemSize: {
    width: number | string
    height: number | string
  }
  onSliderBlur: GroupBlurEvent
  onSliderFocus: GroupFocusEvent
}

export default function VirtualSlider({
  slider,
  onSliderBlur,
  onSliderFocus,
  idx,
  slidersLength,
  itemRenderer,
  focusableSlideClassName,
  virtualContainerRef,
  itemSize
}: VirtualSliderProps) {
  const sliderId = `virtual_${idx}`

  const nextGroupByDirection = useMemo(() => ({
    up: idx !== 0 ? `virtual_${idx - 1}` : undefined,
    down: idx !== slidersLength - 1 ? `virtual_${idx + 1}` : undefined
  }), [idx, slidersLength])

  const virtualItemRenderer = useCallback((item: Content, itemIdx: number) => {
    return (
      <VirtualSlide
        item={item}
        idx={itemIdx}
        size={itemSize}
        itemRenderer={itemRenderer}
        virtualContainerRef={virtualContainerRef}
      />
    )
  }, [itemRenderer, virtualContainerRef, itemSize])

  return (
    <Slider
      items={slider.items}
      sliderId={sliderId}
      title={slider.title}
      saveLast
      onSliderFocus={onSliderFocus}
      onSliderBlur={onSliderBlur}
      nextGroupByDirection={nextGroupByDirection}
      itemRenderer={virtualItemRenderer}
      focusableSlideClassName={focusableSlideClassName}
    />
  )
}
