import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Route } from "react-router-dom";
import BookDetails from "./BookDetails";

jest.mock("axios");

const mockBook = {
  data: {
    id: "HI123BYE",
    volumeInfo: {
      title: "Mock Book Tester",
      authors: ["Author1", "Author2", "Author3"],
      description: "Description test for mock book.",
      imageLinks: {
        thumbnail: "https://path/to/mock-book-thumbnail.jpg",
      },
      publishedDate: "2009-10-23",
      pageCount: "100",
    },
  },
};

describe("BookDetails", () => {
  test("displays the correct book details when API call is succssful", async () => {
    axios.get = jest.fn().mockResolvedValue(mockBook);

    render(
      <MemoryRouter initialEntries={[`/book/${mockBook.data.id}`]}>
        <BookDetails />
      </MemoryRouter>
    );

    expect(await screen.findByText("Mock Book Tester")).toBeInTheDocument();
    expect(screen.getByText("Author1, Author2, Author3")).toBeInTheDocument();
    expect(
      screen.getByText("Description test for mock book.")
    ).toBeInTheDocument();
    expect(screen.getByText("Published Date: 2009-10-23")).toBeInTheDocument();
    expect(screen.getByText("Page Count: 100")).toBeInTheDocument();
    expect(screen.getByAltText("Mock Book Tester")).toHaveAttribute(
      "src",
      "https://path/to/mock-book-thumbnail.jpg"
    );
  });
});
