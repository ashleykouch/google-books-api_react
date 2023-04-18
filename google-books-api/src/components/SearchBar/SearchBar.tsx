import React, { useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import "./SearchBar.scss";
import CardContainer from "../CardContainer/CardContainer";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publishedDate: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

const SearchBar: React.FC = () => {
  // create react states
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);

  // create function for restful api using google books

  // applying event handler
  const searchBooks = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );
    setBooks(response.data.items);
    console.log(response.data.items);
  };

  return (
    <>
      <div className="searchbar">
        <div className="searchbar_title">
          <h1 className="searchbar_title_header">Searching for a Book?</h1>
          <h3 className="searchbar_title_subheader">
            libraryOfBooks holds an endless library to find your next read
          </h3>
        </div>
        <form onSubmit={searchBooks} className="searchbar_form">
          <input
            className="searchbar_form_input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for your next book here..."
          />
          <button type="submit" className="searchbar_button">
            Search
          </button>
        </form>
      </div>
      <div>{books.length > 0 && <CardContainer books={books} />}</div>
    </>
  );
};

export default SearchBar;
