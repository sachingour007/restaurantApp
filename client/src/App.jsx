import react, { useEffect, useState } from "react";
import "./scss/main.scss";
import {
  Homepage,
  Header,
  Menu,
  Footer,
  ScrollTop,
  Login,
  Register,
} from "./components/index.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { menuData } from "../src/constantFiles/menuContent.js";
import { Provider } from "react-redux";
import store from "./store/store.js";
import UserPrivateRoute from "./components/Private-Route/UserPrivateRoute.js";
import cookies from "js-cookie";

function App() {
  const initialToken = cookies.get("accessToken");
  const [token, setToken] = useState(initialToken);
  const isAuth = !!token;

  useEffect(() => {
    setToken(cookies.get("accessToken"));
  }, [token, isAuth]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollTop />
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/menu"
            element={
              <UserPrivateRoute>
                <Menu cards={menuData} showTab={true} />
              </UserPrivateRoute>
            }
          />
          {isAuth ? (
            <Route path="/login" element={<Homepage />} />
          ) : (
            <Route path="/login" element={<Login />} />
          )}
          <Route path="/login" element={isAuth ? <Homepage /> : <Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
