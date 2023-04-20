export default function isFocusableElement (element: HTMLElement) {
  const focusableSelector = 'input, select, textarea, button, a[href], [tabindex], [contenteditable]'
  return element.matches(focusableSelector)
}
