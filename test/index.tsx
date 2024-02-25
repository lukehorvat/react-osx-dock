import React from 'react';
import ReactDOM from 'react-dom/client';
import { Dock } from '../lib';

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
      <div
        key={letter}
        className="dock-item"
        onClick={() => console.log(letter)}
      >
        <span>{letter}</span>
      </div>
    ))}
  </Dock>
);
