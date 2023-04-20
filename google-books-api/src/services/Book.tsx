import axios from "axios";

interface BookResponse {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publishedDate: string;
    imageLinks: {
      thumbnail: string;
    };
    pageCount: number;
    description: string;
  };
}

export interface BookSearch {
  id: string;
  title: string;
  author: string;
  published: string;
  image: string;
}

export const cleanBookSearch = (bookResponse: BookResponse) => ({
  id: bookResponse.id ?? "There is no id",
  title: bookResponse.volumeInfo.title ?? "There is no title",
  author: bookResponse.volumeInfo.authors?.join(", ") ?? "There are no authors",
  published:
    bookResponse.volumeInfo.publishedDate ?? "There is no publish date listed",
  image:
    bookResponse.volumeInfo.imageLinks?.thumbnail ??
    "https://cdn.bookauthority.org/dist/images/book-cover-not-available.6b5a104fa66be4eec4fd16aebd34fe04.png",
});

export const getBookSearch = async (query: string) => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${query}`
  );

  const data = response.data;

  if (!data.items) {
    throw new Error();
  }

  return response.data.items.map(cleanBookSearch);
};

export interface BookDetail {
  title: string;
  author: string;
  published: string;
  pageCount: number;
  image: string;
  description: string;
}

export const cleanBookDetail = (bookResponse: BookResponse) => ({
  title: bookResponse.id ?? "There is no id",
  author: bookResponse.volumeInfo.authors?.join(", ") ?? "There are no authors",
  published:
    bookResponse.volumeInfo.publishedDate ?? "There is no publish date listed",
  image:
    bookResponse.volumeInfo.imageLinks?.thumbnail ??
    "https://cdn.bookauthority.org/dist/images/book-cover-not-available.6b5a104fa66be4eec4fd16aebd34fe04.png",
  pageCount: bookResponse.volumeInfo.pageCount ?? "There is no page count",
  description: bookResponse.volumeInfo.description ?? "There is no description",
});
