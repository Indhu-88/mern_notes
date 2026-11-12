import express from "express";
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateANote,
  deleteANote,
} from "../controllers/notesController.js";

const router = express.Router();

//from server.js
// app.use("/api/notes",noteRoutes);

router.get("/", getAllNotes);

router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/:id", updateANote);

router.delete("/:id", deleteANote);

export default router;

// express
// express() ---> creates main app object. This object is the core of server to setup middleware, routes
// express.Router()  --> creates mini application; Used to oraganise routes into separate files or modules.
