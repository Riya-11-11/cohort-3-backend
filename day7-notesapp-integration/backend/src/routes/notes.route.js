const express = require("express");
const {
  createNotesController,
  getAllNotesController,
  getSingleNoteController,
  updateNotesController,
  deleteNoteController,
  singleEntityUpdateController,
} = require("../controllers/notes.controller");

const router = express.Router();
//create
router.post("/create", createNotesController);

//read
router.get("/allNotes", getAllNotesController);

//read one
router.get("/:id", getSingleNoteController);

//update via put
router.put("/:id", updateNotesController);

//update via patch
router.patch("/:id/single", singleEntityUpdateController);

//delete
router.delete("/:id", deleteNoteController);

module.exports = router;
