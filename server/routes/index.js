const express = require("express");
const app = express();


app.use(require('./user'));
app.use(require('./login'));
app.use(require('./rawMaterial'));
app.use(require('./productDone'));
app.use(require('./recipes'));


module.exports = app;