import React from 'react';
import { MagnifyDirection } from './MagnifyDirection';

export function DockBackground(props: {
  height: number;
  magnifyDirection: MagnifyDirection;
  className?: string;
  debug?: boolean;
}): React.JSX.Element {
  const style: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: `${props.height}px`,
    boxSizing: 'border-box',
    border: props.debug ? '1px solid red' : undefined,
    zIndex: 0,
    ...(() => {
      switch (props.magnifyDirection) {
        case 'up':
          return { bottom: 0 };
        case 'down':
          return { top: 0 };
        case 'center':
          return { top: '50%', transform: 'translateY(-50%)' };
      }
    })(),
  };

  return <div className={props.className} style={style} />;
}
