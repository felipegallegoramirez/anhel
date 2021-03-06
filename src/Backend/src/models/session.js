const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema(
  {
    idprocess:String,
    idpatient:String,
    idpsichologist:String,
    start:String,
    end:String,
    price:Number,
    state:String,
    chat:[{
      message: String,
      sender:String,
      date:String
    }],
    namepsichologist:String
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = mongoose.model("session", sessionSchema);