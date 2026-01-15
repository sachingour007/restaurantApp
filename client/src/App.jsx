import react, { useEffect } from "react";
import "./scss/main.scss";
import 'swiper/css';
import "leaflet/dist/leaflet.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {
  Homepage,
  Menu,
  ScrollTop,
  Login,
  Register,
  UserMain,
  AdminMain,
  About,
  TableBook,
} from "./components/index.js";
import { menuData } from "../src/constantFiles/menuContent.js";
import { Provider } from "react-redux";
import store from "./store/store.js";
import RootLayout from "./components/RootLayout.jsx";
import UserProtectRoute from "./routes/UserProtectRoute.jsx";
import Cart from "./components/UserComponents/Cart.jsx";
import Orders from "./components/UserComponents/Orders.jsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollTop />

        <Routes>
          {/* Root Layout */}
          <Route element={<RootLayout />}>
            {/* ====== USER ROUTES ====== */}
            <Route path="/" element={<UserMain />}>
              <Route index element={<Homepage />} />
              <Route
                path="menu"
                element={<Menu cards={menuData} showTab={true} />}
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="about" element={<About />} />
              <Route
                path="/book-table"
                element={
                  <UserProtectRoute>
                    <TableBook />
                  </UserProtectRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <UserProtectRoute>
                    <Cart />
                  </UserProtectRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <UserProtectRoute>
                    <Orders />
                  </UserProtectRoute>
                }
              />
            </Route>

            {/* ====== ADMIN ROUTES ====== */}
            <Route path="/admin" element={<AdminMain />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
