const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const csp = require('helmet-csp');

app.use(helmet());
app.use(
    csp({
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self' 'sha256-uts7zrnGYAKZNfvBc7PYcShvKP4t10vo5qemd5Yp0lc=' https://cdn.jsdelivr.net/"],
        scriptSrc: ["'self' 'unsafe-inline' https://cdn.jsdelivr.net/"],
      },
    })
  );
   

app.use(compression());
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./routes/board'));
app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("Server start  at port : "+PORT));