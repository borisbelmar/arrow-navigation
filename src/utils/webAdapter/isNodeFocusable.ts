import { FocusableElement } from '@/types'

export default function isNodeFocusable (focusable: FocusableElement) {
  const element = document.getElementById(focusable.id)
  if (!element) return false
  const focusableSelector = 'input, select, textarea, button, a, [tabindex], [contenteditable]'
  return element.matches(focusableSelector)
}
