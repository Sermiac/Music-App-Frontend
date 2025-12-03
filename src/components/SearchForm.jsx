import "../css/Home.css";
import { useState } from "react";
import { useEffect } from "react";

export function SearchForm({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    onSearch(searchQuery);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setIsMobile(true); // Detect if the viewport is a mobile size
      } else {
        setIsMobile(false);
      }
    };

    handleResize(); // Initial check on load
    window.addEventListener("resize", handleResize); // Listen for window resizing

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Search for Music..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <button type="submit" className="search-button">
        {isMobile ? "➤" : "Search"}
      </button>
    </form>
  );
}
