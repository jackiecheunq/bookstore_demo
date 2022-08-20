import NewsBar from "../Components/NewsBar";
import Gallery from "../Components/Gallery";
import BookList from "../Components/BookList";
import LatestBook from "../Store/LatestBook";
import BookListGrid from "../Components/BookListGrid";
import NewsLetterAdv from "../Components/NewsletterAdv";
import { Fragment } from "react";

const Home = (props) => {
  return (
    <Fragment>
      <NewsBar />
      <Gallery />
      <BookList
        icon={<i className="fa-brands fa-hotjar red-font"></i>}
        title="本週暢銷書籍"
        books={LatestBook}
        booklistType="latestbook"
      />
      <BookList
        icon={<i className="fa-solid fa-percent red-font"></i>}
        title="本週特別折扣"
        books={LatestBook}
        booklistType="latestbook"
      />
      <BookList
        icon={<i className="fa-solid fa-city purple-font"></i>}
        title="本地作品推薦"
        books={LatestBook}
        booklistType="latestbook"
      />
      <BookListGrid booklistType="travel" showBackToHome />
      <NewsLetterAdv />
    </Fragment>
  );
};

export default Home;
