const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries");
const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

app.get('/main.js', db.getJS)
app.get('/index', db.getIndexPage)
app.get('/index.css', db.getCSS)
app.get("/", (request, response) => {
  response.json({
    info: "Node.js, Postgres, hackernews mock site"
  });
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUser);
app.post("/users", db.postUser);
app.put("/users/:id", db.putUser);
app.delete("/users/:id", db.deleteUser);

app.get('/articles/:id', db.getArticle)
app.get('/articles', db.getArticles)
app.post('/articles', db.postArticle)
app.put("/articles/:id", db.putArticle);
app.delete("/articles/:id", db.deleteArticle);

app.get('/comments/:id', db.getComment)
app.get('/comments', db.getComments)
app.post('/comments', db.postComment)
app.put("/comments/:id", db.putComment);
app.delete("/comments/:id", db.deleteComment);

