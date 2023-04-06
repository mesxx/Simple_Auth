const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "staff",
      enum: ["admin", "staff"],
    },
  },
  { strict: true }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;
