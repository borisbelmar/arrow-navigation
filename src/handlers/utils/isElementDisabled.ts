export default function isElementDisabled (element: HTMLElement): boolean {
  return element.getAttribute('disabled') !== null
}
