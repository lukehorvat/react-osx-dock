import React from 'react';
import ReactDOM from 'react-dom';
import { Dock } from './Dock';
import { DockOffset } from './DockOffset';
import { MagnifyDirection } from './MagnifyDirection';

export class DockContainer extends React.Component<
  {
    width: number;
    magnification: number;
    magnifyDirection: MagnifyDirection;
    className?: string;
    backgroundClassName?: string;
    debug?: boolean;
    children?: React.ReactNode;
  },
  { magnifierX: number | null }
> {
  state = { magnifierX: null };

  render() {
    const offsetLeft =
      this.state.magnifierX === null
        ? this.unmagnifiedDockOffsetLeft
        : this.magnifiedDockOffsetLeft;
    const offsetRight =
      this.state.magnifierX === null
        ? this.unmagnifiedDockOffsetRight
        : this.magnifiedDockOffsetRight;
    const itemWidths =
      this.state.magnifierX === null
        ? this.unmagnifiedDockItemWidths
        : this.magnifiedDockItemWidths;

    return (
      <div
        className={this.props.className}
        onMouseMove={this.onMagnify.bind(this)}
        onMouseLeave={this.onUnmagnify.bind(this)}
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto',
        }}
      >
        <DockOffset
          width={offsetLeft}
          height={this.unmagnifiedDockItemWidth}
          magnifyDirection={this.magnifyDirection}
          debug={this.props.debug}
        />
        <Dock
          backgroundClassName={this.props.backgroundClassName}
          itemWidths={itemWidths}
          height={this.unmagnifiedDockItemWidth}
          magnifyDirection={this.magnifyDirection}
          debug={this.props.debug}
        >
          {this.props.children}
        </Dock>
        <DockOffset
          width={offsetRight}
          height={this.unmagnifiedDockItemWidth}
          magnifyDirection={this.magnifyDirection}
          debug={this.props.debug}
        />
      </div>
    );
  }

  private onMagnify(event: React.MouseEvent): void {
    const element = ReactDOM.findDOMNode(this) as HTMLDivElement;
    const magnifierX =
      event.pageX - element.offsetLeft - this.unmagnifiedDockOffsetLeft;

    if (magnifierX >= 0 && magnifierX < this.unmagnifiedDockWidth) {
      this.setState({ magnifierX });
    } else {
      this.onUnmagnify(); // The mouse isn't over the dock; don't bother recording its coordinates.
    }
  }

  private onUnmagnify(): void {
    this.setState({ magnifierX: null });
  }

  private computeDockItemWidths(magnifierX: number | null = null): number[] {
    return React.Children.map(this.props.children, (item, index) => {
      if (magnifierX === null) return this.unmagnifiedDockItemWidth;

      const itemCenter =
        this.computeDockWidth(this.unmagnifiedDockItemWidths.slice(0, index)) +
        this.unmagnifiedDockItemWidth / 2;
      const distance = Math.abs(magnifierX - itemCenter);
      const distancePercent = Math.max(1 - distance / this.magnifierRadius, 0);
      return (
        this.unmagnifiedDockItemWidth +
        this.unmagnifiedDockItemWidth * distancePercent * this.magnification
      );
    })!;
  }

  private computeDockWidth(itemWidths: number[] = []): number {
    return itemWidths.reduce((sum, itemWidth) => sum + itemWidth, 0);
  }

  private get unmagnifiedDockItemWidth(): number {
    return this.props.width / React.Children.count(this.props.children);
  }

  private get unmagnifiedDockItemWidths(): number[] {
    return this.computeDockItemWidths();
  }

  private get unmagnifiedDockWidth(): number {
    return this.computeDockWidth(this.unmagnifiedDockItemWidths);
  }

  private get unmagnifiedDockOffset(): number {
    return Math.abs(this.unmagnifiedDockWidth - this.maxMagnifiedDockWidth);
  }

  private get unmagnifiedDockOffsetLeft(): number {
    return this.unmagnifiedDockOffset / 2;
  }

  private get unmagnifiedDockOffsetRight(): number {
    return this.unmagnifiedDockOffsetLeft;
  }

  private get magnifiedDockItemWidths(): number[] {
    return this.computeDockItemWidths(this.state.magnifierX);
  }

  private get magnifiedDockWidth(): number {
    return this.computeDockWidth(this.magnifiedDockItemWidths);
  }

  private get magnifiedDockOffset(): number {
    return Math.abs(this.magnifiedDockWidth - this.maxMagnifiedDockWidth);
  }

  private get magnifiedDockOffsetLeft(): number {
    return this.state.magnifierX! < this.unmagnifiedDockWidth / 2
      ? this.magnifiedDockOffset
      : 0;
  }

  private get magnifiedDockOffsetRight(): number {
    return this.state.magnifierX! >= this.unmagnifiedDockWidth / 2
      ? this.magnifiedDockOffset
      : 0;
  }

  private get maxMagnifiedDockWidth(): number {
    // The dock's width will be maximum when the mouse is magnifying the center of it.
    return this.computeDockWidth(
      this.computeDockItemWidths(this.unmagnifiedDockWidth / 2)
    );
  }

  private get magnifierRadius(): number {
    return this.unmagnifiedDockItemWidth * 3;
  }

  private get magnification(): number {
    const { magnification } = this.props;

    if (
      magnification == undefined ||
      isNaN(magnification) ||
      magnification < 0
    ) {
      throw new Error('Invalid magnification.');
    }

    return magnification;
  }

  private get magnifyDirection(): MagnifyDirection {
    const { magnifyDirection } = this.props;

    if (!['up', 'down', 'center'].includes(magnifyDirection)) {
      throw new Error('Invalid magnify direction.');
    }

    return magnifyDirection;
  }
}
