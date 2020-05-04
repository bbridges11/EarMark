const router = require('express').Router();
const { Budget } = require('../Database/Objects')
const { Account } = require('../Database/Objects')
const { Trans } = require('../Database/Objects')

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const accounts = await Account.findAll({ where: { userId: id }});
        const trans = await Trans.findAll({ where: { userId: id }});
        const budget = await Budget.findOne({ where: { userId: id } });
        
        res.json({ accounts, trans, budget });
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const transaction = await Trans.create({
            name: body.name,
            amount: body.amount,
            date: body.dueDate,
            userId: id,
            category: body.category,
            type: body.type
        })
        //const newTransaction = await transaction.update({ category: req.body.category1 });
        res.json({trans: transaction});
    } catch (error) {
        next(error);
    }
});

module.exports = router;
