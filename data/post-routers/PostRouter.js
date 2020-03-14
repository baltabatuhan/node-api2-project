const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  db.find()
    .then((db) => {
      res.status(200).json(db);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "ERROR"
      });
    });
});

router.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then((post) => {
      if (!post[0]) {
        res.status(404).json({
          message: "ERROR ID"
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "ERROR"
      });
    });
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(400).json({
      message: "error"
    });
  }

  db.insert(req.body)
    .then((newPost) => {
      res.status(201).json(newPost);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "error"
      });
    });
});
router.post("/:id/comments", (req, res) => {
  console.log(req.body.text);
  console.log(req.params.id);
  const { text } = req.body;
  const post_id = req.params.id;

  db.findById(req.params.id).then((post) => {
    if (!post[0]) {
      res.status(404).json({ message: "id problem" });
    }
  });

  if (text.length < 1) {
    res.status(400).json({ errorMessage: "write something" });
  } else {
    db.insertComment({ text, post_id })
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((error) => {
        // log error to database
        console.log(error);
        res.status(500).json({
          error: "error"
        });
      });
  }
});

//                              DELETE request

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "Post Deleted."
        });
      } else {
        res.status(404).json({
          message: "id error"
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "DELETE PROBLEM."
      });
    });
});

//                              PUT request

router.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(400).json({
      message: "error."
    });
  }

  db.update(req.params.id, req.body)
    .then((db) => {
      if (db) {
        res.status(200).json(db);
      } else {
        res.status(404).json({
          message: "id error"
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "update problem"
      });
    });
});
module.exports = router;
