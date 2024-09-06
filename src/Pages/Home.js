import NewsBar from "../Components/NewsBar";
import Gallery from "../Components/Gallery";
import BookList from "../Components/BookList";
import BookListGrid from "../Components/BookListGrid";
import NewsLetterAdv from "../Components/NewsletterAdv";
import { Fragment, useState, useRef, useCallback, useEffect } from "react";

const Home = (props) => {
  const [showBtnToTop, setShowBtnToTop] = useState(false);
  const galleryRef = useRef(null);

  const galleryObserver = useCallback((node) => {
    const intObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.intersectionRatio <= 0) {
          setShowBtnToTop(true);
        } else {
          setShowBtnToTop(false);
        }
      });
    });
    intObs.observe(node);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    galleryRef.current = document.querySelector(".gallery");
    galleryObserver(galleryRef.current);
  }, [galleryObserver]);

  return (
    <Fragment>
      <NewsBar />
      <Gallery imgs={[
        "https://img.shashin.cc/2024/09/e1e02416e3d7a89c6eea0f6bcfbdc8c5.jpg",
        "https://img.shashin.cc/2024/09/53af1be19ce8b0f0f88581705307c347.jpg",
        "https://img.shashin.cc/2024/09/6c8df49bfd5b5fa8ffb25c8744e327e9.webp",
        "https://img.shashin.cc/2024/09/1337c62aef2d55ff18b2299d85cd0609.jpg",
      ]} />
      <BookList booklistType="latestbook" id="latestbook" />
      <BookList booklistType="history" />
      <BookList booklistType="love" />
      <BookListGrid booklistType="travel" showBackToHome />
      <NewsLetterAdv />
      {showBtnToTop && (
        <button className="btn-to-top" onClick={scrollToTop}>
          <i className="fa-solid fa-angle-up "></i>
        </button>
      )}
    </Fragment>
  );
};

export default Home;
