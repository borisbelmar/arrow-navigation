import isElementDisabled from './isElementDisabled'

test('returns true if the element is disabled', () => {
  const element = document.createElement('button')
  element.setAttribute('disabled', '')

  expect(isElementDisabled(element)).toBe(true)

  element.removeAttribute('disabled')

  expect(isElementDisabled(element)).toBe(false)
})
