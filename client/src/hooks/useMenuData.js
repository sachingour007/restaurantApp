import axios from "axios";
import { BASE_URL } from "../constantFiles/baseURL";
import { useDispatch } from "react-redux";
import { addMenu } from "../store/menuSlice";

const useMenuData = () => {
  const dispatch = useDispatch();

  const getMenu = async () => {
    try {
      const menuData = await axios.get(BASE_URL + "/menuu", {
        withCredentials: true,
      });
      dispatch(addMenu(menuData.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  return getMenu;
};

export default useMenuData;
