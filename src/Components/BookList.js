import BookListItem from "./BookListItem";
import { Link } from "react-router-dom";

const BookList = (props) => {
  const listedBookItems = props.books.slice(0, 4).map((book) => {
    return (
      <BookListItem key={book.key} img={book.bookCover} link={book.link} />
    );
  });

  const numberOfBooks = props.books.length;
  const linkOfFullList = "booklist/" + props.booklistType;

  return (
    <div className="book-list">
      <div className="book-list__title">
        <h1>
          {props.icon} {props.title}
        </h1>
        <Link to={linkOfFullList} className="btn btn-purple">
          完整列表（{numberOfBooks}本）
        </Link>
      </div>
      <div className="book-list__gallery">{listedBookItems}</div>
    </div>
  );
};

export default BookList;
