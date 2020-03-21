const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    fbmsn_id:{
      type: String,
    },
    birth_moon_sign: {
      type: String,
    },
    birth_moon_nakshatra: {
      type: String,
    },
    name: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      $in: ["male", "female", "others"]
    },
    phone: {
      type: String,
      // required: true
    },
    dob: {
      year: {
        type: String,
        required: true
      },
      month: {
        type: String,
        required: true
      },
      day: {
        type: String,
        required: true
      },
      hour: {
        type: String,
        required: true
      },
      min: {
        type: String,
        required: true
      }
    },
    pob: {
      place: {
        type: String,
        required: true
      },
      coordinates: {
        longitude: {
          type: Number
        },
        latitude: {
          type: Number
        }
      }
    },
    gothra: {
      type: String,
      required: true
    },
    currentLocation: {
      place: {
        type: String,
        required: true
      },
      coordinates: {
        longitude: {
          type: Number
        },
        latitude: {
          type: Number
        }
      }
    },
    lang: {
      type: String,
      $in: ["en", "te"]
    },
    isActive: {
      type: Boolean,
      required: false
    }
  },
  {
    collection: "users",
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

module.exports = mongoose.model("User", UserSchema);
