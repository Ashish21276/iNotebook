const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("error");
  }
});

router.post(
  "/addnote",
  fetchuser,
  [
    body("title").isLength({ min: 1 }),
    body("description").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.status(200).send(savedNote);
    } catch (error) {
      res.status(400).json({ error: "Catch Error" });
    }
  }
);

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Not Found");

    if (note.user.toString() !== req.user.id)
      return res.status(401).send("Not Allowed");

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    res.json("internal server error", error);
  }
});

router.delete("/deletenode/:id", fetchuser, async (req, res) => {
  let note = await Notes.findById(req.params.id);
  if (!note) return res.status(404).send("Not Found");

  if (note.user.toString() !== req.user.id)
    return res.status(401).send("Not Allowed");

  note = await Notes.findByIdAndDelete(req.params.id);

  res.json(note);
});

module.exports = router;
