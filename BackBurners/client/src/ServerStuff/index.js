const express = require('express');
const bodyParser = require('body-parser');
const PORT = 8080;
const database = require('./Database')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db: database })
const app = express();

const createApp = () => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(
    session({
      secret: 'EarMark to da moon',
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use('/auth', require('./Auth/authentication'));
  app.use('/api', require('./Api'));
  app.get('/', (req, res) => res.send('EarMark!'));
  console.log('HERRREEEE')
}
const databaseSync = () => {
  database.sync({force: false}).then(function(){
    console.log('DB connection sucessful.');
  }, function(err){
    // catch error here
    console.log(err);
  });
}
const startListening = () => {
   app.listen(PORT, () =>
    console.log(`Chopping it up on port ${PORT}`)
  );
};
module.exports = app;

const start = async () => {
  sessionStore.sync()
  databaseSync()
  createApp()
  startListening()
}

start()