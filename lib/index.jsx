import React from "react";
import ReactDOM from "react-dom";
import Dock from "./dock";
import DockItem from "./dock-item";
import DockOffset from "./dock-offset";

export default class extends React.Component {
  static Item = DockItem;

  state = { magnifierX: null };
  
  render() {
    let offsetLeft = this.state.magnifierX === null ? this.unmagnifiedDockOffsetLeft : this.magnifiedDockOffsetLeft;
    let offsetRight = this.state.magnifierX === null ? this.unmagnifiedDockOffsetRight : this.magnifiedDockOffsetRight;
    let itemWidths = this.state.magnifierX === null ? this.unmagnifiedDockItemWidths : this.magnifiedDockItemWidths;

    return (
      <div className={this.props.className} onMouseMove={::this.onMagnify} onMouseLeave={::this.onUnmagnify} style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto",
      }}>
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

  onMagnify(event) {
    let element = ReactDOM.findDOMNode(this);
    let magnifierX = event.pageX - element.offsetLeft - this.unmagnifiedDockOffsetLeft;

    if (magnifierX >= 0 && magnifierX < this.unmagnifiedDockWidth) {
      this.setState({ magnifierX });
    } else {
      this.onUnmagnify(); // The mouse isn't over the dock; don't bother recording its coordinates.
    }
  }

  onUnmagnify() {
    this.setState({ magnifierX: null });
  }

  computeDockItemWidths(magnifierX = null) {
    return React.Children.map(this.props.children, (item, index) => {
      if (magnifierX === null) return this.unmagnifiedDockItemWidth;

      let itemCenter = this.computeDockWidth(this.unmagnifiedDockItemWidths.slice(0, index)) + (this.unmagnifiedDockItemWidth / 2);
      let distance = Math.abs(magnifierX - itemCenter);
      let distancePercent = Math.max(1 - (distance / this.magnifierRadius), 0);
      return this.unmagnifiedDockItemWidth + (this.unmagnifiedDockItemWidth * distancePercent * this.magnification);
    });
  }

  computeDockWidth(itemWidths = []) {
    return itemWidths.reduce((sum, itemWidth) => sum + itemWidth, 0);
  }

  get unmagnifiedDockItemWidth() {
    return this.props.width / React.Children.count(this.props.children);
  }

  get unmagnifiedDockItemWidths() {
    return this.computeDockItemWidths();
  }

  get unmagnifiedDockWidth() {
    return this.computeDockWidth(this.unmagnifiedDockItemWidths);
  }

  get unmagnifiedDockOffset() {
    return Math.abs(this.unmagnifiedDockWidth - this.maxMagnifiedDockWidth);
  }

  get unmagnifiedDockOffsetLeft() {
    return this.unmagnifiedDockOffset / 2;
  }

  get unmagnifiedDockOffsetRight() {
    return this.unmagnifiedDockOffsetLeft;
  }

  get magnifiedDockItemWidths() {
    return this.computeDockItemWidths(this.state.magnifierX);
  }

  get magnifiedDockWidth() {
    return this.computeDockWidth(this.magnifiedDockItemWidths);
  }

  get magnifiedDockOffset() {
    return Math.abs(this.magnifiedDockWidth - this.maxMagnifiedDockWidth);
  }

  get magnifiedDockOffsetLeft() {
    return this.state.magnifierX < this.unmagnifiedDockWidth / 2 ? this.magnifiedDockOffset : 0;
  }

  get magnifiedDockOffsetRight() {
    return this.state.magnifierX >= this.unmagnifiedDockWidth / 2 ? this.magnifiedDockOffset : 0;
  }

  get maxMagnifiedDockWidth() {
    // The dock's width will be maximum when the mouse is magnifying the center of it.
    return this.computeDockWidth(this.computeDockItemWidths(this.unmagnifiedDockWidth / 2));
  }

  get magnifierRadius() {
    return this.unmagnifiedDockItemWidth * 3;
  }

  get magnification() {
    let { magnification } = this.props;

    if (magnification == undefined || isNaN(magnification) || magnification < 0) {
      throw new Error("Invalid magnification.");
    }

    return magnification;
  }

  get magnifyDirection() {
    let { magnifyDirection } = this.props;

    if (!["up", "down", "center"].includes(magnifyDirection)) {
      throw new Error("Invalid magnify direction.");
    }

    return magnifyDirection;
  }
}
