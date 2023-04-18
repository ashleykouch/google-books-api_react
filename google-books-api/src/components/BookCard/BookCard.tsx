import React from "react";
import { Link } from "react-router-dom";
import "./BookCard.scss";
import cover from "../../assets/no-cover.jpeg";

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

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <tr className="bookcard_row">
      <td>
        <img
          src={book.volumeInfo.imageLinks?.thumbnail || cover}
          alt={book.volumeInfo.title}
          className="bookcard_img"
        />
      </td>
      <td>{book.id}</td>
      <td>{book.volumeInfo.title}</td>
      <td>{book.volumeInfo.authors?.join(",") || "Unknown author"}</td>
      <td>{book.volumeInfo.publishedDate}</td>
      <td>
        <Link to={`/book/${book.id}`} className="book-details">
          Read More
        </Link>
      </td>
    </tr>

    // <div className="bookcard_container">
    //   <p>{book.id}</p>
    //   <p>{book.volumeInfo.title}</p>
    //   <p>{book.volumeInfo.authors?.join(", ") || "Author unknown"}</p>
    //   <p>{book.volumeInfo.publishedDate}</p>
    //   <Link to={`/book/${book.id}`} className="book-details">
    //     <h3>Read More</h3>
    //   </Link>
  );
};

export default BookCard;
