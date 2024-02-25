import React from 'react';
import { Dock } from '../../lib';
import './Debug.css';

export function DebugExample() {
  return (
    <Dock
      className="dock"
      backgroundClassName="dock-background"
      width={Math.min(800, window.innerWidth * 0.6)}
      magnification={0.8}
      magnifyDirection="up"
      debug={true}
    >
      {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((letter) => (
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
