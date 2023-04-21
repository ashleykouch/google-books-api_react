import React, { useState } from "react";
import "./Contact.scss";
import { Link } from "react-router-dom";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="contact-page">
      <div className="contact-container">
        <Link to="/" className="back_link">
          Back
        </Link>
        <h2>Contact Us</h2>
        <p>
          If you have any questions, please feel free to reach out through the
          contact form below:
        </p>
        <form className="contact-form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            aria-label="Name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            aria-label="Email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            aria-label="Message"
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            placeholder="Your message"
            required
          ></textarea>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
