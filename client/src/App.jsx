import react from "react";
import "./scss/main.scss";
import { Homepage, Header, OffeCard, Menu } from "./components/index.js";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Homepage />
      <OffeCard />
      <Menu />
    </BrowserRouter>
  );
}

export default App;
