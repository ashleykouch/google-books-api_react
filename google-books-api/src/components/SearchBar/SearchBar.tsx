import React, { useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import "./SearchBar.scss";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imgLinks: {
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
  };

  return (
    <div className="searchbar">
      <div className="searchbar_header">
        <h1>Searching for a Book?</h1>
        <h3>libraryOfBooks holds an endless library to find your next read</h3>
      </div>

      <form onSubmit={searchBooks}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for your next book here..."
        />
        <button type="submit">Search</button>
      </form>

      <div className="books-container">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
