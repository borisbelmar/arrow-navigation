import { FocusableElement } from '@/types'

export default function isNodeDisabled (focusable: FocusableElement): boolean {
  const element = document.getElementById(focusable.id)
  if (!element) return true
  return element.getAttribute('disabled') !== null
}
