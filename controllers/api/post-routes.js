const router = require('express').Router()
const { Comment, Post, User } = require('../../models')
const withAuth = require('../../utils')

router.post('/', withAuth, (req, res) => {
    const body = req.body;
    console.log(req.session.user_id)
    Post.create({ ...body, user_id: req.session.user_id})
    .then(newNewPost => {
        res.json(newNewPost);
    })
    .catch(err => {
        res.status(500).json(err)
    });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update({
        where: {
            id: req.params.id
        }
    })
    .then(posts => {
        if (posts > 0){
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(posts => {
        if (posts > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;