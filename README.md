# Arrow Navigation

This is a simple module that adds keyboard arrow navigation to the user interface, built in TypeScript.

## Installation

```bash
npm install --save @borisbelmar/arrow-navigation

# or

yarn add @borisbelmar/arrow-navigation
```

For the moment, the module is not available in the browser. You need to use a bundler like Webpack or Rollup to use it.

## Usage

First, you need to initialize the module. It returns an API object that you can use to register and unregister elements, set the focus, etc.

```js
import { initArrowNavigation } from '@borisbelmar/arrow-navigation';

const arrowNavigationApi = initArrowNavigation();

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  arrowNavigationApi.registerElement(button);
});
```

If you need to use the api in another module, you can use *getArrowNavigationInstance()*.

```js
import { getArrowNavigationInstance } from '@borisbelmar/arrow-navigation';

const arrowNavigationApi = getArrowNavigationInstance();

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  arrowNavigationApi.registerElement(button);
});
```

## API

### initArrowNavigation()

Initializes the arrow navigation module. Returns an API object. Call it a single time in your application, because its manage a singleton object as state container. If you need the api in another module, just use *getArrowNavigationInstance()*

### getArrowNavigationInstance()

Returns the arrow navigation api. Useful if you need to use the api in another module. You don't need to call *initArrowNavigation()* again.

### registerElement(element)

Registers an element to the arrow navigation module. The element must be focusable. It can be a button, a link, an input, a textarea, etc.

### unregisterElement(element)

Unregisters an element from the arrow navigation module.

### setFocus(element)

Sets the focus to the given element.

### destroy()

Destroys the arrow navigation module. It removes all the event listeners and clears the state container. You can call *initArrowNavigation()* again to initialize the module.
