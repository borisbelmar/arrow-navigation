# Arrow Navigation Core

[![codecov](https://codecov.io/gh/borisbelmar/arrow-navigation/branch/main/graph/badge.svg?token=6EEWATKTFX)](https://codecov.io/gh/borisbelmar/arrow-navigation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![install size](https://packagephobia.com/badge?p=@arrow-navigation/core)](https://packagephobia.com/result?p=@arrow-navigation/core)

Light (~16kb) and zero-dependency module to navigate through elements using the arrow keys written in Typescript.

For live demo, [visit this url](https://arrow-navigation-demo.vercel.app/). For ReactJS implementation, check [@arrow-navigation/react](https://www.npmjs.com/package/@arrow-navigation/react).

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

initArrowNavigation({
  preventScroll: true // Prevent the default behavior of the arrow keys to scroll the page. The default value is true,
  disableWebListeners: false, // Disable the web listeners. The default value is false
  adapter: webAdapter, // The adapter to use. The default value is webAdapter included in the package. You can create your own adapter to use the module in other platforms like React Native.
  initialFocusElement: 'element-0-0' // The element to be focused when the elements has been registered. The default value is null
})
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

# API

## initArrowNavigation

Initialize the module. This will add the event listeners to the document and store the navigation state in a singleton instance.

## getElementIdByOrder

Retrieve the element ID in the same order as the library when use group byOrder. This functionality proves valuable when you need to manually control the focus.

```typescript
const api = getArrowNavigation()

// Set the focus to the first element of the group-0
const id = getElementIdByOrder('group-0', 0) // 'group-0-0'
api.setFocusElement(id)
```

## getArrowNavigation

Get the navigation API. This will return an object with the following methods:

### registerGroup

Register a group to be able to navigate between elements inside the container.

```typescript
const container = document.createElement('div')

// Is important to keep a unique id for each group and his elements
container.id = 'group-0'

registerGroup(container.id): void
```

You can also pass a options object as the second parameter to customize the navigation behavior.

```typescript
const container = document.createElement('div')

// Is important to keep a unique id for each group and his elements
container.id = 'group-0'

api.registerGroup(container.id, {
  firstElement: 'element-0-0', // The first element to be focused when the focus enter the group
  nextGroupByDirection: {
    'down': 'group-1', // The next group when the user press the down arrow key
    'up': null, // If press up, no groups will be focused
    'left': undefined // undefined will keep the default behavior
  },
  byOrder: ArrowNavigationOrder.HORIZONTAL, // Navigate by order setted on elements. Can be 'horizontal', 'vertical' or 'grid', this enum comes with ArrowNavigationOrder constant object. Take care with this option, because this will change the id of the elements, for example, for group-0, the element in order 1 will be group-0-1. It includes a utility function getElementIdByOrder(groupId, order): string. Keep this in mind if you are using the id of the elements for firstElement or nextByDirection options.
  cols: 2, // The number of columns to navigate when the byOrder is 'grid'. The default value is 1 and you can set a object with the number of columns for each breakpoint. For example: { 0: 1, 768: 2, 1024: 3 }
  saveLast: true, // Save the last focused element when the focus leave the group and use it when the focus enter again
  viewportSafe: true, // If true, the next element will be the first element that is visible in the viewport. The default value is true
  threshold: 2, // The threshold in pixels to consider an element eligible to be focused. The default value is 0
  onFocus: ({ current, prev, direction }) => { console.log(`focused ${current.id}`) }, // Callback when the group is focused. The prev group is the group that was focused before the current group.
  onBlur: ({ current, next, direction }) => { console.log(`blurred ${current.id}`) }, // Callback when the group is blurred. The next group is the group that will be focused when the focus leave the current group.
  keepFocus: true // If true, the focus will not leave the group when the user press the arrow keys. The default value is false. This option is usefull for modals or other elements that need to keep the focus inside.
})
```

### updateGroup

Update a registered group. This is useful when you need to update the group options.

```typescript
// ...

api.updateGroup('group-id', {
  firstElement: 'element-0-0', // The first element to be focused when the focus enter the group
  nextGroupByDirection: {
    'down': 'group-1', // The next group when the user press the down arrow key
    'up': null, // If press up, no groups will be focused
    'left': undefined // undefined will keep the default behavior
  },
  byOrder: ArrowNavigationOrder.HORIZONTAL, // Navigate by order setted on elements. Can be 'horizontal', 'vertical' or 'grid', this enum comes with ArrowNavigationOrder constant object. Take care with this option, because this will change the id of the elements, for example, for group-0, the element in order 1 will be group-0-1. It includes a utility function getElementIdByOrder(groupId, order): string. Keep this in mind if you are using the id of the elements for firstElement or nextByDirection options.
  cols: 2, // The number of columns to navigate when the byOrder is 'grid'. The default value is 1 and you can set a object with the number of columns for each breakpoint. For example: { 0: 1, 768: 2, 1024: 3 }
  saveLast: true, // Save the last focused element when the focus leave the group and use it when the focus enter again
  viewportSafe: true, // If true, the next element will be the first element that is visible in the viewport. The default value is true
  threshold: 2, // The threshold in pixels to consider an element eligible to be focused. The default value is 0
  onFocus: ({ current, prev, direction }) => { console.log(`focused ${current.id}`) }, // Callback when the group is focused. The prev group is the group that was focused before the current group.
  onBlur: ({ current, next, direction }) => { console.log(`blurred ${current.id}`) }, // Callback when the group is blurred. The next group is the group that will be focused when the focus leave the current group.
  keepFocus: true // If true, the focus will not leave the group when the user press the arrow keys. The default value is false. This option is usefull for modals or other elements that need to keep the focus inside.
})
```

### resetGroupState

Reset the group state. This will reset states like lastElement from the group config. This is usefull when you are remounting the group, for example, a memory's route change.

```typescript

const container = document.createElement('div')
container.id = 'group-0'
api.registerGroup(container.id, { saveLast: true })

// ...Register all the elements considering element-0-0 as the first element
// ...Navigate to element-0-1 

api.getGroupConfig('group-0').lastElement === 'element-0-1' // true

api.resetGroupState('group-0')

api.getGroupConfig('group-0').lastElement === undefined // true
```

### registerElement

Register an element to be able to navigate to it. The element must be inside a group.

```typescript
const api = getArrowNavigation()

const element = document.createElement('button')

// Is important to keep a unique id for each element
element.id = 'element-0-0'

api.registerElement(element.id, 'group-1')
```

You can also pass a options object as the third parameter to customize the navigation behavior.

```typescript
const api = getArrowNavigation()

const element = document.createElement('button')

// Is important to keep a unique id for each element
element.id = 'element-0-0'

api.registerElement(element.id, 'group-1', {
  nextByDirection: { // This will set the next element manually
    'down': 'element-0-1', // The next element when the user press the down arrow key
    'right': { id: 'group-1', kind: 'group' }, // The next group when the user press the right arrow key
    'up': null, // If press up, no elements will be focused
    'left': undefined // undefined will keep the default behavior
  },
  order: 0, // The order of the element. No default value. This is needed when the group is setted to navigate byOrder. If no setted, byOrder will be ignored.
  onFocus: ({ current, prev, direction }) => console.log(`focused ${current.id}`), // Callback when the element is focused. The prev element is the element that was focused before the current element.
  onBlur: ({ current, next, direction }) => console.log(`blurred ${current.id}`) // Callback when the element is blurred. The next element is the element that will be focused when the focus leave the current element.
})
```

### updateElement

Update a registered element. This is useful when you need to update the element options.

```typescript
api.updateElement(element.id, {
  nextByDirection: { // This will set the next element manually
    'down': 'element-0-1', // The next element when the user press the down arrow key
    'right': { id: 'group-1', kind: 'group' }, // The next group when the user press the right arrow key
    'up': null, // If press up, no elements will be focused
    'left': undefined // undefined will keep the default behavior
  },
  order: 0, // The order of the element. No default value. This is needed when the group is setted to navigate byOrder. If no setted, byOrder will be ignored.
  onFocus: ({ current, prev, direction }) => console.log(`focused ${current.id}`), // Callback when the element is focused. The prev element is the element that was focused before the current element.
  onBlur: ({ current, next, direction }) => console.log(`blurred ${current.id}`) // Callback when the element is blurred. The next element is the element that will be focused when the focus leave the current element.
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

api.registerGroup(container.id)
api.registerElement(element.id, 'group-0')

api.unregisterElement(element.id)
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

api.registerGroup(container.id)
api.registerElement(element.id, 'group-0')

const focusedElement = api.getFocusedElement()
```

### setFocusElement

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

api.registerGroup(container.id)
api.registerElement(element.id, container.id)
api.registerElement(element2.id, container.id)

api.setFocusElement('element-0-1')

document.activeElement.id === element2.id // true
```

### setInitialFocusElement

Set the initial focus element. This will be the element focused when the elements has been registered.

```typescript
const api = getArrowNavigation()

//... Register all the elements

api.setInitialFocusElement('element-0-1')

// Wait for 500ms to be sure that the focus has been setted

document.activeElement.id === 'element-0-1' // true
```

### destroy

Destroy the module. This will remove the event listeners from the document and remove the navigation state from the singleton instance.

```typescript
const api = getArrowNavigation()

api.destroy()
```

### getCurrentGroups

Get the current groups ids (focusables).

```typescript
const api = getArrowNavigation()

const container = document.createElement('div')
const container2 = document.createElement('div')

// Is important to keep a unique id for each group and his elements
container.id = 'group-0'
container2.id = 'group-1'

api.registerGroup(container.id)
api.registerGroup(container2.id)

const currentGroups = api.getCurrentGroups() // Set { 'group-0', 'group-1' }
```

### getGroupElements

Get a Set of elements ids of a group.

```typescript
const api = getArrowNavigation()

const container = document.createElement('div')
const element = document.createElement('button')
const element2 = document.createElement('button')

// Is important to keep a unique id for each group and his elements
container.id = 'group-0'
element.id = 'element-0-0'
element2.id = 'element-0-1'

api.registerGroup(container.id)
api.registerElement(element.id, container.id)
api.registerElement(element2.id, container.id)

const groupElements = api.getGroupElements('group-0') // Set { 'element-0-0', 'element-0-1' }
```

### getGroupConfig

Get the configuration of a group.

```typescript
const api = getArrowNavigation()

const container = document.createElement('div')

// Is important to keep a unique id for each group and his elements
container.id = 'group-0'

api.registerGroup(container.id)

const groupConfig = api.getGroupConfig('group-0') // { viewportSafe: true, threshold: 0, keepFocus: false }
```

### getRegisteredElements

Get a Set with all registered elements ids.

```typescript
const api = getArrowNavigation()

const container = document.createElement('div')
const element = document.createElement('button')
const element2 = document.createElement('button')

// Is important to keep a unique id for each group and his elements

container.id = 'group-0'
element.id = 'element-0-0'
element2.id = 'element-0-1'

api.registerGroup(container.id)
api.registerElement(element.id, 'group-0')
api.registerElement(element2.id, 'group-0')

const registeredElements = api.getRegisteredElements() // Set { 'element-0-0', 'element-0-1' }
```

### getNextElement

Get the next best candidate element id by direction. You can pass an optional boolean option called inGroup to specify if the element should be in the same group or not. You can pass an optional elementId to specify the element where the navigation should be considered.

```typescript
const api = getArrowNavigation()

const container = document.createElement('div')
const element = document.createElement('button')
const element2 = document.createElement('button')

// Is important to keep a unique id for each group and his elements

container.id = 'group-0'
element.id = 'element-0-0'
element2.id = 'element-0-1'

api.registerGroup(container.id)
api.registerElement(element, container.id)
api.registerElement(element2, container.id)

const registeredElements = api.getNextElement({ direction: 'right', inGroup: true }) // 'element-0-1'
// or
const registeredElements = api.getNextElement({ elementId: 'element-0-0', direction: 'right', inGroup: false }) // 'element-0-1'
```

### getNextGroup

Get the next best candidate group id by direction. You can pass an optional elementId to specify the element where the navigation should be considered.

```typescript

const api = getArrowNavigation()

const container = document.createElement('div')
const container2 = document.createElement('div')
const element = document.createElement('button')
const element2 = document.createElement('button')
const element3 = document.createElement('button')
const element4 = document.createElement('button')

// Is important to keep a unique id for each group and his elements

container.id = 'group-0'
element.id = 'element-0-0'
element2.id = 'element-0-1'
container2.id = 'group-1'
element3.id = 'element-1-0'
element4.id = 'element-1-1'

api.registerGroup(container.id)
api.registerGroup(container2.id)
api.registerElement(element.id, container.id)
api.registerElement(element2.id, container.id)
api.registerElement(element3.id, container2.id)
api.registerElement(element4.id, container2.id)

const nextGroup = api.getNextGroup({ direction: 'down' }) // 'group-1'
// or
const nextGroup = api.getNextGroup({ groupId: 'group-0', direction: 'down' }) // 'group-1'
```

### handleDirectionPress

Handle the arrow key press. This is useful if you want to handle the arrow key press manually or React Native. The first parameter is the direction and the second parameter is a boolean to specify is a repeated key press, for example, when the user keep the key pressed. The default value is false.

```typescript
const api = getArrowNavigation()

const container = document.createElement('div')
const element = document.createElement('button')
const element2 = document.createElement('button')

// Is important to keep a unique id for each group and his elements

container.id = 'group-0'
element.id = 'element-0-0'
element2.id = 'element-0-1'

api.registerGroup(container.id)
api.registerElement(element.id, container.id)
api.registerElement(element2.id, container.id)

api.handleDirectionPress('right', false)
```

## Events

The API implements an Event Emitter to listen to events. The events are accessible through the `on` and `off` methods. All the events can be accesed through the `ArrowNavigationEvents` enum.

### current-element:change

This event is triggered when the current element is changed. The event will receive the new element as first parameter and direction as second parameter.

### current-group:change

This event is triggered when the current group is changed. The event will receive the new group as first parameter and direction as second parameter.

### element:focus

This event is triggered when an element is focused. The event will receive `({ current, direction, prev })`.

### element:blur

This event is triggered when an element is blurred. The event will receive `({ current, direction, next })`.

### group:focus

This event is triggered when a group is focused. The event will receive `({ current, direction, prev })`.

### group:blur

This event is triggered when a group is blurred. The event will receive `({ current, direction, next })`.

### groups:change

This event is triggered when the groups are changed. The event will receive the groups as a parameter.

### elements:change

This event is triggered when the elements are changed. The event will receive the elements as a parameter.

### groups-config:change

This event is triggered when the groups configuration is changed. The event will receive the groups configuration as a parameter.

### elements:register-end

This event is triggered when the elements are registered. The event will not receive any parameter.

# Using with CDN

You can use the module with a CDN. The module is available in the following URL:

`https://cdn.jsdelivr.net/npm/@arrow-navigation/core@<version>/dist/dist.js`

```html
<script src="https://cdn.jsdelivr.net/npm/@arrow-navigation/core/dist/dist.js"></script>
<script>
  window.arrowNavigation.init()

  const arrowNavigationApi = window.arrowNavigation.get()

  // Now you can use the arrowNavigationApi
  // ...
</script>
```

# Using with React Native

You can use the module with React Native (Experimental). You need to create an adapter to use the module in React Native. The adapter is a simple object with the following methods:

```typescript
type Adapter = {
  type: 'web' | 'react-native'
  getNodeRect: (focusable: FocusableElement | FocusableGroupConfig) => Rect
  isNodeDisabled: (focusable: FocusableElement) => boolean
  focusNode: (focusable: FocusableElement, opts?: FocusNodeOptions) => void
  isNodeFocusable: (focusable: FocusableElement) => boolean
  getNodeRef: (focusable: Focusable) => unknown // TextInput / View / TouchableOpacity / TouchableHighlight
}
```

You can use the `handleDirectionPress` method on API with TVHandler from React Native to handle the arrow key press manually. We will release a React Native package soon.

# Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Keep the coverage at +95% and run `yarn test` before commit.

# License

[MIT](https://choosealicense.com/licenses/mit/)
