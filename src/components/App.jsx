import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";

const ACCESS_KEY = "mMueF4vZES8_6_LOygFSEGCH1au8JLc8l-D6eG2gT1g";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query,
              page,
              per_page: 12,
            },
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          }
        );
        if (response.status === 200) {
          if (response.data.results.length === 0) {
            setError("No matches!"); 
          } else {
            setImages((prevImages) => [
              ...prevImages,
              ...response.data.results,
            ]);
          }
        } else {
          throw new Error("Error fetching images");
        }
      } catch (err) {
        setError("Failed to fetch images.Please try again.");
        toast.error(
          "Failed to fetch images. Please check your connection or try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = (searchQuery) => {
    if (searchQuery.trim() === "") {
      toast.error("Please enter a search query!");
      return;
    }
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster position="top-right" reverseOrder={false} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        image={selectedImage}
      />
    </>
  );
}

export default App;
