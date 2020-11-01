const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils')


router.get('/', withAuth, (req, res) => {
    Post.findAll({
        include: [User],
    })
    .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));

        res.render("all-posts", {posts})
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get('/post/:id', withAuth, (req, res) => {
    Post.findOne({
        id: req.params.id,
        include: [
            User,
            {
                model: Comment,
                include: [User],
            },
        ],
    })
    .then((dbPostData) => {
        if (dbPostData) {
            const post = dbPostData.map((post) => post.get({plain:true}));
            res.render('single-post', {post})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
        return;
    }
    res.render('login')
});

module.exports = router;