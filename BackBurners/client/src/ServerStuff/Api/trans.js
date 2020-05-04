const router = require('express').Router();
const { Budget, Trans, Account } = require('../Database/Objects')

router.get('/', async (req, resp, next) => {
    const currUser = req.body;

    try {
        const accounts = await Account.findAll({where: {userId: currUser._id}});
        const transactions = await Trans.findAll({where: {userId: currUser._id}});
        const budget = await Account.findOne({where: {userId: currUser._id}});
        resp.json({
            acc:accounts,
            trans: transactions,
            budg: budget
        })
    } catch(err) {
        next(err)
    }
})

router.put('/update', async (req, resp, next) => {
    const id = req.body.id;

    try {
        const trans = await Trans.findById(id);
        const newTrans = await trans.update({
            
        })
        resp.json({trans: newTrans})
    } catch(err) {

    }
})


module.exports = router;