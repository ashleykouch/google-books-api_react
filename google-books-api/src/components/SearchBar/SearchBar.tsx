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
  const [sortOption, setSortOption] = useState("relevance");

  // create function for sorting books
  const sortBooks = (books: Book[], option: string): Book[] => {
    const sortedBooks = [...books];

    // sorting cases
    switch (option) {
      case "title_asc":
        return sortedBooks.sort((a, b) =>
          a.volumeInfo.title.localeCompare(b.volumeInfo.title)
        );
      case "title_desc":
        return sortedBooks.sort((a, b) =>
          b.volumeInfo.title.localeCompare(a.volumeInfo.title)
        );
      case "auth_asc":
        return sortedBooks.sort((a, b) => {
          const authA = a.volumeInfo.authors?.[0] || "";
          const authB = b.volumeInfo.authors?.[0] || "";
          return authA.localeCompare(authB);
        });
      case "auth_desc":
        return sortedBooks.sort((a, b) => {
          const authA = a.volumeInfo.authors?.[0] || "";
          const authB = b.volumeInfo.authors?.[0] || "";
          return authB.localeCompare(authA);
        });
      case "date_asc":
        return sortedBooks.sort((a, b) => {
          const dateA = a.volumeInfo.publishedDate || "";
          const dateB = b.volumeInfo.publishedDate || "";
          return dateA.localeCompare(dateB);
        });
      case "date_desc":
        return sortedBooks.sort((a, b) => {
          const dateA = a.volumeInfo.publishedDate || "";
          const dateB = b.volumeInfo.publishedDate || "";
          return dateB.localeCompare(dateA);
        });
      default:
        return books;
    }
  };

  // create function for restful api using google books

  // applying event handler
  const searchBooks = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );
    const sorted = sortBooks(response.data.items, sortOption);
    setBooks(sorted);
  };

  return (
    <>
      <div className="searchbar">
        <div className="searchbar_title">
          <h1 className="searchbar_title_header">Searching for a Book?</h1>
          <h3 className="searchbar_title_subheader">
            libraryOfBooks holds an endless library to find your next read!
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
          <select
            className="searchbar_filter"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="title_asc">Title (A-Z)</option>
            <option value="title_desc">Title (Z-A)</option>
            <option value="auth_asc">Author (A-Z)</option>
            <option value="auth_desc">Author (Z-A)</option>
            <option value="date_asc">Date (A-Z)</option>
            <option value="date_desc">Date (Z-A)</option>
          </select>
        </form>
      </div>
      <div>{books.length > 0 && <CardContainer books={books} />}</div>
    </>
  );
};

export default SearchBar;
