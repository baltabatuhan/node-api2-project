const express = require("express");

const db = require("./data/db");
const postRouter = require("./data/post-routers/PostRouter");

const server = express();
const port = 8000;

server.use(express.json());

server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.json({ message: "Coban yildizi" });
});

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
