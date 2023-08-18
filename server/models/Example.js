import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
});

const example = mongoose.model("example", exampleSchema); // user wird durch mongoose über MongoDB als userS gespeichert -> user == users; 3 Argument ist der eindeutige Eintrag -> user === user

export default example;
