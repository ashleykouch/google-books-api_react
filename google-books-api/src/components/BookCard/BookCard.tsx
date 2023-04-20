import React from "react";
import { Link } from "react-router-dom";
import "./BookCard.scss";
import cover from "../../assets/no-cover.jpeg";

// the interface defines the structure of the book object and is used to store and manage information fetched from the Google Books API
interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}

// the interface is used to define the expected properties the BookCard component and represents the information of the above object that will be passed down as a prop.
interface BookCardProps {
  book: Book;
}

// using React.FC (functional component) automatically includes children props in type definition and also checks for default probs and has a implicit return type of element | null

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <tr className="bookcard_row" data-testid="book-card">
      <td className="cover-cell">
        <img
          src={
            book.volumeInfo.imageLinks?.thumbnail ||
            "https://cdn.bookauthority.org/dist/images/book-cover-not-available.6b5a104fa66be4eec4fd16aebd34fe04.png"
          }
          alt={book.volumeInfo.title}
          className="bookcard_img"
          data-testid="book-img"
        />
      </td>
      <td className="id-cell">{book.id}</td>
      <td>{book.volumeInfo.title}</td>
      <td>{book.volumeInfo.authors?.join(",") || "Unknown author"}</td>
      <td>{book.volumeInfo.publishedDate}</td>
      <td>
        <Link to={`/book/${book.id}`} className="book-details">
          Read More
        </Link>
      </td>
    </tr>
  );
};

export default BookCard;
