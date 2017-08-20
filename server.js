const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let expressApp = express();

expressApp.set('view engine', hbs);

expressApp.use((req,res,next)=>{
  console.log("Inside the main Middle ware");
  var now = new Date().toString();
  let log = `${now} : ${req.method} ${req.path}`;
  fs.appendFile('requests.log', log + "\n" , (error) => {
    if(error) {
      console.log("An error occured");
    }
  });
  next();
  });

  expressApp.use((req,res,next) => {
    console.log("Inside the maintenance")
    res.render('maintenance.hbs');
  });

  expressApp.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getDate' , () => new Date().getFullYear());
hbs.registerHelper('shout', stringToScream => stringToScream.toUpperCase());

expressApp.get('/', (req,res) => {
  res.render('home.hbs', {
    title: 'HOME PAGE',
    userName: 'anil pamulpati kumar'
  });
});

expressApp.get('/about', (req,res) => {
  res.render('about.hbs', {
    title : 'About Page',
  });
});

expressApp.get('/bad',(req,res) => {
  res.send({
    errorMessage: "You reached an error Page"
  });
});

expressApp.listen(3000, ()=> {
  console.log("Server Started on port 3000");
});
