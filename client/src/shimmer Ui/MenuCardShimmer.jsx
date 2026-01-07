import React from "react";

const MenuCardShimmer = () => {
  return (
    <div className="shimmer-card">
      <div className="shimmer-img shimmer"></div>

      <div className="shimmer-content">
        <div className="shimmer-title shimmer"></div>
        <div className="shimmer-line shimmer"></div>
        <div className="shimmer-line shimmer"></div>
        <div className="shimmer-line small shimmer"></div>

        <div className="shimmer-price shimmer"></div>
      </div>
    </div>
  );
};

export default MenuCardShimmer;
