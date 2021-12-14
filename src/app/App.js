import Search from "../components/Search";
import PostList from "../components/PostList";
import "../reset.css";
import "../App.css";

function App() {
  return (
    <div className="container">
      <div>
        <header>
          <h1>Get All the Posts from Your Favorite Subreddits</h1>
        </header>
        <Search />
        <PostList />
      </div>
      <div>
        <footer>&copy; All Rights Reserved</footer>
      </div>
    </div>
  );
}

export default App;
