# webpack-device-loader
Dynamic file bundling for webpack

If you are building code for multiple devices types/os in your codebase then this plugin can help you build and serve the bundles based on the required type.


## Code Usage

Consider a component class where you need to render the device specific components. You would likely create a folder with the following files:
```
|module
| - app.js
| - component.device.js
| - component.tv.js
| - component.watch.js
| - component.web.js
```

A sample App would be something on the lines of:
```
import React from "react";
import Component from "./component.device";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Component />
      </div>
    );
  }
}
```

Based on the passed device types, the following will be the content of the rendered App.
```
//device = web
<div class="app"><div className="device--web">Web!</div></div>

//device = tv
<div class="app"><div className="device--tv">Tv!</div></div>

//device = watch
<div class="app"><div className="device--watch">Watch!</div></div>
```
Check the [examples folder](https://github.com/yashatgit/webpack-device-loader/tree/master/example) for a sample.


## Installation

#### Add `device-loader` in your webpack plugin list

```
const loaders = [
  //...otherLoaders
  {
    test: /\.device.js$/,
    include: path.resolve(__dirname, 'src/components'),
    use: [
      {
        loader: 'device-loader',
        options: {device: [//add the device type here]},
      },
    ],
  },
];
```

#### add into `resolveLoader` 
```
const webpackConfig = {
  //...otherConfigs
  resolveLoader: {
    alias: {
      'device-loader': path.join(__dirname, '/webpack/loaders/device-loader.js'),
    },
  },
};
```
