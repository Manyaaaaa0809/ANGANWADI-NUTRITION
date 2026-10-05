const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema(
  {
    ageGroup: {
      type: String,
      required: true
    },

    mealName: {
      type: String,
      required: true
    },

    mealType: {
      type: String,
      enum: [
        "Breakfast",
        "Hot Cooked Meal",
        "Take-Home Ration",
        "Snack"
      ],
      required: true
    },

    ingredients: [
      {
        name: String,
        quantity: String
      }
    ],

    calories: {
      type: Number,
      default: 0
    },

    protein: {
      type: Number,
      default: 0
    },

    nutrients: [
      {
        type: String
      }
    ],

    suitableFor: [
      {
        type: String,
        enum: ["Normal", "MAM", "SAM", "All"]
      }
    ],

    lowCost: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "MealPlan",
  mealPlanSchema
);