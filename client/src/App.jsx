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

function App() {
  return (
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
  );
}

export default App;
