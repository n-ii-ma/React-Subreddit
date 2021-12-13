import { useDispatch } from "react-redux";
import { getPosts } from "../features/post/redditPostSlice";

const Button = () => {
  const dispatch = useDispatch();

  const handlePost = () => {
    dispatch(getPosts());
  };

  return (
    <div>
      <button onClick={handlePost}>Get Post</button>
    </div>
  );
};

export default Button;
