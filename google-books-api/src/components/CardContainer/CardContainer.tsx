import React from "react";
import BookCard from "../BookCard/BookCard";
import "./CardContainer.scss";

// the interface defines the structure of the book object and is used to store and manage information fetched from the Google Books API
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

// the interface is used to define the expected properties the BookCard component and represents the information of the above object that will be passed down as a prop.
interface CardContainerProps {
  books: Book[];
}

// using React.FC (functional component) automatically includes children props in type definition

const CardContainer: React.FC<CardContainerProps> = ({ books }) => {
  return (
    <div className="books-container">
      <h1>Results found...</h1>
      <table>
        <thead>
          <tr>
            <th className="cover-cell">COVER</th>
            <th className="id-cell">BOOK ID</th>
            <th>TITLE</th>
            <th>AUTHOR/S</th>
            <th>PUBLISHED DATE</th>
            <th>MORE DETAILS</th>
          </tr>
        </thead>
        <tbody>
          {/* iterate over the book array */}
          {books.map((book) => (
            <BookCard key={book.id} book={book} data-testid="book-card" />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardContainer;
