const mongoose = require("mongoose");
const { compareHashPassword, generatePasswordHash } = require("../lib/crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    role: {
      type: String,
      required: [true, "User role is required"],
      enum: ["user", "admin"],
      default: "user",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "local";
      },
      minlength: [6, "Password must be at least 6 characters long"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }

  try {
    this.password = await generatePasswordHash(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.password) {
    return false;
  }
  return await compareHashPassword(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;