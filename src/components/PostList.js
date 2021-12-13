import { useSelector } from "react-redux";
import RedditPost from "../features/post/RedditPost";
import { selectRedditPost } from "../features/post/redditPostSlice";
import { selectPostIsLoading } from "../features/post/redditPostSlice";
import { selectPostHasError } from "../features/post/redditPostSlice";
import IsLoading from "./IsLoading";
import HasError from "./HasError";

const PostList = () => {
  const redditPost = useSelector(selectRedditPost);
  const postIsLoading = useSelector(selectPostIsLoading);
  const postHasError = useSelector(selectPostHasError);

  if (postIsLoading) return <IsLoading />;
  if (postHasError) return <HasError />;

  return (
    <div>
      {!redditPost
        ? ""
        : redditPost.map((post) => (
            <RedditPost post={post.data} key={post.data.id} />
          ))}
    </div>
  );
};

export default PostList;
