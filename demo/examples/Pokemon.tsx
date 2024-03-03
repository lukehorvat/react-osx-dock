import React from 'react';
import { Dock } from '../../lib';
import './Pokemon.css';

export function PokemonExample() {
  const pokemon = [
    'pikachu',
    'charmander',
    'squirtle',
    'bulbasaur',
    'snorlax',
    'psyduck',
    'eevee',
    'meowth',
  ];

  return (
    <Dock
      className="dock"
      backgroundClassName="dock-background"
      itemWidth={60}
      magnification={0.9}
      magnifyDirection="center"
      debug={false}
    >
      {pokemon.map((pokemon, index) => (
        <div key={index} className="dock-item">
          <img src={`images/pokemon/${pokemon}.png`} />
        </div>
      ))}
    </Dock>
  );
}
