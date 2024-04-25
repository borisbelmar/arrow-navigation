import { useEffect, useRef } from 'react'
import useSliderGrid from './hooks/useSliderGrid'
import VirtualSlider from '../VirtualSlider'
import { useSetSelectedContent } from '../../../atoms/content'
import getSliders from '../../../utils/getSliders.js'

const sliders = getSliders()

export default function VirtualSliderGrid() {
  const slidersContainerRef = useRef<HTMLDivElement>(null)
  const virtualContainerRef = useRef<HTMLDivElement>(null)
  const { onSliderFocus } = useSliderGrid({ slidersContainerRef })
  const setSelectedContent = useSetSelectedContent()

  useEffect(() => {
    setSelectedContent(sliders[0].items[0])
  }, [setSelectedContent])

  useEffect(() => {
    virtualContainerRef.current?.addEventListener('scroll', () => {
      virtualContainerRef.current?.scrollTo({
        top: 0,
        left: slidersContainerRef.current?.scrollLeft
      })
    })
  }, [])

  return (
    <div ref={virtualContainerRef} className="flex flex-col w-full space-y-2 py-8 overflow-hidden">
      <div ref={slidersContainerRef} className="transition duration-150">
        {sliders.map((item, idx) => (
          <VirtualSlider
            key={item.id}
            slider={item}
            idx={idx}
            slidersLength={sliders.length}
            onSliderFocus={onSliderFocus}
            onSliderBlur={() => {}}
            itemSize={item.itemSize}
            itemRenderer={item.itemRenderer}
            focusableSlideClassName="focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
            virtualContainerRef={virtualContainerRef}
          />
        ))}
      </div>
    </div>
  )
}
