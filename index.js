const express = require('express');
const session = require('express-session');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const csp = require('helmet-csp');
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true})); // bodyparser : post 방식 body parsing용 -> express 기본 탑재
app.use(express.json());




var corsOption = {
  origin: ['localhost'],
  credentials:'true'
}

app.use(cors(corsOption));


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
        styleSrc: ["'self' https://cdn.jsdelivr.net/ 'unsafe-inline'"],
        scriptSrc: ["'self' 'unsafe-inline' https://cdn.jsdelivr.net/ https://code.jquery.com"],
        connectSrc: ["'self' blob:"],
        imgSrc: ["'self' blob: https://blogprojectbucket.s3.amazonaws.com/ https://blogprojectbucket.s3.ap-northeast-2.amazonaws.com"],
        fontSrc: ["'self' https://cdn.jsdelivr.net"]
      },
    })
  );
const passport = require('./lib/passport')(app);

app.use(compression());
app.set('view engine', 'ejs');


//Routes
app.use('/', require('./routes/board'));
app.use('/api', require('./routes/api'));
app.use('/project', require('./routes/project'))
app.use('/admin', require('./routes/admin'));

app.use('/js', express.static(path.join(__dirname, 'js'))); // static route

app.use(function(req, res, next){
  res.status(404).send('Sorry! file not found : 404!');
}); // 404

app.use(function(error, req, res, next){
  console.log(error.stack);
  res.status(500).send('something broke!');
}); // 500

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("Server start  at port : "+PORT));