import react from "react";
import "./scss/main.scss";
import { Header } from "./components/index.js";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}

export default App;
