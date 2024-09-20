import React, { useEffect } from "react";
import Modal from "react-modal";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, image }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal
      className={s.modal}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      overlayClassName={s.overlay}
      onClick={handleBackdropClick}
    >
      {image && (
        <div className={s.content}>
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className={s.image}
          />
          <p className={s.description}>
            {image.description || image.alt_description}
          </p>
          <p className={s.description}>Author: {image.user.name}</p>
          <p className={s.description}>Likes: {image.likes}</p>
          <button className={s.closeBtn} onClick={onClose}>
            Close
          </button>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
