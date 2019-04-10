const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require ('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
	    host : '127.0.0.1',
	    user : 'postgres',
	    password : '28*9H51U^n',
	    database : 'smart-brain'
  	}
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send(database.users); })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleAPICall(req, res) });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, ()=>{
	console.log(`app is running on port 3000`);
})

//ENVIRONMENTAL VARIABLES VERSION
// const PORT = process.env.PORT
// app.listen(PORT, ()=>{
// 	console.log(`app is running on port ${PORT}`);
// })

// console.log(PORT)
/*
/ --> res = return this is working
/signin --> POST = return success/fail
/register --> POST = return user
/profile/:userId --> GET = return user
/image --> PUT --> user

*/