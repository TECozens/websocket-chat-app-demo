const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// NOTE data I want to save, note I am saving it as a stringified json
const roomSchema = new Schema(
    {
        room: String,
    }
);

// NOTE  export the defaults
module.exports = mongoose.model('Rooms', roomSchema);