require('./config/config')
const express = require("express");
const app = express();
const mongoose = require('mongoose');
bodyParser = require("body-parser");
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());
app.use(require('./routes/index'))


// estos mongo set son por versiones nuevas del mongoose. 
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

//la coneccion habria que ponerla en otro archivo y llamarla desde aca
mongoose.connect(process.env.URLDB, (err, res) => {
  if(err) throw err;
  console.log('\x1b[36m%s\x1b[0m', 'Base de datos conectada')
});


app.listen(process.env.PORT, () => console.log('\x1b[33m%s\x1b[0m', "escuchando puerto " + process.env.PORT));
