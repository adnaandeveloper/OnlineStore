import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
