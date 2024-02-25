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
      {React.Children.map(props.children, (child, index) => (
        <DockItem width={props.itemWidths[index]} debug={props.debug}>
          {child}
        </DockItem>
      ))}

      <DockBackground
        className={props.backgroundClassName}
        height={props.height}
        magnifyDirection={props.magnifyDirection}
        debug={props.debug}
      />
    </div>
  );
}
