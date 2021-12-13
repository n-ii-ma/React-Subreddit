const RedditPost = ({ post }) => {
  return (
    <div className="box">
      <p className="upvotes">{post.ups} Upvotes</p>
      <p className="author">u/{post.author}</p>
      <p className="title">{post.title}</p>
      {post.url.endsWith(".jpg") || post.url.endsWith(".gif") ? (
        <img src={post.url} alt="Subreddit Images" />
      ) : (
        <p className="error">Image Not Available</p>
      )}
    </div>
  );
};

export default RedditPost;
