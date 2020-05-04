const Sequelize = require('sequelize')
const dataBase = require('../database')

module.exports = Budget = dataBase.define('budgets', {
    income: {
        type: Sequelize.INTEGER
    },
    savings: {
        type: Sequelize.INTEGER
    },
    spendingBudget: {
        type: Sequelize.INTEGER
    },
    munchies: {
        type: Sequelize.INTEGER,
    defaultValue: 15
    },
    travelling: {
        type: Sequelize.INTEGER,
    defaultValue: 10
    },
    healthcare: {
        type: Sequelize.INTEGER,
    defaultValue: 30
    },
    service: {
        type: Sequelize.INTEGER,
    defaultValue: 20
    },
    shopping: {
        type: Sequelize.INTEGER,
    defaultValue: 20
    }
})
