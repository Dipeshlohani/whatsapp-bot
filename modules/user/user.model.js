const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      $in: ["male", "female", "others"]
    },
    whatsappName: {
      type: String
    },
    phone: {
      type: String,
      required: true
    },
    dob: {
      type: Date,
      required: true
    },
    pob: {
      place: {
        type: String,
        required: true
      },
      coordinates: {
        longitute: {
          type: Number,
          required: true
        },
        latitude: {
          type: Number,
          required: true
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
        longitute: {
          type: Number,
          required: true
        },
        latitude: {
          type: Number,
          required: true
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
