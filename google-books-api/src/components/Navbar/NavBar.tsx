import React from "react";
import { Link } from "react-router-dom";
import books from "../../assets/logo.png";
import "./NavBar.scss";

const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <div className="logo">
          <Link to="/" className="brand-logo">
            <img className="brand-logo_img" src={books} alt="brand-logo" />
            <h2 className="brand-logo_header">libraryOfBooks</h2>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-links_li">
            <h2 className="nav-links_header">Home</h2>
          </Link>
          <Link to="/about" className="nav-links_li">
            <h2 className="nav-links_header">About</h2>
          </Link>
          <Link to="/contact" className="nav-links_li">
            <h2 className="nav-links_header">Contact</h2>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
