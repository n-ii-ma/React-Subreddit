import { useSelector } from "react-redux";
import { selectMorePostsAreLoading } from "../features/post/redditPostSlice";
import { selectMorePostsHaveError } from "../features/post/redditPostSlice";
import Search from "../components/Search";
import PostList from "../components/PostList";
import ScrollTop from "../components/ScrollTop";
import MoreAreLoading from "../components/MoreAreLoading";
import MoreHaveError from "../components/MoreHaveError";
import "../reset.css";
import "../App.css";

function App() {
  const morePostsAreLoading = useSelector(selectMorePostsAreLoading);
  const morePostsHaveError = useSelector(selectMorePostsHaveError);

  return (
    <div className="container">
      <div>
        <header>
          <h1>Get All the Posts from Your Favorite Subreddits</h1>
        </header>
        <Search />
        <PostList />
      </div>
      <ScrollTop />
      <div>
        {morePostsAreLoading && <MoreAreLoading />}
        {morePostsHaveError && <MoreHaveError />}
        <footer>&copy; Reddix</footer>
      </div>
    </div>
  );
}

export default App;
