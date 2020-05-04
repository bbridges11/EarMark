const Sequelize = require('sequelize')
const dataBase = require('../database')
const crypto = require('crypto');
const Budget = require('./budget');

module.exports = USER = dataBase.define('users', {
    email: {
        type: Sequelize.STRING(126),
        unique: true,
        allowNull: false,
    },
    passWord: {
        type: Sequelize.STRING(126),
        get() {
            return () => this.getDataValue('passWord');
        }
    },
    name: {
        type: Sequelize.STRING(126)
    },
    phoneNumber: {
        type: Sequelize.STRING(126)
    },
    _id: {
        type: Sequelize.STRING(126),
        primaryKey: true
    },
    sugarAndSpice: {
        type: Sequelize.STRING(126),

        get() {
            return () => this.getDataValue('sugarAndSpice');
        }
    },
    pushToken: {
      type: Sequelize.STRING,
    }
}/*, this.beforeCreate(setsugarAndSpiceAndPassword), this.beforeUpdate(setsugarAndSpiceAndPassword)*/)

USER.prototype.isCorrectPassword = function (candidatePwd) {
   // console.log("THISSSS", this);
    return USER.encryptPassword(candidatePwd, this.sugarAndSpice()) === this.passWord();
};

USER.createBudget = (id) => {
    return Budget.create({ userId: id });
};

USER.generatesugarAndSpice = () =>{
    return crypto.randomBytes(16).toString('base64');
};

USER.encryptPassword = (plainText, sugarAndSpice) => {
return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(sugarAndSpice)
    .digest('hex');
};

const setsugarAndSpiceAndPassword = user => {
    //console.log(user.passWord, user.sugarAndSpice)
    if (user.changed('passWord')) {
	console.log("In if statement");
        user.sugarAndSpice = USER.generatesugarAndSpice();
	//console.log("11111", user.sugarAndSpice)
        user.passWord = USER.encryptPassword(user.passWord(), user.sugarAndSpice());
    } else {
	console.log("Else statement")
    }
};

//this.beforeCreate(setsugarAndSpiceAndPassword);
//this.beforeUpdate(setsugarAndSpiceAndPassword);
USER.beforeCreate(setsugarAndSpiceAndPassword);
USER.beforeUpdate(setsugarAndSpiceAndPassword);
