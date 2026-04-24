import React, { useLayoutEffect } from "react";

const Spin_loader = ({
  width = 10,
  height = 10,
  color = "black",
  border = 2,
}: {
  width?: number;
  height?: number;
  color?: string;
  border?: number;
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderWidth: border,
        borderColor: `${color} ${color} transparent ${color}`,
      }}
      className="rounded-full border-solid animate-spin"
    ></div>
  );
};

export default Spin_loader;
