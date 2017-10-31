# react-osx-dock [![NPM version](http://img.shields.io/npm/v/react-osx-dock.svg?style=flat-square)](https://www.npmjs.com/package/react-osx-dock)

<p align="center">
  <img src="https://i.imgur.com/e8Q6ddo.gif">
</p>

[React](https://reactjs.org) component that is magnifiable like the Mac OS X dock.

Works in any Web browser that supports CSS [grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) and [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout) layout.

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

<Dock width={800} magnification={2} magnifyDirection="up">
  {["a", "b", "c", "d", "e"].map((item, index) => (
    <Dock.Item key={index} onClick={() => console.log(item)}>
      <img src={`${item}.png`} />
    </Dock.Item>
  ))}
</Dock>
```

## API

### Dock

React component that accepts [Dock.Item](#dockitem)s as children, and the following props:

Name | Description | Type | Required
---- | ----------- | ---- | --------
`width` | The width of the dock in pixels. | number | yes
`magnification` | The level of dock magnification produced on mouse-over. | number | yes
`magnifyDirection` | The vertical direction that dock items grow when magnified. | string enum <br><br> (`"up"`, `"down"`, `"center"`) | yes
`className` | The dock's CSS class. | string | no <br><br> default: `undefined`
`backgroundClassName` | The dock background's CSS class. | string | no <br><br> default: `undefined`
`debug` | Whether to render dock sub-component bounding boxes or not. Useful for debugging! | boolean | no <br><br> default: `false`

### Dock.Item

React component that accepts any HTML/React elements as children, and the following props:

Name | Description | Type | Required
---- | ----------- | ---- | --------
`className` | The dock item's CSS class. | string | no <br><br> default: `undefined`
`onClick` | The dock item's mouse click event handler. | function | no <br><br> default: `undefined`

## Contributing

Pull requests are most welcome. Clone this repository and run `npm test` to test/debug your code changes.

## Credits

The demo website uses a couple of free icon packs from [FlatIcon](https://flaticon.com):

- [Social icons](https://flaticon.com/packs/glypho) designed by Bogdan Rosu.
- [Pokémon icons](https://flaticon.com/packs/pokemon-go) designed by Roundicons Freebies.

Thanks!
