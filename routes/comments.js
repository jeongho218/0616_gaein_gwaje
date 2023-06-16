const express = require("express"); // express를 할당받는다

const router = express.Router(); // 객체 express 안에 있는 함수 Router()를 실행시켜 그 값을 변수 router에 할당한다

const Comments = require("../schemas/comment.js");

// comments 작성, post
router.post("/comments/", async (req, res) => {
  const { commentsId, user, password, cmt, createdAt } = req.body;
  const comments = await Comments.find({ commentsId });

  if (comments.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 commentsId입니다.",
    });
  }

  const createdComments = await Comments.create({
    commentsId,
    user,
    password,
    cmt,
    createdAt,
  });
  res.json({ comments: createdComments });
});

// comments 목록 조회, read, localhost:3000/api/comments
router.get("/comments", async (req, res) => {
  const comments = await Comments.find({});
  res.json({ comments: comments });
});

// comments 상세 조회, localhost:3000/api/comments/:commentsId
router.get("/comments/:commentsId", async (req, res) => {
  const comments = await Comments.find({});
  const { commentsId } = req.params;

  let result = null;

  for (const comment of comments) {
    if (Number(commentsId) === comment.commentsId) {
      result = comment;
    }
  }

  res.status(200).json({ detail: result });
});

// comments 수정, put
router.put("/comments/:commentsId", async (req, res) => {
  const { commentsId } = req.params;
  const { cmt } = req.body;
  const existComments = await Comments.find({ commentsId });

  if (existComments.length) {
    await Comments.updateOne(
      { commentsId: commentsId },
      { $set: { cmt: cmt } }
    );
  }
  res.status(200).json({ success: true });
});

// comments 삭제, delete
router.delete("/comments/:commentsId", async (req, res) => {
  const { commentsId } = req.params;
  const existComments = await Comments.find({ commentsId });

  if (existComments.length) {
    await Comments.deleteOne({ commentsId });
  }
  res.json({ result: "삭제 완료" });
});

module.exports = router;
// 위 내용을 app.js로 보내기 위한 export
