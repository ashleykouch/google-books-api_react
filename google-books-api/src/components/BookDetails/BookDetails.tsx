import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./BookDetails.scss";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    imageLinks: {
      thumbnail: string;
    };
    publishedDate: string;
    pageCount: number;
  };
}

const BookDetails: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const bookDetails = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );
      setBook(response.data);
      console.log(response.data);
    };
    bookDetails();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const stripHtmlTags = (str: string) => {
    if (!str) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <>
      <Link to="/" className="back_link">
        Back
      </Link>
      <div className="book_item-title">
        <h2>{book.volumeInfo.title}</h2>
        <h3>{book.volumeInfo.authors?.join(", ") || "Unknown author"}</h3>
        <p>Published Date: {book.volumeInfo.publishedDate}</p>
        <p>Page Count: {book.volumeInfo.pageCount}</p>
      </div>
      <div className="book_item-details">
        <div className="book_item-img">
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || ""}
            alt={book.volumeInfo.title}
          />
        </div>

        <div className="book_item-content">
          <p>{stripHtmlTags(book.volumeInfo.description)}</p>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
