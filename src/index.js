const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://GuitarBlazze:GuitarBlazze@ednotsheeran-gg2t6.gcp.mongodb.net/oministack?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true  
}
);

app.use(express.json());
app.use(routes);

app.listen(80);