import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      rewqual: true,
    },
    email: {
      type: "String",
      rewqual: true,
      unique: true,
    },
    password: {
      type: "String",
      required: true,
    },

    isAdmin: {
      type: "boolean",
      required: true,
      default: false,
    },
  },
  {
    timeseries: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
