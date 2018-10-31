# webpack-device-loader
Dynamic file bundling for webpack

If you are building out code for multiple devices/os in your codebase then this plugin can help you build and serve the bundles based on the required type.

Your folder can contain the files for specific types like this:


### Code Usage

Consider a component class where you need to render the device specific components.
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

Based on the passed device types, the following will be the content of the rndered App.

```
//device = web
<div class="app"><div className="device--web">Web!</div></div>

//device = tv
<div class="app"><div className="device--tv">Tv!</div></div>

//device = watch
<div class="app"><div className="device--watch">Watch!</div></div>
```


### Installation

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
