import React from "react";
import BookCard from "../BookCard/BookCard";
import "./CardContainer.scss";

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

interface CardContainerProps {
  books: Book[];
}

const CardContainer: React.FC<CardContainerProps> = ({ books }) => {
  return (
    <div className="books-container">
      <h1>Results found...</h1>
      <table>
        <thead>
          <tr>
            <th>COVER</th>
            <th>BOOK ID</th>
            <th>TITLE</th>
            <th>AUTHOR/S</th>
            <th>PUBLISHED DATE</th>
            <th>MORE DETAILS</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <BookCard key={book.id} book={book} data-testid="book-card" />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardContainer;
