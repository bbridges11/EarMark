const router = require('express').Router();
const USER = require('../Database/Objects/user');

router.post('/signup', async (req, resp, next) => {
    try {
        const newUser = await USER.create(req.body);
        newUser.budget = await USER.createBudget(req.body._id);
        console.log(newUser.budget);
        resp.json(newUser);
    } catch(error) {
        console.log("ERROR", error)
        next(error)
    }
})

router.post('/login', (req, resp, next) => {
    console.log(req.body)
    USER.findOne({where: {email: req.body.email}}).then(user => {
        console.log(user)
        if(!user) {
            console.log('User not found: ', req.body.email);
            resp.status(401).send('Wrong username and/or password. Try again');
        } else if(!user.isCorrectPassword(req.body.passWord)) {
            console.log('Incorrect password for user with email: ', req.body.email);
            res.status(401).send('Wrong email and/or password');
        } else {
            user.update({
                pushToken: req.body.pushTok
            })
            resp.json(user)
        }
    })
})

router.post('/logout', (req, resp, next) => {

})

router.get('/itsme', (req, res) => {
    res.json(req.user);
});

module.exports = router;
