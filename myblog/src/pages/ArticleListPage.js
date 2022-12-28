import { Link } from "react-router-dom";
import ArticleListItem from "../components/ArticleListItem";
import articles from "./article-content";

const ArticleListPage = () => {
  return (
    <>
      <h1>Articles</h1>
      {articles?.map((article) => (
        <Link className = "article-list-item" to = {`/articles/${article.name}`} key={article.name}>
          <ArticleListItem title={article.title} description={article.content}/>
        </Link>
      ))}
    </>
  );
};

export default ArticleListPage;
