import BookListItem from "./BookListItem";

const BookListGridItem = (props) => {
  return (
    <div className="book-list__grid-unit">
      <BookListItem img={props.book.bookCover} />
      <div className="book-list__book-info margin-left-medium">
        <h3 className="font-500">{props.book.title}</h3>
        <span>{props.book.author}</span>
        <div className="flex-basic">
          {props.book.originalPrice && (
            <span className="font-line-through red-font margin-right-small">
              {`$${props.book.originalPrice}`}
            </span>
          )}
          <span>{`$${props.book.currentPrice}`}</span>
        </div>
        <button
          className="btn btn-purple"
          onClick={() => props.showDetail(props.book)}
        >
          購買
        </button>
      </div>
    </div>
  );
};

export default BookListGridItem;
