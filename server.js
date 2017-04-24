const express = require('express');
const hbs = require('hbs');
var app = express(); // here we create a new express app, call express as a function
const fs = require('fs');

// Register partials to create reusable pieces of html
hbs.registerPartials(__dirname + '/views/partials');

// Select which templating engine to use, is all configuration.
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

/*app.use((req, res, next) => {
    res.render('maintenance.hbs', {});
});*/

// Creates static public directory
// this needed to 
// be moved down to because maintenance gets exectuted before!

app.use(express.static(__dirname + '/public'));

// Helpers can be used to pass data to all templates
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to our home page'
    });
    // res.send('<h1>Hello Express!</h1>');
    /*res.send({
        name: 'Lorenzo',
        likes: [
            'likes',
            'biking',
            'cycling',
            'timing'
        ]
    });*/
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: `Unable to handle request`
    });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});