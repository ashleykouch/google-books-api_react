import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./About.scss";

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <Link to="/" className="back_link">
          Back
        </Link>

        <div className="about-content">
          <div className="about-img">
            <img src={logo} alt="" />
          </div>
          <div className="about-text">
            <h2 className="about-title">About LibraryOfBooks</h2>
            <p>
              Our online book library is a virtual hub for book lovers
              everywhere. Our mission is to provide access to a vast collection
              of books, making it easy for readers to find their next favorite
              read. With a simple search by name feature, you can quickly and
              easily find the books you're looking for.
            </p>
            <p>
              We've obtained a diverse collection of titles from GoogleBooks,
              ensuring that there's something for everyone, no matter what your
              interests may be. From classic literature to popular bestsellers,
              we have it all. So, whether you're in the mood for an old favorite
              or want to discover something new, our book library is the perfect
              destination. Join us on a journey of discovery and find your next
              great read today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
