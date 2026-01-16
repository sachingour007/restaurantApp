import React, { useEffect } from "react";
import { Header, Footer } from "../index";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import useCartData from "../../hooks/useCartData";
import useOrderData from "../../hooks/useOrderData";

function UserMain() {
  const { user, loading } = useSelector((store) => store.user);
  const getCart = useCartData();
  const getOrders = useOrderData();

  useEffect(() => {
    if (user) {
      getCart();
      getOrders();
    }
  }, [user]);
  if (loading) return null;
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserMain;
