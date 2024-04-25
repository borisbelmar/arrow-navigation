import { FocusableGroup } from '@arrow-navigation/react'
import type { BlurEventResult, FocusEventResult, FocusableGroupConfig } from '@arrow-navigation/core'
import SliderItem from './SliderItem'
import useSlider from './hooks/useSlider'
import { Content } from '../../../atoms/content'
import { ReactNode } from 'react'

interface SliderProps {
  items: Content[]
  sliderId: string | number
  backToStart?: boolean
  onReachLastElement?: () => void
  title?: string
  onSliderFocus?: (result: FocusEventResult<FocusableGroupConfig>) => void
  nextGroupByDirection?: Record<string, string | undefined>
  itemRenderer?: (item: Content, idx: number) => ReactNode
  focusableSlideClassName?: string
  saveLast?: boolean
  onSliderBlur?: (result: BlurEventResult<FocusableGroupConfig>) => void
}

export default function Slider({
  items,
  sliderId,
  backToStart,
  onReachLastElement,
  title,
  onSliderFocus,
  onSliderBlur,
  saveLast,
  nextGroupByDirection,
  itemRenderer,
  focusableSlideClassName
}: SliderProps) {
  const {
    onElementFocus,
    groupOptions,
    containerRef
  } = useSlider({
    items,
    sliderId,
    onReachLastElement,
    backToStart,
    onSliderFocus,
    onSliderBlur,
    nextGroupByDirection,
    saveLast
  })

  return (
    <FocusableGroup
      id={String(sliderId)}
      onBlur={groupOptions.onBlur}
      onFocus={groupOptions.onFocus}
      viewportSafe={groupOptions.viewportSafe}
      firstElement={groupOptions.firstElement}
      nextUp={groupOptions.nextGroupByDirection?.up}
      nextDown={groupOptions.nextGroupByDirection?.down}
      className="px-8 py-4"
    >
      {title && (
        <h2 className="text-xl font-bold mb-2">
          {title}
        </h2>
      )}
      <div
        ref={containerRef}
        className="flex space-x-4 transition duration-150"
      >
        {items.map((item, idx) => (
          <SliderItem
            key={item.id}
            idx={idx}
            item={item}
            sliderId={sliderId}
            onFocus={onElementFocus}
            itemRenderer={itemRenderer}
            className={focusableSlideClassName}
          />
        ))}
      </div>
    </FocusableGroup>
  )
}
