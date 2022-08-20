const Gallery = (props) => {
  return (
    <div className="gallery">
      <img
        src="https://s26162.pcdn.co/wp-content/uploads/2018/12/11-bookstores-6-three-lives-2.w710.h473.2x.jpg"
        alt="bookstore-img"
        className="gallery__image--1"
      />
      <div className="gallery__caption">
        <span>分享你與書店的故事</span>
      </div>
    </div>
  );
};

export default Gallery;
