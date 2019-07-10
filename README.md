<p align="center">
  <img src="https://github.com/furmly/furmly-studio/blob/master/logo-grey.png" width="135" align="center">
  <br>
  <br>
</p>

# Furmly Web Base

## Simple implementation of furmly components using react & styled-components.



[ @Demo ](https://chidionuekwusi.github.io/furmly-base-web)

This is a simple themeable library that implements the visual components required by [ Furmly-client ](https://www.github.com/chidionuekwusi/furmly-client).

### **Installation**

`npm install furmly-base-web`

Don't forget to include font files at **`"furmly-base-web/dist/Lato-Light.ttf" & "furmly-base-web/dist/Roboto-Thin.ttf`**

### **Usage**

```javascript
import configure from "furmly-base-web";
import RotateTextComponent from "./Rotate";

/*
    map is basically a key value pairing of component ELEMENTTYPE to react component.

    defaultMap is the raw key value map to furmly client components.
    
*/
const componentMap = configure({
  extend: (map, defaultMap) => {
    map.CUSTOM_COMPONENT = props => {
      return <div>{"This is a custom component"}</div>; // This is how to define a custom component. They are matched by uid.
    };
    return map.cook(); // make sure you return a cooked map.
  },
  providerConfig: [], //
  interceptor: (context, map, defaultMap) => {
    /*
    This function is an interceptor. Furmly-client will call this interceptor everytime it requires a component definition.
    */
    if (context.elementType == "INPUT" && context.uid == "rotate_text")
      return RotateTextComponent;
  }
});
```

Provider

Provider is the main entry point into rendering UI.Once a **`componentMap`** has been cooked you can directly access the provider **`const { PROVIDER } = componentMap`**

```javascript
import React from "react"

//...construct componentMap earlier

const { PROVIDER } = componentMap;
export default (props)=> {
    return <PROVIDER id={props.process_id}>;
}
```

Themes

Styled components theme provider is used to provide themeing to base components.

```javascript
import { ThemeProvider } from "furmly-base-web";
const theme = {
  foreColor: "red",
  labelBackgroundColor: "black",
  labelColor: "white"
};

export default props => {
  return <ThemeProvider theme={theme}>{components}</ThemeProvider>;
};
```

---

### **To do**

- Create better documentation in demo web site
- Create better documentation for themes.
- Implement more components
