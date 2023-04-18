import React from "react";
import "./Contact.scss";

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
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
          placeholder="Your name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Your message"
          required
        ></textarea>

        <button type="submit" className="submit-btn">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
