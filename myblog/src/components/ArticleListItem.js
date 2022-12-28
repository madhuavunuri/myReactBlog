const ArticleListItem = ({ title, description }) => {
  return (
    <>
      <h3>{title}</h3>
      <p>{description[0].substring(0, 150)}...</p>
    </>
  );
};

export default ArticleListItem;
