const USER = require('./user');
const Trans = require('./transaction');
const Budget = require('./budget');
const Account = require('./account');
const DaBank = require('./dabank')

USER.hasMany(DaBank);
DaBank.belongsTo(USER);

USER.hasMany(Account);
Account.belongsTo(USER);

DaBank.hasMany(Account);
Account.belongsTo(DaBank);

USER.hasMany(Trans);
Trans.belongsTo(USER);

USER.hasOne(Budget);
Budget.belongsTo(USER);

module.exports = {
    USER,
    Trans,
    Budget,
    Account,
    DaBank
}