import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
  const { articleId } = useParams();
  const article = articles.find((ar) => ar.name === articleId);

  if(!article) return <NotFoundPage/>
  
  return (
    <>
      <h1>{article.title}</h1>
      {article.content.map((par, i) => (
        <p key={i}>{par}</p>
      ))}
    </>
  );
};

export default ArticlePage;
