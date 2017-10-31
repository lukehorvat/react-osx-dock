import React from "react";

export default function(props) {
  return (
    <div className={props.className} onClick={props.onClick} style={{
      width: `${props.width}px`,
      height: `${props.width}px`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      border: props.debug ? "1px solid red" : null,
      zIndex: 1,
    }}>
      {props.children}
    </div>
  );
}
