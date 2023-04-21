import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./BookDetails.scss";

// the interface defines the structure of the book object and is used to store and manage information fetched from the Google Books API

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
  const [error, setError] = useState<string | null>(null);

  // use useEffect hook call and invoke the async function
  useEffect(() => {
    (async () => {
      try {
        // make the HTTP get request to the Google Books API
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        // if successful. the response data will be called
        setBook(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setBook(null);
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    })();
  }, [id]);

  if (error) {
    return <span data-testid="error-message">{error}</span>;
  }

  // show loading placeholder prior to book being loaded
  if (!book) {
    return <div>Loading...</div>;
  }

  // description contained HTML tags and therefore the below code is used to remove them from the description
  const stripHtmlTags = (str: string) => {
    if (!str) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <>
      <Link to="/" className="detail-back_link">
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
