const OrderShimmer = () => {
  return (
    <div className="orderShimmer">
      {/* Header */}
      <div className="shimmerHeader">
        <div>
          <div className="shimmer shimmerTitle"></div>
          <div className="shimmer shimmerDate"></div>
        </div>
        <div className="shimmer shimmerStatus"></div>
      </div>

      {/* Items */}
      <div className="shimmerItems">
        {[1, 2].map((_, i) => (
          <div className="shimmerItem" key={i}>
            <div className="shimmer shimmerImg"></div>
            <div className="shimmerInfo">
              <div className="shimmer shimmerLine"></div>
              <div className="shimmer shimmerSmall"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="shimmerFooter">
        <div className="shimmer shimmerTotal"></div>
        <div className="shimmer shimmerBtn"></div>
      </div>
    </div>
  );
};

export default OrderShimmer;
