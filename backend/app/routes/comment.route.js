const express = require("express");
const CommentController = require("../controller/comment.controller");

const router = express.Router();

router.post('/create', CommentController.createComment)
// router.put('/update/:id', CommentController.updateComment)
// router.get('/get-details/:id', CommentController.getDetailsComment)
// router.delete('/delete/:id', CommentController.deleteComment)
// router.get('/get-all', CommentController.getAllComment)
router.get('/get-comment/:id', CommentController.getAllComment)


module.exports = router;