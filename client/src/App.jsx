import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
