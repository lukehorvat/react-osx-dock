# react-osx-dock [![NPM version](http://img.shields.io/npm/v/react-osx-dock.svg?style=flat-square)](https://www.npmjs.com/package/react-osx-dock)

Mac OS X dock as a [React](https://reactjs.org) component.

View a demo [here](https://lukehorvat.github.io/react-osx-dock).

## Installation

Install the package with NPM:

```bash
$ npm install react-osx-dock
```

## Usage

Example:

```javascript
import Dock from "react-osx-dock";

<Dock width={800} magnification={2}>
  {["a", "b", "c", "d", "e"].map((item, index) => (
    <Dock.Item key={index} onClick={() => console.log(item)}>
      <img src={`${item}.png`} />
    </Dock.Item>
  ))}
</Dock>
```
