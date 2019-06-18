const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/fbAuth');

// creating the routes
const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, login } = require('./handlers/users');


const firebase = require('firebase'); // getting the firebase
// initializing firebase
firebase.initializeApp(config); // an argument to initialize an app

// using all the routes
 app.get('/screams', getAllScreams );
 app.post('/scream', FBAuth, postOneScream);

 // users routes
 app.post('/signup', signup);
 app.post('/login', login);

 
 exports.api = functions.https.onRequest(app);