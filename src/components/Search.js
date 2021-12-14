import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../features/post/redditPostSlice";

const Search = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const hotApiAddress = `https://www.reddit.com/r/${input}/hot.json`;
  const topApiAddress = `https://www.reddit.com/r/${input}/top.json`;
  const newApiAddress = `https://www.reddit.com/r/${input}/new.json`;

  const handleHot = (e) => {
    e.preventDefault();
    if (!input) return;

    dispatch(getPosts(hotApiAddress));
  };

  const handleTop = (e) => {
    e.preventDefault();
    if (!input) return;

    dispatch(getPosts(topApiAddress));
  };

  const handleNew = (e) => {
    e.preventDefault();
    if (!input) return;

    dispatch(getPosts(newApiAddress));
  };

  return (
    <form>
      <label htmlFor="search" className="search-label">
        Search Subreddits
      </label>
      <input
        type="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="search-input"
        placeholder="E.g.:SelenaGomez"
        required
      />
      <br />
      <button type="submit" onClick={handleHot} className="search-btn">
        Hot Posts
      </button>
      <button type="submit" onClick={handleTop} className="search-btn">
        Top Posts Today
      </button>
      <button type="submit" onClick={handleNew} className="search-btn">
        New Posts
      </button>
    </form>
  );
};

export default Search;
