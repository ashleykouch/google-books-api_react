import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import "./SearchBar.scss";
import CardContainer from "../CardContainer/CardContainer";
import { BookSearch, getBookSearch } from "../../services/Book";

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

const SearchBarComponent = ({ onSubmit }: any) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {
    console.log(e);
    e.preventDefault();
    onSubmit(searchRef?.current?.value);
  };

  return (
    <form className="searchbar_form" onSubmit={handleSubmit}>
      <input
        className="searchbar_form_input"
        type="text"
        ref={searchRef}
        aria-label="Search input"
        placeholder="Search for your next book here..."
      />
      <button className="searchbar_button">Search</button>
    </form>
  );
};

const SearchBar: React.FC = () => {
  // create react states
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<BookSearch[]>([]);
  const [sortOption, setSortOption] = useState("relevance");

  // create function for sorting books
  const sortBooks = (books: BookSearch[], option: string): BookSearch[] => {
    const sortedBooks = [...books];

    // sorting cases
    switch (option) {
      case "title_asc":
        return sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
      case "title_desc":
        return sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
      case "auth_asc":
        return sortedBooks.sort((a, b) => {
          return a.author.localeCompare(b.author);
        });
      case "auth_desc":
        return sortedBooks.sort((a, b) => {
          return b.author.localeCompare(a.author);
        });
      case "date_asc":
        return sortedBooks.sort((a, b) => {
          return a.published.localeCompare(b.published);
        });
      case "date_desc":
        return sortedBooks.sort((a, b) => {
          return b.published.localeCompare(a.published);
        });
      default:
        return books;
    }
  };

  // create function for restful api using google books

  // applying event handler
  const searchBooks = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await getBookSearch(query);
    const sorted = sortBooks(response, sortOption);
    setBooks(sorted);
  };

  useEffect(() => {
    if (query == "") {
      return;
    }

    const wrapper = async () => {
      const response = await getBookSearch(query);
      const sorted = sortBooks(response, sortOption);
      setBooks(sorted);
    };

    wrapper();
  }, [sortOption, query]);

  return (
    <>
      <div className="searchbar">
        <div className="searchbar_title">
          <h1 className="searchbar_title_header">Searching for a Book?</h1>
          <h3 className="searchbar_title_subheader">
            libraryOfBooks holds an endless library to find your next read!
          </h3>
        </div>

        <SearchBarComponent
          aria-label="Search form"
          onSubmit={(search: string) => setQuery(search)}
        />
        <form>
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
