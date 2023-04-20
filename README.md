# Arrow Navigation Core

[![codecov](https://codecov.io/gh/borisbelmar/arrow-navigation/branch/main/graph/badge.svg?token=6EEWATKTFX)](https://codecov.io/gh/borisbelmar/arrow-navigation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Light and zero-dependency module to navigate through elements using the arrow keys written in Typescript.

## Installation

```bash
npm install --save @arrow-navigation/core

# or

yarn add @arrow-navigation/core
```

## Usage

At the top of your application, you need to initialize the module. This will add the event listeners to the document and store the navigation state in a singleton instance.

```typescript
import { initArrowNavigation } from '@arrow-navigation/core'

initArrowNavigation()
```

Then, you can use the `getArrowNavigation` to access the API.

```typescript
import { getArrowNavigation } from '@arrow-navigation/core'

const navigationApi = getArrowNavigation()

// Create a container element to be able to navigate between elements inside it
const mainElement = document.createElement('main')
document.body.appendChild(mainElement)

// Is important to keep a unique id for each group element
mainElement.id = 'group-0'

// Register a group to be able to navigate between elements inside the container
navigationApi.registerGroup(mainElement)

// We create our first button element
const buttonElement = document.createElement('button')
buttonElement.textContent = 'Click me'
mainElement.appendChild(buttonElement)

// Is important to keep a unique id for each element
buttonElement.id = 'element-0-0'

// We register the element on the group to be able to navigate to it
navigationApi.registerElement(buttonElement)

// We create our second button element
const buttonElement2 = document.createElement('button')
buttonElement2.textContent = 'Click me too'
mainElement.appendChild(buttonElement2)

navigationApi.registerElement(buttonElement2)
```

## API

### initArrowNavigation

Initialize the module. This will add the event listeners to the document and store the navigation state in a singleton instance.

## getArrowNavigation

Get the navigation API. This will return an object with the following methods:

### registerGroup

Register a group to be able to navigate between elements inside the container.

```typescript
const container = document.createElement('div')

// Is important to keep a unique id for each group and his elements
container.id = 'group-0'

registerGroup(container): void
```

You can also pass a options object as the second parameter to customize the navigation behavior.

```typescript
const container = document.createElement('div')

// Is important to keep a unique id for each group and his elements
container.id = 'group-0'

registerGroup(container, {
  firstElement: 'element-0-0', // The first element to be focused when the focus enter the group
  nextGroupByDirection: {
    'down': 'group-1', // The next group when the user press the down arrow key
    'up': null, // If press up, no groups will be focused
    'left': undefined // undefined will keep the default behavior
  },
  saveLast: true, // Save the last focused element when the focus leave the group and use it when the focus enter again
  viewportSafe: true, // If true, the next element will be the first element that is visible in the viewport. The default value is true
  threshold: 2, // The threshold in pixels to consider an element eligible to be focused. The default value is 0
  onFocus: (group) => { console.log(`focused ${group.el.id}`) }, // Callback when the group is focused
  onBlur: (group) => { console.log(`blurred ${group.el.id}`) },
  keepFocus: true // If true, the focus will not leave the group when the user press the arrow keys. The default value is false. This option is usefull for modals or other elements that need to keep the focus inside.
})
```

### registerElement

Register an element to be able to navigate to it. The element must be inside a group.

```typescript
const api = getArrowNavigation()

const element = document.createElement('button')

// Is important to keep a unique id for each element
element.id = 'element-0-0'

api.registerElement(element, 'group-1')
```

You can also pass a options object as the third parameter to customize the navigation behavior.

```typescript
const api = getArrowNavigation()

const element = document.createElement('button')

// Is important to keep a unique id for each element
element.id = 'element-0-0'

api.registerElement(element, 'group-1', {
  nextElementByDirection: { // This will set the next element manually
    'down': 'element-0-1', // The next element when the user press the down arrow key
    'up': null, // If press up, no elements will be focused
    'left': undefined // undefined will keep the default behavior
  },
  onFocus: (element) => console.log(`focused ${element.el.id}`), // Callback when the element is focused
  onBlur: (element) => console.log(`blurred ${element.el.id}`) // Callback when the element is blurred
})
```

### unregisterElement

Unregister an element from the navigation. Is important to call this method when the element is removed from the DOM.

```typescript
const api = getArrowNavigation()api.
const element = document.createElement('button')
const container = document.createElement('div')

// Is important to keep a unique id for each group and his elements
container.id = 'group-0'
element.id = 'element-0-0'

api.registerGroup(container)
api.registerElement(element, 'group-0')

api.unregisterElement(element)
```

### getFocusedElement

Get the focused element.

```typescript
const api = getArrowNavigation()
const element = document.createElement('button')
const container = document.createElement('div')

// Is important to keep a unique id for each group and his elements
container.id = 'group-0'
element.id = 'element-0-0'

api.registerGroup(container)
api.registerElement(element, 'group-0')

const focusedElement = api.getFocusedElement()
```

### setFocusedElement

Set the focused element.

```typescript
const api = getArrowNavigation()

const container = document.createElement('div')
const element = document.createElement('button')
const element2 = document.createElement('button')

// Is important to keep a unique id for each group and his elements
container.id = 'group-0'
element.id = 'element-0-0'
element2.id = 'element-0-1'

api.registerGroup(container)
api.registerElement(element, 'group-0')
api.registerElement(element2, 'group-0')

api.setFocusedElement('element-0-1')

document.activeElement.id === element2.id // true
```

### destroy

Destroy the module. This will remove the event listeners from the document and remove the navigation state from the singleton instance.

```typescript
const api = getArrowNavigation()

api.destroy()
```

# Using with CDN

You can use the module with a CDN. The module is available in the following URL:

`https://cdn.jsdelivr.net/npm/@arrow-navigation/core@<version>/dist/dist.js`

```html
<script src="https://cdn.jsdelivr.net/npm/@arrow-navigation/core@1.0.1/dist/dist.js"></script>
<script>
  window.arrowNavigation.init()

  const arrowNavigationApi = window.arrowNavigation.get()

  // Now you can use the arrowNavigationApi
  // ...
</script>
```

