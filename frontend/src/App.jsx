import { Outlet } from "react-router-dom";

import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import "../index.css";

function App() {
  return (
    <>
      <NavBar />
      <div className="flex-container">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
