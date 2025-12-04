import React, { useEffect } from "react";
import AdminMain from "./AdminDashbord/AdminMain";
import UserMain from "./UserComponents/UserMain";
import axios from "axios";
import { BASE_URL } from "../constantFiles/baseURL";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../store/userSlice";

export const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => {
    store.user;
  });
  const getCurrUser = async () => {
    if (user) {
      return;
    }
    try {
      const userDetails = await axios.get(`${BASE_URL}/user/profile`, {
        withCredentials: true,
      });
      dispatch(addUser(userDetails.data.data));
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(removeUser());
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getCurrUser();
  }, [user, dispatch]);

  return (
    <>
      <AdminMain />
      <UserMain />
    </>
  );
};
