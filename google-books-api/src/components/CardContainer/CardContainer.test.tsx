import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CardContainer from "./CardContainer";
import { MemoryRouter } from "react-router-dom";
import { BookSearch } from "../../services/Book";

// interface Book {
//   id: string;
//   volumeInfo: {
//     title: string;
//     authors: string[];
//     publishedDate: string;
//     imageLinks: {
//       thumbnail: string;
//     };
//   };
// }

describe("CardContainer", () => {
  test("renders CardContainer component without crashing", () => {
    // initialise the const as an empty array so that it returns the required object keys/values
    const mockBook: BookSearch[] = [];
    render(
      <MemoryRouter>
        <CardContainer books={mockBook} />
      </MemoryRouter>
    );
  });

  test("renders the correct number of BookCard components", () => {
    const mockBook: BookSearch[] = [
      {
        id: "1",
        title: "Mock Book Tester 1",
        author: "Author1",
        published: "2000-01-01",
        image: "http://example.com/mock-book-1.jpg",
      },
      {
        id: "2",
        title: "Mock Book Tester 2",
        author: "Author2",
        published: "2001-01-01",
        image: "http://example.com/mock-book-2.jpg",
      },
    ];

    render(
      <MemoryRouter>
        <CardContainer books={mockBook} />
      </MemoryRouter>
    );

    const bookCards = screen.getAllByTestId("book-card");
    expect(bookCards.length).toEqual(mockBook.length);
  });

  test("displays 'Results found...' in the header", () => {
    const mockBook: BookSearch[] = [];
    render(
      <MemoryRouter>
        <CardContainer books={mockBook} />
      </MemoryRouter>
    );

    const headerText = screen.getByText(/Results found.../i);
    expect(headerText).toBeInTheDocument();
  });
});
