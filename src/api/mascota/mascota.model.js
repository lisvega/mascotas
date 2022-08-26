const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        petname: { type: String, required: true, unique: true },
        nickname: { type: String, required: true },
        password: { type: String, required: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        description: { type: String, required: true },

    },
    {
        timestamps: true,
    }
);

schema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});



module.exports = mongoose.model("mascota", schema);
