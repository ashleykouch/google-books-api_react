import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

// Mock the axios library to prevent actual API requests
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SearchBar", () => {
  it("renders the search input and search button", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    expect(
      screen.getByPlaceholderText("Search for your next book here...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("accepts user input", async () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(
      "Search for your next book here..."
    );
    await userEvent.type(searchInput, "Potter");

    expect(searchInput).toHaveValue("Potter");
  });

  it("performs a search when clicked or entered", async () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    // Mock the API response
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        items: [
          {
            id: "L12GI97",
            volumeInfo: {
              title: "Potter Magic",
              authors: ["Jane Lee"],
              imageLinks: {
                thumbnail: "https://example.com/potter-magic-thumbnail.jpg",
              },
              publishedDate: "2002-18-03",
            },
          },
        ],
      },
    });

    userEvent.type(
      screen.getByPlaceholderText("Search for your next book here..."),
      "Potter Magic"
    );
    userEvent.click(screen.getByRole("button", { name: "Search" }));

    // wait for the mocked API call to complete
    await screen.findByText("Potter Magic");

    // check if the book is rendered
    expect(screen.getByText("Potter Magic")).toBeInTheDocument();
  });
});