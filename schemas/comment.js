const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  commentsId: {
    type: Number,
    required: true, // 이 값은 필수적이다.
    unique: true, // 이 값은 유일하다.
  },
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cmt: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("comments", commentsSchema);
