const express = require("express");
const Joi = require("joi");
const users = require("../models/users");
const router = express.Router();

const postschema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "name should be provided",
    "string.base": "name should be type 'string'"
  }),
  dob: Joi.string().min(10).required().messages({
    "any.required": "dob should be provided"
  })
});

router.post("/", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});
