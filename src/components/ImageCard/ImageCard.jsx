import React from "react";
import s from "./ImageCard.module.css";

const ImageCard = ({ image, onImageClick }) => {
  return (
    <div className={s.imgWrapper} onClick={() => onImageClick(image)}>
      <img
        className={s.img}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
