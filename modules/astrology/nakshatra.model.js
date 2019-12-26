const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const NakshatraSchema = mongoose.Schema(
  {
    birth_moon_sign: {
      type: String,
      // required: true
    },
    birth_moon_nakshatra: {
      type: String,
      // required: true
    },
    prediction_date: {
      type: String,
      // required: true
    },
    prediction: {
      health: {
        type: String,
      },
      emotions: {
        type: String,
      },
      profession: {
        type: String,
      },
      luck: {
        type: String,
      },
      personal_life: {
        type: String,
      },
      travel: {
        type: String,
      }
    }
  },
  {
    collection: "nakshatras",
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
module.exports = mongoose.model("Nakshatra", NakshatraSchema);
