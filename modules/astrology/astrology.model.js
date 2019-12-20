const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const AstroSchema = mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User" },
    birth_moon_sign: {
      type: String,
      required: true
    },
    birth_moon_nakshatra: {
      type: String,
      required: true
    },
    prediction_date: {
      type: String,
      required: true
    },
    prediction: {
      health: {
        type: String,
        required: true
      },
      emotions: {
        type: String,
        required: true
      },
      profession: {
        type: String,
        required: true
      },
      luck: {
        type: String,
        required: true
      },
      personal_life: {
        type: String,
        required: true
      },
      travel: {
        type: String,
        required: true
      }
    }
  },
  {
    collection: "astros",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    toObject: {
      virtuals: true
    },
    toJson: {
      virtuals: true
    }
  }
);
module.exports = mongoose.model("Astro", AstroSchema);
