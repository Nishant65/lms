const express = require("express");
const { request } = require("http");
const Joi = require("joi");
const books = require("../models/books");
const router = express.Router();

const schema = Joi.object({
  author: Joi.string().min(3).max(30).required().messages({
    "any.required": "author should be provided",
    "string.base": "author should be type 'string'"
  }),
  title: Joi.string().min(3).max(30).required().messages({
    "any.required": "title should be provided",
    "string.base": "title should be type 'string'",
    "string.min": "title length must be at least 3 characters long"
  }),
  isbn: Joi.string().min(3).max(30).required().messages({
    "any.required": "isbn should be there"
  })
});
router.post("/", async (req, res, next) => {
  try {
    const body = await schema.validateAsync(req.body);

    const book = await books.create(body);
    var responseBook = {
      author: book.author,
      title: book.title,
      isbn: book.isbn,
      id: book._id.toString()
    };
    res.status(201).send(responseBook);
  } catch (err) {
    next(err);
  }
});

// get all books
router.get("/", async (req, res, next) => {
  try {
    let condition = {};
    if (req.query) {
      if (req.query.author != null) {
        condition = { author: request.query.author };
      }
      if (req.query.title != null) {
        condition = { title: request.query.title };
      }
      // if (req.query.isbn != null) {
      //condition = { isbn: request.body.isbn };
      //}
    }
    const book = await books.find(condition);
    res.send(book);
  } catch (err) {
    //console.log("hi");
    next(err);
  }
});

// get book by id
router.get("/", async (req, res, next) => {
  try {
    let book;

    book = await books.findById(req.params.id);
    if (book == null) {
      return res.status(404).send("Cannot find subscriber");
    }
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
});
// // update book by id
// router.patch("/:id", async (req, res) => {
//   if (req.body.author != null) {
//     res.books.author = req.body.author;
//   }
//   if (req.body.title != null) {
//     res.books.title = req.body.title;
//   }
//   if (req.body.isbn != null) {
//     res.books.isbn = req.body.isbn;
//   }
//   const body = await schema.validateAsync(req.body);
// });

// delete book by id
router.delete("/:id", async (req, res) => {
  try {
    const book = await books.findById(req.params.id);
    await book.remove();
    console.log("book is deleted");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
// router.post("/", (req, res, next) => {
//   const { title, author, isbn } = req.body;
//   if (!title && !isbn && !author) {
//     next(new Error("properties can't be null"));
//   } else if (!title) {
//     next(new Error("title should be provided"));
//   } else if (title.length < 3) {
//     next(new Error("title length must be at least 3 characters long"));
//   } else if (!author) {
//     next(new Error("author should be provided"));
//   } else if (!isbn) {
//     next(new Error("isbn should be there"));
//   } else {
//     res.status(200).send("this api will create a new book");
//   }
// });

// router.get("/", (req, res) => {
//   res.status(200).send("this api will provide u all books ");
// });

// router.put("/:id", (req, res, next) => {
//   const { title, author, isbn } = req.body;
// });

module.exports = router;
