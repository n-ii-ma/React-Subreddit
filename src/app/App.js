import Search from "../components/Search";
import PostList from "../components/PostList";
import "../reset.css";
import "../App.css";

function App() {
  return (
    <div className="App">
      <h1>Get All the Posts from Your Favorite Subreddits</h1>
      <Search />
      <PostList />
    </div>
  );
}

export default App;
