import React from 'react';
import ReactDOM from 'react-dom/client';
import { Dock, DockItem } from '../';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Dock
    className="dock"
    backgroundClassName="dock-background"
    width={Math.min(400, window.innerWidth * 0.5)}
    magnification={1}
    magnifyDirection="up"
    debug
  >
    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((letter) => (
      <DockItem
        key={letter}
        width={0} // TODO: Should not need to specify this.
        className="dock-item"
        onClick={() => console.log(letter)}
      >
        <span>{letter}</span>
      </DockItem>
    ))}
  </Dock>
);
