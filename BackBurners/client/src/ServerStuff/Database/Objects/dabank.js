const Sequelize = require('sequelize')
const dataBase = require('../database')

module.exports = DaBank = dataBase.define('dabanks', {
  bank: {
    type: Sequelize.STRING(126)
  },
  accessToken: {
    type: Sequelize.STRING(126)
  }
})