import { useState, useEffect } from "react";

const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

  // Show Button After Scrolling Down More than 500px
  const toggleVisible = () => {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  // Listen for Scrolling Event
  useEffect(() => {
    window.addEventListener("scroll", toggleVisible, false);
    return () => {
      window.removeEventListener("scroll", toggleVisible, false);
    };
  }, []);

  // Get Back Top when Clicked
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <button
      id="back-to-top"
      className={visible ? "visible-button" : ""}
      onClick={handleScroll}
      title="Go To Top"
    >
      <i className="fas fa-chevron-circle-up"></i>
    </button>
  );
};

export default ScrollTop;
