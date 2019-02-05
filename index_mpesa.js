const Joi = require ('joi');
const express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

const app = express();

app.use(express.json());


const stores = [

{ id: 1, name: 'store1', phonenumber: '0706944777', email: 'ronnie.evans66@gmail.com' },
{ id: 2, name: 'store2', phonenumber: '0721000000', email: 'pcltd2010@gmail.com' },
{ id: 3, name: 'store3', phonenumber: '0722000000', email: 'telestar.ent@gmail.com' },

];

var globalresult = {};

//var jstores = { 'id': '1', 'name': 'store1', 'phonenumber': '0706944777', 'email': 'ronnie.evans66@gmail.com' }

//var jjstores = '"users": { "id": "1", "name": "Ronnie Evans" }'
var jjstores2 = '{ "stores": [ { "id": "1", "name": "Ronnie Evanse", "phonenumber": "0706944777", "email": "ronnie.evans66@gmail.com" }, { "id": "2", "name": "Kathy Nthenge", "phonenumber": "0701555111", "email": "katheyN@gmail.com" }, { "id": "3", "name": "Miles Davis", "phonenumber": "+1-919-257-1100", "email": "lisaE@gmail.com" } ] }'

var jjjstores = JSON.parse(jjstores2);


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mpesa"
});


con.connect(function(err) {
  if (err) throw err;
  //con.query("SELECT * FROM stores", function (err, result, fields) {
  //  if (err) throw err;
  //  console.log(result)
  //  globalresult = result;
  //  console.log(globalresult);
  //});
});


//con.end();

//
// GET ROUTES
//

app.get('/', (req, res) => {
	//res.send(' I will add a HELP menu here.');
	res.send(globalresult);
});


app.get('/api/stores', (req, res) => {
	//res.send(jjjstores);
	//var finalresult = "{ stores: " + JSON.stringify(globalresult) + " }"  //It works but Figure a better way. 
	//res.send(finalresult);
	//console.log(finalresult);


  	con.query("SELECT * FROM stores1", function (err, result, fields) {
    	if (err) throw err;
    	//console.log(result)
	var finalresult = "{ stores: " + JSON.stringify(result) + " }"  //It works but Figure a better way. 
	res.send(finalresult);
	console.log(finalresult);
  });


});


app.get('/api/stores/:id', (req, res) => {

	const store = stores.find (c => c.id === parseInt(req.params.id));
	if (!store) return res.status(404).send('The store with the given number was not found');
	res.send(store);
});


app.post('/api/stores', (req, res) => {

//	const { error } = validateCourse(req.body); //result.error 
//	if (error) return res.status(400).send(error.details[0].message);

//	const store = {
//	  id: stores.length + 1,
//	  name: req.body.name
//	};

//	stores.push(store);
//	res.send(store);
  	//con.query("INSERT INTO stores1 (name, phonenumber, email) VALUES ('Ron Insert', '911', 'insert@gmail.com')", function (err, result, fields) {
    	//if (err) throw err;
    	//console.log(result)
var name = req.body.name;
var phonenumber = req.body.phonenumber;
var email = req.body.email;
var sqlstring = "INSERT INTO stores1 (name, phonenumber, email) VALUES (" + "'" + name + "', '" + phonenumber + "', '" + email + "')";
  con.query(sqlstring, function (err, result, fields) {
   if (err) throw err;
  });

console.log(sqlstring);
res.send(JSON.stringify(req.body));
//console.log(JSON.stringify(req.body.name));
console.log(req.body.name);
});


app.put('/api/stores/:id', (req, res) => {

	////const store = stores.find (c => c.id === parseInt(req.params.id));
	////if (!store) return res.status(404).send('The store with the given number was not found');

	////// const result = validateCourse(req.body);
	////const { error } = validateCourse(req.body); //result.error 

	////if (error) return res.status(400).send(error.details[0].message);

	////store.name = req.body.name;
	////res.send(store);
var name = req.body.name;
var phonenumber = req.body.phonenumber;
var email = req.body.email;
var sqlstring = "UPDATE stores1 SET name = '" + name + "', phonenumber = '" + phonenumber + "', email = '" + email + "' WHERE id = '" + req.params.id + "'"; 


  con.query(sqlstring, function (err, result, fields) {
   if (err) throw err;
  });

console.log(sqlstring);
res.send(JSON.stringify(req.body));
console.log(req.body.name);

}); //End of PUT


app.delete('/api/stores/:id', (req, res) => {
//app.delete('/api/stores/:name', (req, res) => {

	//const store = stores.find (c => c.id === parseInt(req.params.id));
	//if (!store) return  res.status(404).send('The store with the given number was not found');

	//const index = stores.indexOf(store);
	//stores.splice(index, 1);
	//res.send(store);

//var name = req.params.name;
var id = req.params.id;
//var sqlstring = "DELETE FROM stores1 WHERE name = " + "'" + name + "'";
var sqlstring = "DELETE FROM stores1 WHERE id = " + "'" + id + "'";
  con.query(sqlstring, function (err, result, fields) {
   if (err) throw err;
  });

res.send(JSON.stringify(req.params));
console.log(sqlstring);
});


function validateCourse(store) {

	const schema = {
	  name: Joi.string().min(3).required()	
	}	

	return Joi.validate(store, schema);

}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
