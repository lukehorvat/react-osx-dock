import React from 'react';
import { DockItem } from './DockItem';
import { DockBackground } from './DockBackground';
import { MagnifyDirection } from './MagnifyDirection';

export function Dock(props: {
  height: number;
  itemWidths: number[];
  magnifyDirection: MagnifyDirection;
  backgroundClassName?: string;
  debug?: boolean;
  children?: React.ReactNode;
}): React.JSX.Element {
  React.Children.forEach(props.children, (child) => {
    if ((child as React.JSX.Element).type !== DockItem) {
      throw new Error('Invalid child type.');
    }
  });

  const style: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: props.itemWidths.map(() => 'auto').join(' '),
    position: 'relative',
    ...(() => {
      switch (props.magnifyDirection) {
        case 'up':
          return { alignItems: 'end' };
        case 'down':
          return { alignItems: 'start' };
        case 'center':
          return { alignItems: 'center' };
      }
    })(),
  };

  return (
    <div style={style}>
      {React.Children.map(props.children, (child, index) =>
        React.cloneElement<React.ComponentProps<typeof DockItem>>(
          child as React.JSX.Element,
          {
            width: props.itemWidths[index],
            debug: props.debug,
          }
        )
      )}

      <DockBackground
        className={props.backgroundClassName}
        height={props.height}
        magnifyDirection={props.magnifyDirection}
        debug={props.debug}
      />
    </div>
  );
}
