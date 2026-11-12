import mongoose from "mongoose";

//Create a Schema --> two objects: {title,content},{timestamps}
const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, //createdAt,updatedAt
);

//model based on that schema
const Note = mongoose.model("Note", noteSchema); //create Note following noteSchema

export default Note;

// POSTMAN
// sudo snap install postman
