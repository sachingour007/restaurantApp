import react, { useEffect } from "react";
import "./scss/main.scss";
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
              <Route path="/book-table" element={<TableBook />} />
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
