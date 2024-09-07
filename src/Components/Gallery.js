import { useEffect, useReducer } from "react";



const reducer = (state, action) => {
  const transitionDuration = 800;
  const { currentImgIndex, realImgIndex, imgsLength } = state;
  const prevDuplicateIndex = 0;
  const nextDuplicateIndex = imgsLength + 1
  const firstImgPositionIndex = 1;
  const lastImgPositonIndex = imgsLength;
  const lastImgIndex = imgsLength - 1;

  switch (action.type) {
    case "NEXT":
      if (currentImgIndex === imgsLength) {
        return { imgsLength, realImgIndex: 0, currentImgIndex: currentImgIndex + 1, transitionDuration };
      } else if (currentImgIndex === nextDuplicateIndex) {
        return { imgsLength, realImgIndex: 0, currentImgIndex: 1, transitionDuration: 0 }
      } else if (currentImgIndex === prevDuplicateIndex && realImgIndex === lastImgIndex) {
        return { imgsLength, realImgIndex: 0, currentImgIndex: currentImgIndex + 1, transitionDuration }
      }
      return { imgsLength, realImgIndex: realImgIndex + 1, currentImgIndex: currentImgIndex + 1, transitionDuration };
    case "PREV":
      if (currentImgIndex === firstImgPositionIndex) {
        return { imgsLength, realImgIndex: lastImgIndex, currentImgIndex: currentImgIndex - 1, transitionDuration };
      } else if (currentImgIndex === prevDuplicateIndex) {
        return { imgsLength, realImgIndex: lastImgIndex, currentImgIndex: lastImgPositonIndex, transitionDuration: 0 };
      } else if (currentImgIndex === nextDuplicateIndex && realImgIndex === 0) {
        return { imgsLength, realImgIndex: lastImgIndex, currentImgIndex: currentImgIndex - 1, transitionDuration }
      }
      return { imgsLength, realImgIndex: realImgIndex - 1, currentImgIndex: currentImgIndex - 1, transitionDuration };
    case "SET":
      if (realImgIndex !== action.target) {
        return { imgsLength, realImgIndex: action.target, currentImgIndex: action.target + 1, transitionDuration };
      } return state;
    case "UPDATE_IMG":
      return { ...state, imgsLength: action.imgsLength };
    default:
      return state
  }
};


const Gallery = (props) => {

  const imgs = props.imgs;
  const imgsLength = imgs.length;

  const [state, dispatch] = useReducer(reducer, {
    currentImgIndex: 1,
    realImgIndex: 0,
    imgsLength
  })

  const { currentImgIndex, realImgIndex, transitionDuration } = state;

  const carousel = () => {
    const imgListItem = imgs.map((img) => <li className={`gallery__li`}><img src={img} alt="carousel-img" className="gallery__img" key={img} /></li>)
    imgListItem.unshift(<li className={`gallery__li`}><img src={imgs[imgs.length - 1]} alt="carousel-img" className="gallery__img" key={`${imgs[imgs.length - 1]}-duplicate-prev`} /></li>)
    imgListItem.push(<li className={`gallery__li`}><img src={imgs[0]} alt="carousel-img" className="gallery__img" key={`${imgs[0]}-duplicate-next`} /></li>)
    return imgListItem;
  }

  const goPrev = () => {
    const dispatchPerv = () => dispatch({ type: "PREV" })
    dispatchPerv()
  }

  const goNext = () => {
    const dispatchNext = () => dispatch({ type: "NEXT" })
    dispatchNext()
  }

  useEffect(() => {
    if (realImgIndex === 0 && transitionDuration === 0) {
      goNext();
    } else if (realImgIndex === imgsLength - 1 && transitionDuration === 0) {
      goPrev()
    }
  }, [transitionDuration, realImgIndex, imgsLength])

  useEffect(() => {
    dispatch({ type: "UPDATE_IMG", imgsLength })
  }, [imgsLength])


  const indexDots = imgs.map((_img, index) => {
    return (
      <button
        className={`gallery__index-dot ${realImgIndex === index && "gallery__index-dot--active"
          }`}
        onClick={dispatch.bind(null, { type: "SET", target: index })}
        key={`gallery__index-dot_${index}`}>
        &nbsp;
      </button>
    );
  });


  return (
    <div
      className="gallery"
    >
      <div className="gallery__carousel">
        <ul className="gallery__ul" style={{
          transform: `translateX(-${currentImgIndex}00%)`,
          transitionDuration: transitionDuration + "ms"
        }}>
          {carousel()}
        </ul>
        <span className="gallery__caption">Welcome to My BookStore</span>
        <button className="gallery__left-button" onClick={goPrev.bind(null)}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          className="gallery__right-button"
          onClick={goNext.bind(null)}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        <div className="gallery__index">{indexDots}</div>
      </div>
    </div>
  );
};

export default Gallery;
