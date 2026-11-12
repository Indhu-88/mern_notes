import Note from "../models/Note.js";

// app.use('/api/notes', noteRoutes);     //server.js
// router.get('/',getAllnotes);           //notesRoutes.js
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //-1  -->Last Note first
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in Notes Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export async function createNote(req, res) {
  try {
    const { title, content } = req.body; //  app.use(express.json())
    const newNote = new Note({ title: title, content: content });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error in CreateNote Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateANote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true },
    ); //get id and update title or content

    if (!updatedNote) return res.status(404).json({ message: "No Note found" }); //id doesnt match
    res.status(200).json(updatedNote); //success
  } catch (error) {
    console.log("Error in Delete Note Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const deleteANote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" }); //when id number is wrong

    res.status(200).json({ message: "Note deleted successfully" }); //success
  } catch (error) {
    console.log("Error in DeleteNote Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export async function getNoteById(req, res) {
  try {
    const { title, content } = req.body;
    const note = await Note.findById(req.params.id);

    if (!note) res.status(400).json({ message: "No Note found" });
    res.status(200).json(note);
  } catch (error) {
    console.log("Error in getNotesById block", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
