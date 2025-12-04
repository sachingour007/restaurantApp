import react from "react";
import "./scss/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Homepage,
  Menu,
  ScrollTop,
  Login,
  Register,
  UserMain,
  AdminMain,
} from "./components/index.js";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { menuData } from "../src/constantFiles/menuContent.js";
import { Body } from "./components/Body.jsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollTop />

        <Routes>
          <Route path="/" element={<Body />}>
            {/* User Routes */}
            <Route element={<UserMain />}>
              <Route index element={<Homepage />} />
              <Route
                path="menu"
                element={<Menu cards={menuData} showTab={true} />}
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminMain />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
