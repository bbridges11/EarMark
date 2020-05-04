const Sequelize = require('sequelize')
const dataBase = require('../database')

module.exports = Account = dataBase.define('accounts', {
    accountId: {
        type: Sequelize.STRING(126),
    },
    currentBal: {
        type: Sequelize.INTEGER,
    },
    availableBal: {
        type: Sequelize.INTEGER,
    },
    name: {
        type: Sequelize.STRING(126),
    }
})