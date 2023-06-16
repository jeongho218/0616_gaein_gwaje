const express = require("express"); // express를 할당받는다

const router = express.Router(); // 객체 express 안에 있는 함수 Router()를 실행시켜 그 값을 변수 router에 할당한다

const Posts = require("../schemas/post.js");
const Comments = require("../schemas/comment.js");

// localhost:3000/api/ 접근 시 출력되는 내용
router.get("/", (req, res) => {
  // res.send("default url for posts.js GET Method");
  res.send("게시글 정보는 /api/posts, 댓글 정보는 /api/comments");
});

// posts 목록 조회 API, localhost:3000/api/posts
router.get("/posts", async (req, res) => {
  const posts = await Posts.find({});
  res.json({ posts: posts });
});

// posts 상세 조회 API, localhost:3000/api/posts/:postsId
router.get("/posts/:postsId", async (req, res) => {
  const posts = await Posts.find({});
  const { postsId } = req.params;

  let result = null;

  for (const post of posts) {
    if (Number(postsId) === post.postsId) {
      result = post;
    }
  }

  res.status(200).json({ detail: result });
});

// 게시글 작성, post
router.post("/posts/", async (req, res) => {
  const { postsId, user, password, title, content, createdAt } = req.body;
  const posts = await Posts.find({ postsId });

  // postsId가 중복되는 내용이면 작성이 되지 않도록
  if (posts.length) {
    // posts의 길이가 0이 아니라는 것은 내용이 있다는 의미이다.(truthy 한 값) 여기서와 반대로 필수적인 항목을 빠뜨린채로 POST하려한다면 에러메세지를 띄울수도 있겠다
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 postsId입니다.",
    });
  }

  const createdPosts = await Posts.create({
    postsId,
    user,
    password,
    title,
    content,
    createdAt,
  });

  res.json({ posts: createdPosts });
});

// 게시글 수정, put
router.put("/posts/:postsId", async (req, res) => {
  const { postsId } = req.params;
  const { content } = req.body;
  const existPosts = await Posts.find({ postsId });

  if (existPosts.length) {
    await Posts.updateOne({ postsId: postsId }, { $set: { content: content } }); // postsId가 일치할때 content의 내용을 새로 입력받은 content로 교체하겠다는 의미 $set은 MongoDB의 업데이트 연산자이다.
  }
  res.status(200).json({ success: true });
});

// 게시글 삭제, delete
router.delete("/posts/:postsId", async (req, res) => {
  const { postsId } = req.params;
  const existPosts = await Posts.find({ postsId });

  if (existPosts.length) {
    await Posts.deleteOne({ postsId });
  }

  res.json({ result: "삭제 완료" });
});

module.exports = router;
// 위 내용을 app.js로 보내기 위한 export
