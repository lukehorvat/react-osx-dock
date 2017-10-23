import React from "react";

const defaultProps = {
  width: "100%",
  height: "100%"
};

export default function(props) {
  const { width, height } = Object.assign({}, defaultProps, props);

  return (
    <div style={{ width, height }}>
    </div>
  );
}
