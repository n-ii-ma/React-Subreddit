import { useState, useEffect } from "react";
import { debounce } from "lodash";

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

  // Debounce the Toggle Event Function
  const debounceToggleVisible = debounce(toggleVisible, 100);

  // Listen for Scrolling Event and Cancel Debounce
  useEffect(() => {
    window.addEventListener("scroll", debounceToggleVisible);
    return () => {
      window.removeEventListener("scroll", debounceToggleVisible);
    };
  }, [debounceToggleVisible]);

  debounceToggleVisible.cancel();

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
