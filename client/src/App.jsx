import react from "react";
import "./scss/main.scss";
import { Homepage, Header, OffeCard } from "./components/index.js";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Homepage />
      <OffeCard />
    </BrowserRouter>
  );
}

export default App;
