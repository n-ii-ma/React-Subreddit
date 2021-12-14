const RedditPost = ({ post }) => {
  return (
    <div className="box">
      <p className="upvotes">{post.ups} Upvotes</p>
      <p className="author">u/{post.author}</p>
      <p className="title">{post.title}</p>
      {post.url.endsWith(".jpg") ||
      post.url.endsWith(".gif") ||
      post.url.endsWith(".png") ? (
        <img src={post.url} className="images" alt="Subreddit Images" />
      ) : (
        ""
      )}
      <div className="gallery">
        {post.is_gallery
          ? post.gallery_data.items.map((item) => (
              <img
                src={`https://i.redd.it/${item.media_id}.jpg`}
                key={item.media_id}
                className="gallery-images"
                alt="Gallery Images"
              />
            ))
          : ""}
      </div>
      {post.is_video ? (
        <video controls className="videos">
          <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        ""
      )}
    </div>
  );
};

export default RedditPost;
