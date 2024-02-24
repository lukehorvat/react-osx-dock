import React from 'react';
import { MagnifyDirection } from './MagnifyDirection';

export function DockOffset(props: {
  width: number;
  height: number;
  magnifyDirection: MagnifyDirection;
  debug?: boolean;
}): React.JSX.Element {
  const style: React.CSSProperties = {
    width: `${props.width}px`,
    height: `${props.height}px`,
    background: 'red',
    opacity: props.debug ? 0.5 : 0,
    ...(() => {
      switch (props.magnifyDirection) {
        case 'up':
          return { alignSelf: 'end' };
        case 'down':
          return { alignSelf: 'start' };
        case 'center':
          return { alignSelf: 'center' };
      }
    })(),
  };

  return <div style={style} />;
}
