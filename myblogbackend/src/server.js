import express from "express";

let articlesInfo = [
  {
    name: "learn-react",
    upvotes: 0,
    comments: [],
  },
  {
    name: "mongo",
    upvotes: 0,
    comments : [],
  },
];
const app = express();

app.use(express.json());

app.put("/api/articles/:name/upvote", (req, res) => {
  const { name } = req.params;
  const article = articlesInfo.find(art => art.name === name);
  if (article) {
    article.upvotes += 1;
    res.send(`Article ${article.name} up voted - total :${article.upvotes}`);
  }
  else
  {
    res.send(`Article not found`);
  }
});

app.post("/api/articles/:name/comments", (req, res) =>
{
    const {name} = req.params;
    const { postedBy , text} = req.body;
    console.log(req.body);
    console.log({ postedBy , text});
    const article = articlesInfo.find(art => art.name === name);
    if(article)
    {
        article.comments.push({postedBy , text});
        res.send(article.comments);
    }
    else
    {
        res.send(`Article not found`);
    }
});

app.listen(8000, () => {
  console.log("Server is up on port : 8000");
});
