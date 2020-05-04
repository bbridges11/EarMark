const Sequelize = require('sequelize').Sequelize
const databaseName = "earmark2020"
const dataBase = new Sequelize(databaseName, 'bbridges11', 'Force0242',{
	host: 'localhost',
	dialect: 'mysql',
	pool: {
    	 max: 5,
    	 min: 0,
    	 acquire: 30000,
    	 idle: 10000
  	}
})
module.exports = dataBase;
