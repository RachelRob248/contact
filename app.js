// Put in your express server here. Use index.html for your
// view so have the server direct you to that.
var express = require('express');
var bp = require('body-parser');
var sm = require('sendmail')();

var app = express();

var myEmail = 'rachelroberts248@gmail.com'

app.use(express.static("stuff"));

app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');

app.use(bp.urlencoded({ extended: false }))

app.use(bp.json())

app.get('/', function(req, res){
  var stuff = {
    msg: "",
    name: "",
    email: "",
    emailc: ""
  }
  res.render('index', {stuff: stuff});
});

app.post('/', function(req,res,next){
  var stuff = {
    msg: "",
    name: "",
    email: "",
    emailc: ""
  }
  var emailFilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!req.body.name) {
    stuff.msg = "Name is required.";
    stuff.email = req.body.email;
    stuff.emailc = req.body.email_confirm;
    res.render('index', {stuff: stuff});
  } else if (!emailFilter.test(req.body.email)) {
    stuff.msg = "Invalid email.";
    stuff.name = req.body.name;
    stuff.emailc = req.body.email_confirm;
    res.render('index', {stuff: stuff});
  } else if (req.body.email_confirm != req.body.email) {
    stuff.msg = "Email confirmation must match given email.";
    stuff.name = req.body.name;
    stuff.email = req.body.email;
    res.render('index', {stuff: stuff});
  } else {
    console.log(req.body);
    sm({
    from: req.body.email,
    to: myEmail,
    subject: 'Contact request',
    html: req.body.name + ' (' + req.body.email + ') wants to contact you.',
    }, function(err, reply) {
      if(err) {
        stuff.msg = "Email failed to send.  Please try again!";
        stuff.name = req.body.name;
        stuff.email = req.body.email;
        stuff.emailc = req.body.email_confirm;
        res.render('index', {stuff: stuff});
      }
      console.log(err && err.stack);
      console.dir(reply);
      stuff.msg = "Yay!  Email sent!";
      stuff.name = "";
      stuff.email = "";
      stuff.emailc = "";
      res.render('index', {stuff: stuff});
    });
  }
});

app.listen(3000, function(){
  console.log("The server is running on localhost:3000")
})
