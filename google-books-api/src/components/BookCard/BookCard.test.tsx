import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import BookCard from "./BookCard";

// ensure the test environment is cleaned and reset for the next test

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

// create a mock example of a book
const mockBook = {
  id: "HI123BYE",
  volumeInfo: {
    title: "Mock Book Tester",
    authors: ["Author1, Author2, Author3"],
    publishedDate: "2009-10-23",
    imageLinks: {
      thumbnail: "https://example.com/mock-book-cover.jpg",
    },
  },
};

describe("BookCard", () => {
  test("renders book information correctly", () => {
    render(
      <Router>
        <table>
          <tbody>
            <BookCard book={mockBook} />
          </tbody>
        </table>
      </Router>
    );

    // expect results based on the created mock book above
    expect(screen.getByAltText("Mock Book Tester")).toBeInTheDocument();
    expect(screen.getByText("HI123BYE")).toBeInTheDocument();
    expect(screen.getByText("Mock Book Tester")).toBeInTheDocument();
    expect(screen.getByText("Author1, Author2, Author3")).toBeInTheDocument();
    expect(screen.getByText("2009-10-23")).toBeInTheDocument();
    expect(screen.getByText("Read More")).toBeInTheDocument();
  });

  test("renders 'Unknown author' when no authors are provided", () => {
    const noAuthors = {
      // ... creates a copy of the object without modifying the original
      ...mockBook,
      volumeInfo: {
        ...mockBook.volumeInfo,
        authors: undefined,
      },
    };

    render(
      <Router>
        <table>
          <tbody>
            <BookCard book={noAuthors} />
          </tbody>
        </table>
      </Router>
    );

    expect(screen.getByText("Unknown author")).toBeInTheDocument();
  });

  test("renders default cover image when no image is provided", () => {
    const noImage = {
      ...mockBook,
      volumeInfo: {
        ...mockBook.volumeInfo,
        imageLinks: undefined,
      },
    };

    render(
      <Router>
        <table>
          <tbody>
            <BookCard book={noImage} />
          </tbody>
        </table>
      </Router>
    );

    const imgElement = screen.getByTestId("book-img");
    expect(imgElement.getAttribute("src")).toContain(
      "https://cdn.bookauthority.org/dist/images/book-cover-not-available.6b5a104fa66be4eec4fd16aebd34fe04.png"
    );
  });
});
