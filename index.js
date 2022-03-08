const express = require('express');
const app = express();
var bodyparser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const csp = require('helmet-csp');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true})); // bodyparser : post 방식 body parsing용 -> express 기본 탑재
app.use(express.json());


/*
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  주의 : 현재 scriptSrc는 unsafe-inline CSP 적용중으로, 
  머지 전에 반드시 확인하여 hash CSP 적용 후 머지할 것!
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

app.use(helmet());
app.use(
    csp({
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self' 'sha256-uts7zrnGYAKZNfvBc7PYcShvKP4t10vo5qemd5Yp0lc=' https://cdn.jsdelivr.net/"],
        scriptSrc: ["'self' 'unsafe-inline' https://cdn.jsdelivr.net/"],
        imgSrc: ["'self' https://blogprojectbucket.s3.amazonaws.com/"]
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