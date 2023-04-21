import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./NavBar";

describe("Navbar", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });

  test("renders Navbar without crashing", () => {
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });

  test("renders logo and header", () => {
    const logo = screen.getByAltText("brand-logo");
    const header = screen.getByText(/libraryOfBooks/i);
    expect(logo).toBeInTheDocument();
    expect(header).toBeInTheDocument();
  });

  test("renders link to home page", () => {
    const homeLink = screen.getByRole("link", { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute("href")).toBe("/");
  });

  test("renders link to about page", () => {
    const aboutLink = screen.getByRole("link", {
      name: /About/i,
    });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink.getAttribute("href")).toBe("/about");
  });

  test("renders link to contact page", () => {
    const contactLink = screen.getByRole("link", { name: /Contact/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.getAttribute("href")).toBe("/contact");
  });
});
