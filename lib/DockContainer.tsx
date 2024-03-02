import React from 'react';
import { Dock } from './Dock';
import { DockOffset } from './DockOffset';
import { MagnifyDirection } from './MagnifyDirection';

export function DockContainer(props: {
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
    const x = event.clientX - boundingBox.left - unmagnifiedDockOffsetLeft;
    if (x >= 0 && x < unmagnifiedDockWidth) {
      setMagnifierX(x);
    } else {
      onUnmagnify(); // The mouse isn't over the dock; don't bother recording its coordinates.
    }
  };
  const onUnmagnify = () => {
    setMagnifierX(null);
  };
  const computeDockItemWidths = (x: number | null = null): number[] => {
    return React.Children.map(props.children, (item, index) => {
      if (x === null) return unmagnifiedDockItemWidth;

      const itemCenter =
        sum(unmagnifiedDockItemWidths.slice(0, index)) +
        unmagnifiedDockItemWidth / 2;
      const distance = Math.abs(x - itemCenter);
      const distancePercent = Math.max(1 - distance / magnifierRadius, 0);
      return (
        unmagnifiedDockItemWidth +
        unmagnifiedDockItemWidth * distancePercent * props.magnification
      );
    })!;
  };
  const unmagnifiedDockItemWidth =
    props.width / React.Children.count(props.children);
  const magnifierRadius = unmagnifiedDockItemWidth * 3;
  const unmagnifiedDockItemWidths = computeDockItemWidths();
  const magnifiedDockItemWidths = computeDockItemWidths(magnifierX);
  const itemWidths =
    magnifierX === null ? unmagnifiedDockItemWidths : magnifiedDockItemWidths;
  const unmagnifiedDockWidth = sum(unmagnifiedDockItemWidths);
  const magnifiedDockWidth = sum(magnifiedDockItemWidths);
  const maxMagnifiedDockWidth =
    // The dock's width will be maximum when the mouse is magnifying the center of it.
    sum(computeDockItemWidths(unmagnifiedDockWidth / 2));
  const unmagnifiedDockOffset = Math.abs(
    unmagnifiedDockWidth - maxMagnifiedDockWidth
  );
  const unmagnifiedDockOffsetLeft = unmagnifiedDockOffset / 2;
  const unmagnifiedDockOffsetRight = unmagnifiedDockOffsetLeft;
  const magnifiedDockOffset = Math.abs(
    magnifiedDockWidth - maxMagnifiedDockWidth
  );
  const magnifiedDockOffsetLeft =
    magnifierX! < unmagnifiedDockWidth / 2 ? magnifiedDockOffset : 0;
  const magnifiedDockOffsetRight =
    magnifierX! >= unmagnifiedDockWidth / 2 ? magnifiedDockOffset : 0;
  const offsetLeft =
    magnifierX === null ? unmagnifiedDockOffsetLeft : magnifiedDockOffsetLeft;
  const offsetRight =
    magnifierX === null ? unmagnifiedDockOffsetRight : magnifiedDockOffsetRight;

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
      <Dock
        backgroundClassName={props.backgroundClassName}
        itemWidths={itemWidths}
        height={unmagnifiedDockItemWidth}
        magnifyDirection={props.magnifyDirection}
        debug={props.debug}
      >
        {props.children}
      </Dock>
      <DockOffset
        width={offsetRight}
        height={unmagnifiedDockItemWidth}
        magnifyDirection={props.magnifyDirection}
        debug={props.debug}
      />
    </div>
  );
}

function sum(values: number[]): number {
  return values.reduce((result, value) => result + value, 0);
}
