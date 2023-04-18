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

  //   TODO: fix test case for below

  //   const axiosSpy = jest
  //     .spyOn(axios, "get")
  //     .mockRejectedValue(new Error("Request failed"));

  test("displays error message when API call is unsuccessful", async () => {
    // axios.get = jest.fn().mockRejectedValue(new Error("Request failed"));

    const error = new Error("Request failed");
    const axiosSpy = jest.spyOn(axios, "get").mockRejectedValue(error);

    expect(axiosSpy).toHaveBeenCalledTimes(0);

    render(
      <MemoryRouter initialEntries={["/book/HI12BYE"]}>
        <Route path="/book/:id">
          <BookDetails />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(axiosSpy).toHaveBeenCalledTimes(1);
    });

    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    // expect(await screen.findByText("Mock Book Tester")).toBeInTheDocument();
    // expect(screen.getByText("Author1, Author2, Author3")).toBeInTheDocument();
    // expect(
    //   screen.getByText("Description test for mock book.")
    // ).toBeInTheDocument();
    // expect(screen.getByText("Published Date: 2009-10-23")).toBeInTheDocument();
    // expect(screen.getByText("Page Count: 100")).toBeInTheDocument();
    expect(screen.getByText(/Request failed/i)).toBeInTheDocument();

    axiosSpy.mockRestore();
  });
});
