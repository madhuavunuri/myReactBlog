import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddCommentForm from "../components/AddCommentForm";
import CommentsList from "../components/CommentsList";
import useUser from "../hooks/useUser";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
  const { articleId } = useParams();
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      setArticleInfo(response.data);
    };
    loadArticleInfo();
  }, []);

  const article = articles.find((ar) => ar.name === articleId);

  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    setArticleInfo(response.data);
  };

  if (!article) return <NotFoundPage />;

  return (
    <>
      <h1>{article.title}</h1>

      <div className="upvotes-sections">
        {user ? (
          <button onClick={addUpvote}>Upvote</button>
        ) : (
          <button>Log in to upvote</button>
        )}
      </div>

      <p>This article has {articleInfo.upvotes} upvotes</p>

      {article.content.map((par, i) => (
        <p key={i}>{par}</p>
      ))}
      
      {user ? (
        <AddCommentForm
          articleName={articleId}
          onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
        />
      ) : (
        <button>Login to add Comment</button>
      )}

      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
