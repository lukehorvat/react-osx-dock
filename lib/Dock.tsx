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
}): React.JSX.Element {
  const [magnifierX, setMagnifierX] = React.useState<number | null>(null);
  const unmagnifiedItemWidth =
    props.width / React.Children.count(props.children);
  const unmagnifiedDockWidth =
    unmagnifiedItemWidth * React.Children.count(props.children);
  const magnifierRadius =
    // The magnifier's "area of effect" in a particular direction.
    unmagnifiedItemWidth * 3;
  const maxOffsetWidth = magnifierRadius * props.magnification;
  const maxDockWidth = unmagnifiedDockWidth + maxOffsetWidth;
  const itemWidths = React.Children.map(props.children, (child, index) => {
    if (magnifierX === null) return unmagnifiedItemWidth;
    const itemCenter = unmagnifiedItemWidth * index + unmagnifiedItemWidth / 2;
    const distanceFromItemCenter = Math.abs(magnifierX - itemCenter);
    const magnifierStrength =
      // An item is most magnified when the magnifier is positioned over its center.
      Math.max(1 - distanceFromItemCenter / magnifierRadius, 0);
    return unmagnifiedItemWidth * (1 + magnifierStrength * props.magnification);
  })!;
  const dockWidth = itemWidths.reduce((sum, itemWidth) => sum + itemWidth, 0);
  const offsetWidth = Math.abs(maxDockWidth - dockWidth);

  // FIXME: This approach of applying the offset to only one side of the dock and
  // forcing the other side's offset to be zero is... bad. When the dock has less
  // than 5 items it simply won't work properly. Instead we should calculate an
  // independent offset for each side based on dock width and mouse position.
  const leftOffsetWidth =
    magnifierX === null
      ? maxOffsetWidth / 2
      : magnifierX < unmagnifiedDockWidth / 2
      ? offsetWidth
      : 0;
  const rightOffsetWidth =
    magnifierX === null
      ? maxOffsetWidth / 2
      : magnifierX >= unmagnifiedDockWidth / 2
      ? offsetWidth
      : 0;

  const onMagnify: React.MouseEventHandler = (event) => {
    const boundingBox = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - boundingBox.left - maxOffsetWidth / 2;
    if (x >= 0 && x < unmagnifiedDockWidth) {
      setMagnifierX(x);
    } else {
      onUnmagnify(); // The mouse isn't over any dock items.
    }
  };
  const onUnmagnify = () => {
    setMagnifierX(null);
  };

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
        width={leftOffsetWidth}
        height={unmagnifiedItemWidth}
        magnifyDirection={props.magnifyDirection}
        debug={props.debug}
      />
      <DockItemsContainer
        backgroundClassName={props.backgroundClassName}
        itemWidths={itemWidths}
        height={unmagnifiedItemWidth}
        magnifyDirection={props.magnifyDirection}
        debug={props.debug}
      >
        {props.children}
      </DockItemsContainer>
      <DockOffset
        width={rightOffsetWidth}
        height={unmagnifiedItemWidth}
        magnifyDirection={props.magnifyDirection}
        debug={props.debug}
      />
    </div>
  );
}
