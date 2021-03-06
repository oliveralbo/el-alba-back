const express = require("express");
const app = express();


app.use(require('./user'));
app.use(require('./login'));
app.use(require('./rawMaterial'));
app.use(require('./productDone'));
app.use(require('./recipes'));
app.use(require('./provider'));
app.use(require('./client'));
app.use(require('./process'));
app.use(require('./orders'));

module.exports = app;