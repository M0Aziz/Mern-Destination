const express = require('express');
const cors = require('cors');
const app = express();
 

//app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use(cors());

require('./config/mongoose.config');
require('./routes/destination.routes')(app);

app.listen(8000, () => {
    console.log(`Serveur en cours d'exécution sur le port 8000`);
  });