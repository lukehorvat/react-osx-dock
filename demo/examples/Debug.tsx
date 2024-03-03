import React from 'react';
import { Dock } from '../../lib';
import './Debug.css';

export function DebugExample() {
  return (
    <Dock
      className="dock"
      backgroundClassName="dock-background"
      itemWidth={50}
      magnification={1}
      magnifyDirection="up"
      debug={true}
    >
      {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((letter) => (
        <div
          key={letter}
          className="dock-item"
          onClick={() => console.log(letter)}
        >
          <span className="letter">{letter}</span>
        </div>
      ))}
    </Dock>
  );
}
