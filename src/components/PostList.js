import { useSelector } from "react-redux";
import RedditPost from "../features/post/RedditPost";
import {
  selectRedditPost,
  selectPostIsLoading,
  selectPostHasError,
} from "../features/post/redditPostSlice";
import IsLoading from "./IsLoading";
import HasError from "./HasError";

const PostList = () => {
  const redditPost = useSelector(selectRedditPost);
  const postIsLoading = useSelector(selectPostIsLoading);
  const postHasError = useSelector(selectPostHasError);

  // Show Loading and Error Components when Post is Loading or has Error, repectively
  if (postIsLoading) return <IsLoading />;
  if (postHasError) return <HasError />;

  return (
    <div>
      {!redditPost.children
        ? ""
        : redditPost.children.map((post) => (
            <RedditPost post={post.data} key={post.data.id} />
          ))}
    </div>
  );
};

export default PostList;
