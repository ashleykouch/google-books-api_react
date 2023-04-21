import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";

import { MemoryRouter } from "react-router-dom";
import { getBookSearch } from "../../services/Book";

// create a mock version of the axios module to be used for testing

jest.mock("../../services/Book", () => ({
  getBookSearch: jest.fn(),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    (getBookSearch as jest.Mock).mockImplementation(() => Promise.resolve([]));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the search bar title and subtitle", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    expect(screen.getByText("Searching for a Book?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "libraryOfBooks holds an endless library to find your next read!"
      )
    ).toBeInTheDocument();
  });

  test("renders searchbar component", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Search input")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  test("renders the dropdown filter menu", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
