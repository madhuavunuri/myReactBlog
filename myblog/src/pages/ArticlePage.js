import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentsList from "../components/CommentsList";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
  const { articleId } = useParams();

  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      setArticleInfo(response.data);
    };

    loadArticleInfo();
  }, []);

  const article = articles.find((ar) => ar.name === articleId);

  if (!article) return <NotFoundPage />;

  return (
    <>
      <h1>{article.title}</h1>
      <p>This article has {articleInfo.upvotes} upvotes</p>
      {article.content.map((par, i) => (
        <p key={i}>{par}</p>
      ))}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
