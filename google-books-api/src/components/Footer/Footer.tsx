import React from "react";
import "./Footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          &copy; {currentYear} libraryOfBooks. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
