const express = require("express")
const bodyParser = require('body-parser');

const app = express()
const routes = require('./routes');
const db = require('./models/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

db.connecting();

app.listen(3000, () => {
	console.log("Server has started on 3000!")
})