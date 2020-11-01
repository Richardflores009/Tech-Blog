const router = require('express').Router()
const { Comment, Post, User} = require('../../models')

router.post('/', (req, res) => {
    User.create({
        username: req.session.username,
        password: req.session.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.user_id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true

            res.json(dbUserData)
        });
    })
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'no account found'})
            return;
        }
        const validatePassword = dbUserData.checkPassword(req.body.password)

        if (!validatePassword) {
            res.status(400).json({ message: 'wrong password' })
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(400).json({ message: 'You are logged in'})
        });
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    }
    else {
        res.json(404).end()
    }
});

router.delete('/user/:id', (req, res) => {
    User.delete({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'no account with that id found'})
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;