const express = require("express");
const { getNotes, createNote, deleteNote, updateNote } = require("../controllers/noteController");
const auth = require("../authentication/auth");
const noteRoute = express.Router();

noteRoute.get("/", auth, getNotes);

noteRoute.post("/",auth, createNote);

noteRoute.delete("/:id",auth, deleteNote);

noteRoute.put("/:id",auth, updateNote);

module.exports = noteRoute;