import React from "react";
import MenuCardShimmer from "./MenuCardShimmer";

const MenuShimmer = ({val}) => {
  return (
    <div className="shimmer-grid">
      {Array(val)
        .fill("")
        .map((_, i) => (
          <MenuCardShimmer key={i} />
        ))}
    </div>
  );
};

export default MenuShimmer;
