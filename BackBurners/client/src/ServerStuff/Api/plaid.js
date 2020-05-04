const router = require('express').Router();
const plaid = require('plaid');
const { DaBank, Account, Trans, Budget } = require('../Database/Objects')
const moment = require('moment');

const plaidClient = new plaid.Client(
  "5e768da7e188cf00137a1138",
  "2a194939c4c3d748b5619446ac00a1",
  "ae0d789b854b418325ba1e8994c2f7",
  plaid.environments.sandbox
);

router.post('/plaidExchange', async (req, resp, next) => {
  try {
    let publicToken = req.body.public_token;
    plaidClient.exchangePublicToken(publicToken, async (error, tokenResponse) => {
      if (error !== null) {
        var msg = 'Could not exchange public_token!';
        console.log(msg + '\n' + error);
      } else {
        console.log(tokenResponse, req.body)
        let ACCESS_TOKEN = tokenResponse.access_token;
        let  daBankId = tokenResponse.item_id;
        const newDaBank = await DaBank.create({
          accessToken: ACCESS_TOKEN,
          bank: daBankId,
          userId: req.body.id
        })

        console.log(newDaBank)
	      let startDate = moment().subtract(90, 'days').format('YYYY-MM-DD');
        let endDate = moment().format('YYYY-MM-DD');
        await plaidClient.getTransactions(ACCESS_TOKEN, startDate, endDate, async (error, resp) => {
          if(error !== null) {
            if(plaid.PlaidError(error)) {
              console.log("Plaid Error: " + error)
            } else {
              console.log("Non-Plaid Error: " + error)
            }
          } else {
            resp.accounts.map(async (account) => {
              await Account.create({
                accountId: account.account_id,
                currentBal: account.balances.current,
                availableBal: account.balances.available,
                name: account.name,
                userId: req.body.id,
                daBankId: newDaBank.userId
              })
            })
            resp.transactions.map(async (transaction) => {
              await Trans.create({
                name: transaction.name,
                amount: transaction.amount,
                date: transaction.date,
                accountId: transaction.account_id,
                userId: req.body.id,
                category: transaction.category[0],
                category2: transaction.category[1],
                type: transaction.transaction_code
              })
            })
          }
        })

        const accounts = await Account.findAll({where: {userId: req.body.id}});
        const transactions = await Trans.findAll({where: {userId: req.body.id}});
        const budget = await Budget.findAll({where: {userId: req.body.id}});
        resp.json({
          acc:accounts,
          trans: transactions,
          budg: budget,
          token: ACCESS_TOKEN
        })
      }
    });
  } catch (err) {
    console.log('Exchange token returned an error', {
      error_type: err.error_type,
      error_code: res.statusCode,
      error_message: err.error_message,
      display_message: err.display_message,
      request_id: err.request_id,
      status_code: err.status_code
    });
    next(err);
  }
});

router.get('/:id', async (req, resp, next) => {
  console.log(req.params.id);
  const id = req.params.id;
  const daBank = await DaBank.findOne({ where: { userId: id} });
  const ACCESS_TOKEN = daBank.accessToken;
  console.log(daBank)
  let startDate = daBank.createdAt.toISOString().slice(0, 10);
  let endDate = moment().format('YYYY-MM-DD');
  /* create start and end date from date.now()*/

  try {
    await plaidClient.getTransactions(ACCESS_TOKEN, startDate, endDate, async (error, resp) => {
      if(error !== null) {
        if(plaid.PlaidError(error)) {
          console.log("Plaid Error: " + error)
        } else {
          console.log("Non-Plaid Error: " + error)
        }
      } else {
        resp.accounts.map(async (account) => {
          await Account.create({
            accountId: account.account_id,
            currentBal: account.balances.current,
            availableBal: account.balances.available,
            name: account.name,
            userId: req.params.id,
            daBankId: daBank.userId
          })
        })
        resp.transactions.map(async (transaction) => {
          await Trans.create({
            name: transaction.name,
            amount: transaction.amount,
            date: transaction.date,
            accountId: transaction.account_id,
            userId: req.params.id,
            category: transaction.category[0],
            category2: transaction.category[1],
            type: transaction.transaction_code
          })
        })
      }
    })

    const accounts = await Account.findAll({where: {userId: req.body.id}});
    const transactions = await Trans.findAll({where: {userId: req.body.id}});
    resp.json({
      acc: accounts,
      trans: transactions,
    })
  } catch(err) {
    next(err)
  }
})

module.exports = router;
