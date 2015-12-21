# React UI Dropdown

> Now the component is already can be used, but I'm still working on it, and on examples and documentation.
> If you have any question, please, [create issue](https://github.com/Zmoki/react-ui-dropdown/issues).

[![Build Status](https://travis-ci.org/Zmoki/react-ui-dropdown.svg)](https://travis-ci.org/Zmoki/react-ui-dropdown)

## Demo
[View demo](https://react-ui-dropdown.herokuapp.com/)

## Install
```
$ npm install react-ui-dropdown
```

## Example
[Simple example](/examples/simple)
```js
import React from "react";
import ReactDOM from "react-dom";
import ReactUIDropdown from "react-ui-dropdown";

const data = [
  {
    id: 100,
    title: "Centaur",
    image: "https://d30y9cdsu7xlg0.cloudfront.net/png/120146-200.png"
  },
  ...
];

const handleDropdownChange = (selectedItems) => {
  console.log(selectedItems);
};

ReactDOM.render(
  <div>
    <ReactUIDropdown
      label="Myth animals"
      initialItems={data}
      onChange={handleDropdownChange}/>
  </div>,
  document.getElementById("root")
);
```

## Options

**initialItems** - (reqired) array of object like with follow fields:
````js
{
  id: 2,
  title: "My title",
  subtitle: "My subtitle",
  image: FULL_LINK_TO_IMAGE
}
````
Subtitle and image are optional.


**remoteSearch** - tool for remote search, object with follow fields:
````js
{url: "/some-url", fields: "some_field"}
````
fields can be string or array.

**maxDisplayedItems** - max items, which show in dropdown. Default 10.

**label** - (required) text for label.

**placeholder** - text for input placeholder

**showImages** - show or not images in dropdown. Default true.

**multiple** - choose few items or just one. Default true.

**onChange** - function, which handle changing list of selected items.

## License
MIT
