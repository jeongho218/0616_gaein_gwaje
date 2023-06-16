const express = require("express");
const app = express();
const port = 3000;

// routes를 불러오는 부분
const postsRouter = require("./routes/posts.js"); // /routes/posts.js의 내용을 받아와 변수 postsRouter에 할당한다

const commentsRouter = require("./routes/comments.js"); // /routes/comments.js의 내용을 받아와 변수 commentsRouter에 할당한다.

// schemas를 불러오는 부분
const connect = require("./schemas/index.js");
// 이 부분에서 index.js는 생략 가능하다.
// node.js에서는 폴더의 경로까지 지정하였을 경우 해당 폴더안에 있는 index.js를 자동적으로 가져오기 때문이다.
connect(); // mongoose를 이용해 MongoDB 서버와 DB에 연결한다.

app.get("/", (req, res) => {
  res.send(`Hi <br><br>
  You can find posts and comments on<br>
  localhost:3000/api/posts and localhost:3000/api/comments`);
});

app.use(express.json()); // express에서 미들어웨럴 사용하는 방법. body를 통해 들어오는 JSON 형식의 요청 내용을 JS 객체로 변환한다.
app.use("/api", [postsRouter, commentsRouter]); // app.use는 express에게 모든 미들웨어가 이 곳을 통과할것이다라는 것을 알려주기 위함
// 기본 URL 뒤 /api 가 경로로서 추가될 경우 사용자를 postsRouter 라우터로 보낸다.
// ex) localhost:3000/api -> postsRouter

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
