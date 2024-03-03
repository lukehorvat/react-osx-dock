import React from 'react';
import ReactDOM from 'react-dom/client';
import { OsxExample } from './examples/Osx';
import { SocialExample } from './examples/Social';
import { PokemonExample } from './examples/Pokemon';
import { DebugExample } from './examples/Debug';
import './index.css';

type ExampleType = 'osx' | 'social' | 'pokemon' | 'debug';

export function App() {
  const [example, setExample] = React.useState<ExampleType>(
    process.env.NODE_ENV === 'production' ? 'osx' : 'debug'
  );

  return (
    <div className={`app ${example}-example`}>
      <div className="example-selector">
        <div className="header">Examples:</div>
        <ul>
          <li>
            <a
              href="#"
              className={example === 'osx' ? 'selected' : undefined}
              onClick={() => setExample('osx')}
            >
              OS X
            </a>
          </li>
          <li>
            <a
              href="#"
              className={example === 'social' ? 'selected' : undefined}
              onClick={() => setExample('social')}
            >
              Social
            </a>
          </li>
          <li>
            <a
              href="#"
              className={example === 'pokemon' ? 'selected' : undefined}
              onClick={() => setExample('pokemon')}
            >
              Pokémon
            </a>
          </li>
          <li>
            <a
              href="#"
              className={example === 'debug' ? 'selected' : undefined}
              onClick={() => setExample('debug')}
            >
              Debug
            </a>
          </li>
        </ul>
        <a href="https://github.com/lukehorvat/react-osx-dock" className="fork">
          View on GitHub
        </a>
      </div>

      {example === 'osx' && <OsxExample />}
      {example === 'social' && <SocialExample />}
      {example === 'pokemon' && <PokemonExample />}
      {example === 'debug' && <DebugExample />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
