import { useEffect, useRef, useState } from 'react'
import { ArrowNavigationEvents, getArrowNavigation } from '@arrow-navigation/react'
import isPartiallyInView from '../utils/isPartiallyInView'
import getViewportRect from '../utils/getViewportRect'
import { Content } from '../../../../atoms/content'

interface VirtualSlideProps {
  item: Content
  idx: number
  itemRenderer: (item: Content, idx: number) => React.ReactNode
  virtualContainerRef: React.RefObject<HTMLDivElement>
  size: React.CSSProperties
}

export default function VirtualSlide({ item, idx, itemRenderer, virtualContainerRef, size }: VirtualSlideProps) {
  const [mustMount, setMustMount] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const onElementChange = () => {
      timeout = setTimeout(() => {
        if (!ref.current) {
          return
        }
        const refComputedStyle = window.getComputedStyle(ref.current)
        const partiallyInView = isPartiallyInView(
          ref.current.getBoundingClientRect(),
          virtualContainerRef?.current?.getBoundingClientRect() || getViewportRect(),
          parseFloat(refComputedStyle.height),
          parseFloat(refComputedStyle.width) * 2
        )
        setMustMount(partiallyInView)
      }, 100)
    }
    onElementChange()

    const api = getArrowNavigation()
    api.on(ArrowNavigationEvents.ELEMENT_BLUR, onElementChange)

    return () => {
      clearTimeout(timeout)
      api.off(ArrowNavigationEvents.ELEMENT_BLUR, onElementChange)
    }
  }, [virtualContainerRef, size])

  return (
    <div ref={ref} style={size}>
      {mustMount ? (
        itemRenderer?.(item, idx)
      ) : null}
    </div>
  )
}
