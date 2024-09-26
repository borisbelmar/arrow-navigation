import { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { type ElementFocusEventResult, FocusableElement } from '@arrow-navigation/react'
import getSliderElementId from './utils/getSliderElementId'
import { Content, useSetSelectedContent } from '../../../atoms/content.js'

interface SliderItemProps {
  item: Content
  idx: number
  itemRenderer?: (item: Content, idx: number) => React.ReactNode
  sliderId: string | number
  onFocus: (result: ElementFocusEventResult, idx: number) => void
  className?: string
}

export default function SliderItem({
  item,
  idx,
  itemRenderer,
  sliderId,
  onFocus,
  className
}: SliderItemProps) {
  const timeout = useRef<NodeJS.Timeout | number>(0)
  const setSelectedContent = useSetSelectedContent()

  const handleFocus = useCallback((result: ElementFocusEventResult) => {
    timeout.current = setTimeout(() => {
      setSelectedContent(item)
    }, 500)
    onFocus(result, idx)
  }, [idx, onFocus, item, setSelectedContent])

  const handleBlur = useCallback(() => {
    clearTimeout(timeout.current)
  }, [])

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current)
    }
  }, [])

  return (
    <FocusableElement
      id={getSliderElementId(sliderId, idx)}
      className={className}
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      {itemRenderer?.(item, idx)}
    </FocusableElement>
  )
}

SliderItem.propTypes = {
  item: PropTypes.object,
  idx: PropTypes.number,
  itemRenderer: PropTypes.func,
  sliderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onFocus: PropTypes.func,
  className: PropTypes.string
}
