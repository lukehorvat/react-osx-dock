import React from 'react';
import { Dock } from '../../lib';
import './Osx.css';

export function OsxExample() {
  const apps = [
    'finder',
    'settings',
    'app-store',
    'preview',
    'terminal',
    'atom',
    'slack',
    'chrome',
    'spotify',
    'guitar-pro',
    'steam',
    'trash',
  ];
  const [activatedApps, setActivatedApps] = React.useState(
    () => new Set(apps.filter(() => Math.random() > 0.5))
  );
  const toggleAppActivation = (app: string) => {
    if (activatedApps.has(app)) {
      activatedApps.delete(app);
    } else {
      activatedApps.add(app);
    }
    setActivatedApps(new Set(activatedApps));
  };

  return (
    <Dock
      className="dock"
      backgroundClassName="dock-background"
      itemWidth={50}
      magnification={0.8}
      magnifyDirection="up"
      debug={false}
    >
      {apps.map((app, index) => (
        <div
          key={index}
          className="dock-item"
          onClick={() => toggleAppActivation(app)}
        >
          <img src={`images/osx/${app}.png`} />
          <span
            className="active-indicator"
            style={{
              opacity: activatedApps.has(app) ? 1 : 0,
            }}
          />
        </div>
      ))}
    </Dock>
  );
}
