import React from "react";
import DockItem from "./dock-item";
import DockBackground from "./dock-background";

export default function(props) {
  React.Children.forEach(props.children, item => {
    if (item.type !== DockItem) throw new Error("Invalid child type.");
  });

  let style = Object.assign({
    display: "grid",
    gridTemplateColumns: props.itemWidths.map(() => "auto").join(" "),
    position: "relative",
  }, (() => {
    switch (props.magnifyDirection) {
      case "up": return { alignItems: "end", };
      case "down": return { alignItems: "start", };
      case "center": return { alignItems: "center", };
    }
  })());

  return (
    <div style={style}>
      {React.Children.map(props.children, (item, index) => (
        React.cloneElement(item, { width: props.itemWidths[index], debug: props.debug, })
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
