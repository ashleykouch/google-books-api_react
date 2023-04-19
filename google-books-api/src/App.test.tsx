import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App", () => {
  test("renders Navbar component", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    const nav = screen.getAllByRole("heading", { name: /libraryOfBooks/i });
    expect(nav).toHaveLength(2);
  });

  test("renders Searchbar component on home route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const searchBar = screen.getByPlaceholderText(
      /search for your next book here/i
    );
    expect(searchBar).toBeInTheDocument();
  });

  test("renders About component on the about route", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <App />
      </MemoryRouter>
    );

    const header = screen.getByText(/about/i);
    expect(header).toBeInTheDocument();
  });

  test("renders Contact component on the contact route", () => {
    render(
      <MemoryRouter initialEntries={["/contact"]}>
        <App />
      </MemoryRouter>
    );

    const header = screen.getByText(/contact/i);
    expect(header).toBeInTheDocument();
  });

  test("renders Footer component", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    const text = screen.getByText(
      /© 2023 libraryOfBooks. All rights reserved./i
    );
    expect(text).toBeInTheDocument();
  });
});
