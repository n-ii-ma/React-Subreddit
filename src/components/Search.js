import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  getMorePosts,
  selectRedditPost,
} from "../features/post/redditPostSlice";

const Search = () => {
  const [input, setInput] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const redditPost = useSelector(selectRedditPost);
  const dispatch = useDispatch();

  // Get the Last Post
  const lastPost = () => {
    if (redditPost.children) {
      const [lastItem] = redditPost.children.slice(-1);

      const lastKind = lastItem.kind;
      const lastId = lastItem.data.id;

      return `${lastKind}_${lastId}`;
    } else {
      return;
    }
  };

  // API Endpoints
  const hotApiAddress = `https://www.reddit.com/r/${input}/hot.json?limit=10`;
  const newApiAddress = `https://www.reddit.com/r/${input}/new.json?limit=10`;
  const moreApiAddress = `https://www.reddit.com/r/${input}/new.json?limit=10&after=${lastPost()}`;

  // Get Hot Posts
  const handleHot = (e) => {
    e.preventDefault();
    if (!input) return;

    dispatch(getPosts(hotApiAddress));
  };

  // Get New Posts
  const handleNew = (e) => {
    e.preventDefault();
    if (!input) return;

    dispatch(getPosts(newApiAddress));
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;

    setIsFetching(true);
  };

  const debounceHandleScroll = debounce(handleScroll, 100);

  useEffect(() => {
    window.addEventListener("scroll", debounceHandleScroll);
    return () => window.removeEventListener("scroll", debounceHandleScroll);
  }, [debounceHandleScroll]);

  debounceHandleScroll.cancel();

  const loadMoreItems = useCallback(() => {
    dispatch(getMorePosts(moreApiAddress));
    setIsFetching(false);
  }, [dispatch, moreApiAddress]);

  useEffect(() => {
    if (!isFetching) return;
    loadMoreItems();
  }, [isFetching, loadMoreItems]);

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
      <button type="submit" onClick={handleNew} className="search-btn">
        New Posts
      </button>
    </form>
  );
};

export default Search;
