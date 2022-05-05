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

const Updateschema = Joi.object({
  author: Joi.string().min(3).max(30).optional().messages({
    "any.required": "author should be provided",
    "string.base": "title should be type 'string'"
  }),
  title: Joi.string().min(3).max(30).optional().messages({
    "any.required": "title should be provided",
    "string.base": "title should be type 'string'"
  }),
  isbn: Joi.string().min(3).max(30).optional().messages({
    "any.required": "isbn should be there"
  })
});

router.post("/", async (req, res, next) => {
  try {
    const body = await schema.validateAsync(req.body);

    const book = await books.create(req.body);
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
    if (req.query.author) {
      condition["author"] = req.query.author;
    }
    if (req.query.title) {
      condition["title"] = req.query.title;
    }
    if (req.query.id) {
      condition["isbn"] = req.query.isbn;
    }
    const book = await books.find(condition);
    const Book = await book.map((b) => {
      return {
        author: b.author,
        title: b.title,
        isbn: b.isbn,
        id: b._id.toString()
      };
    });
    res.status(200).json(Book);
  } catch (err) {
    next(err);
  }
});

// get book by id
router.get("/:id", async (req, res, next) => {
  try {
    let book;

    book = await books.findById(req.params.id);
    if (book == null) {
      return res.status(404).send("Invalid book id");
    }
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
});
// update book by id
router.post("/:id", async (req, res, next) => {
  try {
    const unique_id = req.params.id;
    await Updateschema.validateAsync(req.body);
    const resbook = await books.findByIdAndUpdate(unique_id, req.body, {
      new: true
    });
    if (!resbook) {
      console.log("invalid id");
    }
    res.status(200).send({
      author: resbook.author,
      title: resbook.title,
      isbn: resbook.isbn,
      id: resbook._id.toString()
    });
  } catch (err) {
    next(err);
  }
});

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
