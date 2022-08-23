import NewsBar from "../Components/NewsBar";
import Gallery from "../Components/Gallery";
import BookList from "../Components/BookList";
import BookListGrid from "../Components/BookListGrid";
import NewsLetterAdv from "../Components/NewsletterAdv";
import { Fragment } from "react";

const Home = (props) => {
  return (
    <Fragment>
      <NewsBar />
      <Gallery />
      <BookList booklistType="latestbook" />
      <BookList booklistType="history" />
      <BookList booklistType="love" />
      <BookListGrid booklistType="travel" showBackToHome />
      <NewsLetterAdv />
    </Fragment>
  );
};

export default Home;
