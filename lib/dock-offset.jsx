import React from "react";

export default function(props) {
  let style = Object.assign({
    width: `${props.width}px`,
    height: `${props.height}px`,
    background: "red",
    opacity: props.debug ? 0.5 : 0,
  }, (() => {
    switch (props.magnifyDirection) {
      case "up": return { alignSelf: "end", };
      case "down": return { alignSelf: "start", };
      case "center": return { alignSelf: "center", };
    }
  })());

  return <div style={style} />;
}
