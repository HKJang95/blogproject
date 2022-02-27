const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression')
app.use(helmet());
app.use(compression());
app.set('view engine', 'ejs');
//Routes
app.use('/', require('./routes/board'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("Server start  at port : "+PORT));