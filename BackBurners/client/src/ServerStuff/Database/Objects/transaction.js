const Sequelize = require('sequelize')
const dataBase = require('../database')

module.exports = Trans = dataBase.define('transactions', {
    name: {
        type: Sequelize.STRING(126)
    },
    amount: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.STRING(126)
    },
    accountId: {
        type: Sequelize.STRING(126)
    },
    category: {
        type: Sequelize.STRING(126)
    },
    category2: {
        type: Sequelize.STRING(126)
    },
    included: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    type: {
        type: Sequelize.STRING(126)
    }
})
