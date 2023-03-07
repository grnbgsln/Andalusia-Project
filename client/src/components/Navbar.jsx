import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo andalusias 1.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Home");
  const navList = ["Home", "Tentang Kami", "Fasilitas", "Kontak Kami"];
  return (
    <header>
      <div className="nav-logo">
        <img src={logo} width="98px" onClick={() => navigate("/")} />
      </div>
      <div className="links">
        <ul className="nav_links">
          {navList.map((item, index) => {
            return (
              <li key={index}>
                <Link to="/" className={`nav-item ${active === item ? "active" : null}`} onClick={() => setActive(item)}>
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
