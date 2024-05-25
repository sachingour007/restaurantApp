import react from "react";
import "./scss/main.scss";
import { Homepage, Header, Menu, Footer } from "./components/index.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { menuData } from "../src/constantFiles/menuContent.js";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/menu"
          element={<Menu cards={menuData} showTab={true} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
