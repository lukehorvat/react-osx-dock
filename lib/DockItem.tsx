import React from 'react';

export function DockItem(props: {
  width: number;
  debug?: boolean;
  children?: React.ReactNode;
}): React.JSX.Element {
  return (
    <div
      style={{
        width: `${props.width}px`,
        height: `${props.width}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        border: props.debug ? '1px solid red' : undefined,
        zIndex: 1,
      }}
    >
      {props.children}
    </div>
  );
}
