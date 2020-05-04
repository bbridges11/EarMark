const router = require('express').Router();

router.use('/transaction', require('./trans'));
router.use('/budget', require('./budget'));
router.use('/user', require('./user'));
router.use('/plaid', require('./plaid'));
router.use('/accTrans', require('./accTransaction'));

router.use((req, res, next) => {
  res.sendStatus(404)
});

module.exports = router;