const mongoose = require("mongoose");

const growthRecordSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true
    },

    measurementDate: {
      type: Date,
      required: true,
      default: Date.now
    },

    weight: {
      type: Number,
      required: true,
      min: 0
    },

    height: {
      type: Number,
      required: true,
      min: 0
    },

    bmi: {
      type: Number,
      default: null
    },

    nutritionStatus: {
      type: String,
      enum: ["Normal", "MAM", "SAM", "Unknown"],
      default: "Unknown"
    },

    notes: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "GrowthRecord",
  growthRecordSchema
);