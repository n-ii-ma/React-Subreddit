const HaveError = () => {
  return (
    <div>
      <p className="error">Couldn't Reach Reddit Servers!<br />Please Try Again</p>
      <p className="hint">Hint:<br />Make Sure to Write the Subreddit Name Correctly</p>
    </div>
  );
};

export default HaveError;
