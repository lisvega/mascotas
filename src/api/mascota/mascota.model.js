const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: { type: String, required: true },
        type: { type: Number, required: true },
        description: { type: String, required: true },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("mascota", schema);
