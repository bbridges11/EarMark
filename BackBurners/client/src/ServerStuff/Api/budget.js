const router = require('express').Router();
const { Budget } = require('../Database/Objects')

router.get('/:id', async (req, resp, next) => {
    try {
        const id = req.params.id;
        const budget = await Budget.findOne({ where: { userId: id } });
        if (!budget) resp.sendStatus(404);
        resp.json(budget);
    } catch (err) {
        next(err);
    }
});

router.put('/', async (req, resp, next) => {
    console.log(req.body)
    try {
        const id = req.body.id;
        const budget = await Budget.findOne({ where: {userId: id} });
        console.log(budget)
        if (!budget) resp.sendStatus(404);
        const updatedBudget = await budget.update(req.body.budget);
        resp.json(updatedBudget);
    } catch (err) {
      next(err);
    }
});

module.exports = router;
