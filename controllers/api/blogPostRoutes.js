const router = require('express').Router();
const { where } = require('sequelize');
const { BlogPost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    await BlogPost.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    const updatedBlogPost = await BlogPost.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(updatedBlogPost);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update blog post' });
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No BlogPost found with this id!' });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:id/comments', withAuth, async (req, res) => {
  console.log("Post route hit:", req.params.id, req.body);
  try {
    const postId = req.params.id; 
    const { content } = req.body; 

    const newComment = await Comment.create({
      content,
      userId: req.session.user_id,
      blogPostId: postId,
    });
    console.log("new comment:", newComment);

    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(400).json(err);
  }
});

router.delete('/:id/comments/:commentId', withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.commentId,
        user_id: req.session.user_id,
        blogPostId: req.params.id,
      },
    });

    if (!deletedComment) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
