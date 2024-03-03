import React from 'react';
import ReactDOM from 'react-dom/client';
import { OsxExample } from './examples/Osx';
import { SocialExample } from './examples/Social';
import { PokemonExample } from './examples/Pokemon';
import { DebugExample } from './examples/Debug';
import './index.css';

const examples = {
  osx: OsxExample,
  social: SocialExample,
  pokemon: PokemonExample,
  debug: DebugExample,
};
type ExampleType = keyof typeof examples;

export function App() {
  const [example, setExample] = React.useState<ExampleType>(
    process.env.NODE_ENV === 'production' ? 'osx' : 'debug'
  );
  const ExampleComponent = examples[example];

  return (
    <div className={`app ${example}-example`}>
      <div className="example-selector">
        <div className="header">Examples:</div>
        <ul>
          {(Object.keys(examples) as ExampleType[]).map((type) => (
            <li key={type}>
              <a
                href="#"
                className={example === type ? 'selected' : undefined}
                onClick={() => setExample(type)}
              >
                {type}
              </a>
            </li>
          ))}
        </ul>
        <a href="https://github.com/lukehorvat/react-osx-dock" className="fork">
          View on GitHub
        </a>
      </div>
      <ExampleComponent />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
