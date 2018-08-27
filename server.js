/* --------------------------------------------------------------------------------------------- */
const express = require('express');
const hbs = require('hbs');
const fs  = require('fs');

var app = express();
/* --------------------------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------------------------- */
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.set('view engine','hbs'); // view engine

/* --------------------------------------------------------------------------------------------- */

app.use(express.static(__dirname + '/public'))  //middleware

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(error) => {
        if (error) {
            console.log('unable to append to server.log');
        }
    });
    next();
})

app.use((req,res,next) => {
    res.render('maintenance.hbs');
    //next();
})

/* --------------------------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------------------------- */
app.get('/',(req,res) => {
    /* --------------------------------------*/
    //res.send('<h1>Hello Express !!!!!!!!</h1>');
    //res.send('Hello Express !!!!!!!!');
//    res.send({
//        name: 'Dev Mani',
//        hobbies: [
//            'playing table tennis',
//            'dancing'
//        ]
//    })
    /* --------------------------------------*/
    /* --------------------------------------*/
    res.render('home.hbs',{
        welcomeMessage: 'Welcome To Home',
        pageTitle: 'Home Page'
    })
    /* --------------------------------------*/
});

app.get('/about',(req,res) => {
    /* --------------------------------------*/
    //res.send('<h1>Hello Express !!!!!!!!</h1>');
    //res.send('Hello Express !!!!!!!!');
    
//    res.send({
//        name: 'Dev Mani',
//        computerProficiency: [
//            'Node.js',
//            'Express.js',
//            'Javascript',
//            'Html/CSS'
//        ]
//    })
    /* --------------------------------------*/
    /* --------------------------------------*/
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
    /* --------------------------------------*/
});

app.get('/bad',(req,res) => {
    //res.send('<h1>Hello Express !!!!!!!!</h1>');
    //res.send('Hello Express !!!!!!!!');
    res.send({
        errorMessage: 'Can not fulfill request Please try again !!!!',
    })
});
/* --------------------------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------------------------- */
app.listen(3000,() => {
    console.log('Server is up on port 3000');
});
/* --------------------------------------------------------------------------------------------- */