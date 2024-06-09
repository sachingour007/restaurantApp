import react from "react";
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

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollTop />
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/menu"
            element={<Menu cards={menuData} showTab={true} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
