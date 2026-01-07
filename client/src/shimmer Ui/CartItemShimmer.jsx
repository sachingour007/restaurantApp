const CartItemShimmer = () => {
  return (
    <div className="cart-shimmer-card">
      <div className="left">
        <div className="shimmer shimmer-img"></div>

        <div className="shimmer-info">
          <div className="shimmer shimmer-title"></div>
          <div className="shimmer shimmer-price"></div>
        </div>
      </div>

      <div className="right">
        <div className="shimmer shimmer-trash"></div>

        <div className="shimmer-qty">
          <div className="shimmer shimmer-btn"></div>
          <div className="shimmer shimmer-count"></div>
          <div className="shimmer shimmer-btn"></div>
        </div>
      </div>
    </div>
  );
};

export default CartItemShimmer;
