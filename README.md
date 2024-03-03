# react-osx-dock [![npm version](https://img.shields.io/npm/v/react-osx-dock.svg?style=flat-square)](https://www.npmjs.com/package/react-osx-dock)

![](https://i.imgur.com/e8Q6ddo.gif)

[React](https://reactjs.org) component that is magnifiable like the Mac OS X dock.

Works in any Web browser that supports CSS [grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) and [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout) layout.

View a demo [here](https://lukehorvat.github.io/react-osx-dock).

## Installation

Install the package with NPM:

```sh
npm install react-osx-dock
```

## Usage

Example:

```jsx
import { Dock } from 'react-osx-dock';

<Dock width={800} magnification={2} magnifyDirection="up">
  {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((letter) => (
    <img
      className="letter"
      src={`${letter}.png`}
      onClick={() => console.log(letter)}
      key={letter}
    />
  ))}
</Dock>
```

## API

The `Dock` component has the following props:

| Name                  | Description                                                         | Type                                                | Required                         |
| --------------------- | ------------------------------------------------------------------- | --------------------------------------------------- | -------------------------------- |
| `width`               | The width of the dock in pixels.                                    | number                                              | yes                              |
| `magnification`       | The level of dock magnification produced on mouse-over.             | number                                              | yes                              |
| `magnifyDirection`    | The vertical direction that dock items grow when magnified.         | string enum <br><br> (`"up"`, `"down"`, `"center"`) | yes                              |
| `className`           | The dock's CSS class.                                               | string                                              | no <br><br> default: `undefined` |
| `backgroundClassName` | The dock background's CSS class.                                    | string                                              | no <br><br> default: `undefined` |
| `debug`               | Whether to render dock bounding boxes or not. Useful for debugging! | boolean                                             | no <br><br> default: `false`     |

Any children provided to the `Dock` component will be considered "dock items" and wrapped accordingly to facilitate the magnification behavior.

## Credits

The demo website uses a couple of free icon packs from [FlatIcon](https://flaticon.com):

- [Social icons](https://flaticon.com/packs/glypho) designed by Bogdan Rosu.
- [Pokémon icons](https://flaticon.com/packs/pokemon-go) designed by Roundicons Freebies.

Thanks!
