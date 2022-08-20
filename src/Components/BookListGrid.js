import { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BookListGridItem from "./BookListGridItem";
import NotFound from "../Pages/NotFound";
import BookInfo from "./BookInfo";
import Backdrop from "./Backdrop";

const BookListGrid = (props) => {
  const [book, setBook] = useState(null);
  const [bookDetail, setbookDetail] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [listTitle, setListTitle] = useState({
    iconClass: "",
    text: "",
  });
  let booklistType = useParams().booklistType;
  if (props.booklistType && !booklistType) {
    booklistType = props.booklistType;
  }

  let listedBookItems = book;
  let icon = <i className={listTitle.iconClass}></i>;
  let title = listTitle.text;
  let bookList = [];
  useEffect(() => {
    if (booklistType) {
      const fetchTitle = async () => {
        const titleResult = await fetch(
          `https://bookstore-3c010-default-rtdb.firebaseio.com/title.json`
        );
        if (!titleResult.ok) {
          throw new Error("Fetch title fail!");
        }
        const titleData = await titleResult.json();
        setListTitle(titleData[booklistType]);
      };
      const fetchBook = async () => {
        const bookResult = await fetch(
          `https://bookstore-3c010-default-rtdb.firebaseio.com/booklists/${booklistType}.json`
        );
        if (!bookResult.ok) {
          throw new Error("Fetch data fail!");
        }
        const bookData = await bookResult.json();

        for (let key in bookData) {
          bookList.push({ ...bookData[key], key: key });
        }
        setBook(bookList);
        setLoading(false);
      };

      fetchTitle()
        .then(() => {
          fetchBook();
        })
        .catch((err) => {
          alert(err.message);
          setLoading(false);
        });
    } else {
      setBook(true);
      setLoading(false);
    }
  }, [booklistType]);

  const onClickHandler = (book) => {
    setbookDetail(book);
  };

  const BookList = book ? (
    listedBookItems.map((book) => {
      return (
        <BookListGridItem
          book={book}
          key={book.key}
          showDetail={onClickHandler}
        />
      );
    })
  ) : (
    <NotFound />
  );
  return (
    <Fragment>
      {bookDetail && (
        <Backdrop>
          <BookInfo book={bookDetail} close={() => setbookDetail(null)} />
        </Backdrop>
      )}
      <div className="margin-bottom-medium">
        <div className="book-list book-list--grid">
          {listedBookItems && (
            <div className="book-list__title book-list__title--grid-item">
              <h1>
                {icon} {title}
              </h1>
              {booklistType && !props.showBackToHome && (
                <Link to="/" className="btn btn-purple">
                  返回主頁
                </Link>
              )}
            </div>
          )}
          {isLoading ? <p>is Loading....</p> : BookList}
        </div>
      </div>
    </Fragment>
  );
};

export default BookListGrid;
