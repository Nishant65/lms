const express = require("express");
//const { request } = require("http");
const Joi = require("joi");
const books = require("../models/books");
const loans = require("../models/users");
const students = require("../models/students");
const router = express.Router();

const poststudentschema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "name should be provided",
    "string.base": "name should be type 'string'"
  })
});

// const postloanschema = Joi.object({
//   outDate: Joi.date().required().message({
//     "any.required": "date should be provided",
//     "date.base": "outDate should be type 'date'"
//   }),
//   returnDate: Joi.date().required().message({
//     "any.required": "date should be provided",
//     "date.base": "outDate should be type 'date'"
//   })
// });

// get all students
router.get("/student", async (req, res, next) => {
  try {
    let condition = {};
    if (req.query.name) {
      condition["name"] = req.query.name;
    }
    const s = await students.find(condition);
    if (!s) {
      throw new Error("Invalid student name");
    }
    const response = await s.map((u) => {
      return {
        name: u.name,
        id: u._id.toString()
      };
    });
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

// get all loans
router.get("/loan", async (req, res, next) => {
  try {
    let condition = {};
    if (req.query.bookId) {
      condition["bookId"] = req.query.bookId;
    }
    if (req.query.studentId) {
      condition["studentId"] = req.query.studentId;
    }
    if (req.query.outDate) {
      condition["outDate"] = req.query.outDate;
    }
    if (req.query.returnDate) {
      condition["returnDate"] = req.query.returnDate;
    }

    //console.log(JSON.stringify(condition));
    const user = await loans.find(condition);
    //const user = await loans.find();
    //console.log(book + " heyy");

    const User = await user.map((u) => {
      return {
        bookId: u.bookId,
        studentId: u.studentId,
        outDate: u.outDate,
        returnDate: u.returnDate,
        id: u._id.toString()
      };
    });

    res.status(200).json(User);
  } catch (err) {
    next(err);
  }
});

// get studnet by id
router.get("/student/:id", async (req, res, next) => {
  try {
    const s = await students.findById(req.params.id);
    if (!s) {
      throw Error("Invalid student Id");
    }
    const responsestudent = {
      name: s.name,
      id: s._id.toString()
    };
    res.status(200).send(responsestudent);
  } catch (err) {
    next(err);
  }
});

//get loan by id
router.get("/loan/:id", async (req, res, next) => {
  try {
    const l = await loans.findById(req.params.id);
    if (!l) {
      throw new Error("Invalid loan Id");
    }
    /*const student = await students.findById(req.body.studentId);
    if (!student) {
      throw new Error("Invalid student Id");
    }
    const book = await books.findById(req.body.bookId);
    if (!book) {
      throw new Error("Invalid book Id");
    }*/
    const responseloan = {
      bookId: l.bookId,
      studentId: l.studentId,
      outDate: l.outDate,
      returnDate: l.returnDate,
      id: l._id.toString()
    };
    res.status(200).send(responseloan);
  } catch (err) {
    next(err);
  }
});

// create student
router.post("/student", async (req, res, next) => {
  try {
    const body = await poststudentschema.validateAsync(req.body);

    const s = await students.create(req.body);

    const responsestudent = {
      name: s.name,
      id: s._id.toString()
    };
    res.status(201).send(responsestudent);
    // console.log(JSON.stringify(response));
  } catch (err) {
    next(err);
  }
});

// create new loan
router.post("/loan", async (req, res, next) => {
  try {
    //const body = await postloanschema.validateAsync(req.body);

    const book = await books.findById(req.body.bookId);

    if (!book) {
      throw new Error("Invalid Book Id");
    }

    const user = await students.findById(req.body.studentId);
    if (!user) {
      throw new Error("Invalid student Id");
    }

    const l = await loans.create(req.body);

    const responseloan = {
      bookId: l.bookId,
      studentId: l.studentId,
      outDate: l.outDate,
      returnDate: l.returnDate,
      id: l._id.toString()
    };

    res.status(201).send(responseloan);
    //console.log(JSON.stringify(response));
  } catch (err) {
    next(err);
  }
});

//update student info
router.post("/student/:id", async (req, res, next) => {
  try {
    await poststudentschema.validateAsync(req.body);
    const s = await students.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!s) {
      throw new Error("Invalid student Id");
    }
    const responsestudent = {
      name: s.name,
      id: s._id.toString()
    };
    res.status(201).send(responsestudent);
  } catch (err) {
    next(err);
  }
});

//update loan info
router.post("/loan/:id", async (req, res, next) => {
  try {
    const l = await loans.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!l) {
      throw new Error("Invalid loan Id");
    }
    const responseloan = {
      bookId: l.bookId,
      studentId: l.studentId,
      outDate: l.outDate,
      id: l._id.toString()
    };
    res.status(201).send(responseloan);
  } catch (err) {
    next(err);
  }
});

// delete loan
router.delete("/loan/:id", async (req, res, next) => {
  try {
    const l = await loans.findById(req.params.id);
    if (!l) {
      throw new Error("Invalid loan Id");
    }
    await l.remove();
    res.status(200).send("loan is deleted");
  } catch (err) {
    next(err);
  }
});
module.exports = router;
