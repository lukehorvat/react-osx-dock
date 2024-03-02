import React from 'react';
import { DockItemsContainer } from './DockItemsContainer';
import { DockOffset } from './DockOffset';
import { MagnifyDirection } from './MagnifyDirection';

export function Dock(props: {
  width: number;
  magnification: number;
  magnifyDirection: MagnifyDirection;
  className?: string;
  backgroundClassName?: string;
  debug?: boolean;
  children?: React.ReactNode;
}) {
  const [magnifierX, setMagnifierX] = React.useState<number | null>(null);
  const onMagnify: React.MouseEventHandler = (event) => {
    const boundingBox = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - boundingBox.left - unmagnifiedDockOffset / 2;
    if (x >= 0 && x < unmagnifiedDockWidth) {
      setMagnifierX(x);
    } else {
      onUnmagnify(); // The mouse isn't over any dock items.
    }
  };
  const onUnmagnify = () => {
    setMagnifierX(null);
  };
  const unmagnifiedDockItemWidth =
    props.width / React.Children.count(props.children);
  const magnifierRadius = unmagnifiedDockItemWidth * 3;
  const unmagnifiedDockOffset = magnifierRadius * props.magnification;
  const unmagnifiedDockWidth =
    unmagnifiedDockItemWidth * React.Children.count(props.children);
  const maxMagnifiedDockWidth = unmagnifiedDockWidth + unmagnifiedDockOffset;
  const itemWidths = React.Children.map(props.children, (child, index) => {
    if (magnifierX === null) return unmagnifiedDockItemWidth;
    const itemCenter =
      unmagnifiedDockItemWidth * index + unmagnifiedDockItemWidth / 2;
    const distanceFromItemCenter = Math.abs(magnifierX - itemCenter);
    const magnifierStrength =
      // An item is most magnified when the magnifier is positioned over its center.
      Math.max(1 - distanceFromItemCenter / magnifierRadius, 0);
    return (
      unmagnifiedDockItemWidth * (1 + magnifierStrength * props.magnification)
    );
  })!;
  const dockWidth = itemWidths.reduce((sum, itemWidth) => sum + itemWidth, 0);
  const dockOffset = Math.abs(maxMagnifiedDockWidth - dockWidth);
  const offsetLeft =
    magnifierX === null
      ? unmagnifiedDockOffset / 2
      : magnifierX < unmagnifiedDockWidth / 2
      ? dockOffset
      : 0;
  const offsetRight =
    magnifierX === null
      ? unmagnifiedDockOffset / 2
      : magnifierX >= unmagnifiedDockWidth / 2
      ? dockOffset
      : 0;

  return (
    <div
      className={props.className}
      onMouseMove={onMagnify}
      onMouseLeave={onUnmagnify}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
      }}
    >
      <DockOffset
        width={offsetLeft}
        height={unmagnifiedDockItemWidth}
        magnifyDirection={props.magnifyDirection}
        debug={props.debug}
      />
      <DockItemsContainer
        backgroundClassName={props.backgroundClassName}
        itemWidths={itemWidths}
        height={unmagnifiedDockItemWidth}
        magnifyDirection={props.magnifyDirection}
        debug={props.debug}
      >
        {props.children}
      </DockItemsContainer>
      <DockOffset
        width={offsetRight}
        height={unmagnifiedDockItemWidth}
        magnifyDirection={props.magnifyDirection}
        debug={props.debug}
      />
    </div>
  );
}
