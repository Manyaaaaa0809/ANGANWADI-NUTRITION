const mongoose = require("mongoose");

const mealLogSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true
    },

    date: {
      type: Date,
      required: true,
      default: Date.now
    },

    breakfast: {
      mealName: String,
      calories: Number,
      protein: Number,
      consumed: {
        type: Boolean,
        default: false
      }
    },

    hotCookedMeal: {
      mealName: String,
      calories: Number,
      protein: Number,
      consumed: {
        type: Boolean,
        default: false
      }
    },

    takeHomeRation: {
      mealName: String,
      calories: Number,
      protein: Number,
      consumed: {
        type: Boolean,
        default: false
      }
    },

    totalCalories: {
      type: Number,
      default: 0
    },

    totalProtein: {
      type: Number,
      default: 0
    },

    nutrientDeficit: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "MealLog",
  mealLogSchema
);