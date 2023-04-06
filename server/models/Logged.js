const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const LoggedSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: "users",
    },
    createdAt: {
      type: Date,
      required: true,
      default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    },
  },
  { strict: true }
);

const Logged = mongoose.model("logged", LoggedSchema);
module.exports = Logged;
