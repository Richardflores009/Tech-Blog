const router = require('express').Router();
const {Comment, Post, User} = require('../../models/');
const withAuth = require('../../utils/auth')

router.post('/comment', withAuth, (req,res) => {
    const body = req.body
    Comment.create({...body, user_id: req.session.user_id})
    .then(dbCommentInfo => {
        res.json(dbCommentInfo).json({ message: 'comment posted!' })
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

module.exports = router;