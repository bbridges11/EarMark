const router = require('express').Router();
const { USER } = require('../Database/Objects');

router.put('/:userId', async (req, resp, next) => {
    try {
        const user = await USER.findByPk(req.body._id);
        if(!user) resp.sendStatus(404)
    } catch(err) {

    }
      
});
module.exports = router;