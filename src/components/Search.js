import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../features/post/redditPostSlice";

const Search = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const apiAddress = `https://www.reddit.com/r/${input}.json`;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!input) return;

    dispatch(getPosts(apiAddress));
  };

  return (
    <form onSubmit={handleSearch}>
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
      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
};

export default Search;
