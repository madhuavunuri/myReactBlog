import express from "express";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());

app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;

  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();

  const db = client.db("react-blog-db");
  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;

  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();

  const db = client.db("react-blog-db");
  await db.collection("articles").updateOne(
    { name },
    {
      $inc: { upvotes: 1 },
    }
  );

  const article = await db.collection("articles").findOne({ name });
  if (article) {
    res.send(`Article ${article.name} up voted - total :${article.upvotes}`);
  } else {
    res.send(`Article not found`);
  }
});

app.post("/api/articles/:name/comments", (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;
  console.log(req.body);
  console.log({ postedBy, text });
  const article = articlesInfo.find((art) => art.name === name);
  if (article) {
    article.comments.push({ postedBy, text });
    res.send(article.comments);
  } else {
    res.send(`Article not found`);
  }
});

app.listen(8000, () => {
  console.log("Server is up on port : 8000");
});
