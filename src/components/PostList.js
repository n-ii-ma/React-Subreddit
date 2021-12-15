import { useSelector } from "react-redux";
import RedditPost from "../features/post/RedditPost";
import {
  selectRedditPosts,
  selectPostsAreLoading,
  selectPostsHaveError,
} from "../features/post/redditPostSlice";
import AreLoading from "./AreLoading";
import HaveError from "./HaveError";

const PostList = () => {
  const redditPosts = useSelector(selectRedditPosts);
  const postsAreLoading = useSelector(selectPostsAreLoading);
  const postsHaveError = useSelector(selectPostsHaveError);

  // Show Loading and Error Components when Post is Loading or has Error, repectively
  if (postsAreLoading) return <AreLoading />;
  if (postsHaveError) return <HaveError />;

  return (
    <div>
      {!redditPosts.children
        ? ""
        : redditPosts.children.map((post) => (
            <RedditPost post={post.data} key={post.data.id} />
          ))}
    </div>
  );
};

export default PostList;
