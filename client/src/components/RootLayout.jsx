import react, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../store/userSlice.js";
import { BASE_URL } from "../constantFiles/baseURL.js";
import axios from "axios";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const { user, loading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const getCurrUser = async () => {
    if (user) return;

    try {
      const userDetails = await axios.get(`${BASE_URL}/user/profile`, {
        withCredentials: true,
      });
      console.log(userDetails);

      if (userDetails.data.success) {
        dispatch(addUser(userDetails.data.data));
      } else {
        dispatch(addUser(null));
      }
    } catch (error) {
      console.log("Not authenticated");
      dispatch(addUser(null));
    }
  };

  useEffect(() => {
    getCurrUser();
  }, [user, dispatch]);

  return <Outlet />;
};

export default RootLayout;
