const express = require('express');
const bodyParser = require('body-parser');
const dbController = require('./controllers/dbController');

const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../../dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/queryDatabase', dbController.getSchemaInfo, (req, res) => {
  res.json(res.locals.schemaInfo);
});
app.post('/check1', dbController.checkUrl1);
app.post('/check2', dbController.checkUrl2);

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Listening on port 3000...');
});
