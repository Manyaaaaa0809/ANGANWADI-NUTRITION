const mongoose = require("mongoose");

const childSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    dob: {
      type: Date,
      required: true
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true
    },

    parentGuardian: {
      type: String,
      required: true,
      trim: true
    },

    poshanId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    anganwadiCenter: {
      type: String,
      required: true,
      trim: true
    },

    currentWeight: {
      type: Number,
      default: null
    },

    currentHeight: {
      type: Number,
      default: null
    },

    nutritionStatus: {
      type: String,
      enum: ["Normal", "MAM", "SAM", "Unknown"],
      default: "Unknown"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Child", childSchema);