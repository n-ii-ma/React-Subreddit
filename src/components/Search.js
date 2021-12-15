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
  const apiAddress = `https://www.reddit.com/r/${input}.json?limit=10`;
  const moreApiAddress = `https://www.reddit.com/r/${input}.json?limit=10&after=${lastPost()}`;

  // Get Hot Posts
  const handlePost = (e) => {
    e.preventDefault();
    if (!input) return;

    dispatch(getPosts(apiAddress));
  };

  // Fire Upon Reaching the Bottom of the Page
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;

    setIsFetching(true);
  };

  // Debounce the Scroll Event Function and Cancel it When Called
  const debounceHandleScroll = debounce(handleScroll, 100);

  useEffect(() => {
    window.addEventListener("scroll", debounceHandleScroll);
    return () => window.removeEventListener("scroll", debounceHandleScroll);
  }, [debounceHandleScroll]);

  debounceHandleScroll.cancel();

  // Get More Posts
  const loadMoreItems = useCallback(() => {
    dispatch(getMorePosts(moreApiAddress));
    setIsFetching(false);
  }, [dispatch, moreApiAddress]);

  useEffect(() => {
    if (!isFetching) return;
    loadMoreItems();
  }, [isFetching, loadMoreItems]);

  return (
    <form onSubmit={handlePost}>
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
