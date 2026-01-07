import CartItemShimmer from "./CartItemShimmer";

const CartShimmerList = () => {
  return (
    <>
      {Array(4)
        .fill("")
        .map((_, i) => (
          <CartItemShimmer key={i} />
        ))}
    </>
  );
};

export default CartShimmerList;
