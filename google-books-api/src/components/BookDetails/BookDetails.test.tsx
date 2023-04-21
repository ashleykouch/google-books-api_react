import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Route } from "react-router-dom";
import BookDetails from "./BookDetails";
import { cleanup } from "@testing-library/react";

// ensure the test environment is cleaned and reset for the next test
afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

// create a mock version of the axios module to be used for testing
jest.mock("axios");

// create a mock example of a book
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
    // jest.fn creates a mock version of axios.get
    axios.get = jest.fn().mockResolvedValue(mockBook);

    render(
      // MemoryRouter is used to wrap the component due to the router context of the component.
      <MemoryRouter initialEntries={[`/book/${mockBook.data.id}`]}>
        <BookDetails />
      </MemoryRouter>
    );

    // expect results based on the created mock book above
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

  test("displays error message when API call is unsuccessful", async () => {
    const error = new Error("Request failed");
    // create a wrapper sround the original function that tracks its usage (spyOn)
    const axiosSpy = jest.spyOn(axios, "get").mockRejectedValue(error);

    render(
      <MemoryRouter initialEntries={["/book/HI12BYE"]}>
        <Route path="/book/:id">
          <BookDetails />
        </Route>
      </MemoryRouter>
    );

    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toHaveTextContent("Request failed");

    // expect the error to occur 1 time
    expect(axiosSpy).toHaveBeenCalledTimes(1);

    // restore the original implementation of the function/method
    axiosSpy.mockRestore();
  });
});
