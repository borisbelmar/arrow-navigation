import { FocusableElement, FocusableGroupConfig, Rect } from '@/types'

export default function getNodeRect (focusable: FocusableElement | FocusableGroupConfig): Rect {
  const element = document.getElementById(focusable.id)
  const rect = element?.getBoundingClientRect()
  return rect || { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 }
}
