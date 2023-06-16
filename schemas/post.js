const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  postsId: {
    type: Number,
    required: true, // 이 값은 필수적이다.
    unique: true, // 이 값은 유일하다.
  },
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String, // 문자와 숫자를 혼합한 패스워드를 사용할 수도 있으므로 데이터 타입은 문자열을 사용한다.
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("posts", postsSchema);
