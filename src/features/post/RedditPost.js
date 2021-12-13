const RedditPost = ({ post }) => {
  /*   const galleryImages = () => {
    if (post.is_gallery) {
      post.gallery_data.items.map((item) => (
        <img
          src={`https://i.redd.it/${item.media_id}.jpg`}
          className="image"
          alt="Gallery Images"
        />
      ));
    }
  }; */

  // Check if post is a gallery and map through each image and get the id
  /*   if (post.is_gallery) {
    const test = post.gallery_data.items.map((item) => item.media_id);
    console.log(test);
  } */

  return (
    <div className="box">
      <p className="upvotes">{post.ups} Upvotes</p>
      <p className="author">u/{post.author}</p>
      <p className="title">{post.title}</p>
      {post.url.endsWith(".jpg") ||
      post.url.endsWith(".gif") ||
      post.url.endsWith(".png") ? (
        <img src={post.url} className="image" alt="Subreddit Images" />
      ) : (
        ""
      )}
      {post.is_gallery
        ? post.gallery_data.items.map((item) => (
            <div key={item.media_id} className="gallery">
              <img
                src={`https://i.redd.it/${item.media_id}.jpg`}
                className="image"
                alt="Gallery Images"
              />
            </div>
          ))
        : ""}
      {post.is_video ? (
        <video controls className="video">
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
