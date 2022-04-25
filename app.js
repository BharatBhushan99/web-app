let express = require('express');
let mysql = require('mysql');
let parser = require("body-parser");


let app = express();


let connection = mysql.createConnection({
	host     :    'localhost',
	user     :    'root',
	database :    'join_us'   
});

app.set("view engine", "ejs");

app.use(parser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
	let q = 'SELECT COUNT(*) AS total FROM users';
    connection.query(q, function(error, result){
        if (error) throw error;
        let users = result[0].total;
		res.render('home', {data: users});
    });
	
	console.log('Someone requested us');
});


app.post('/register', function(req, res){
	let person = {email: req.body.email};
	
	connection.query('INSERT INTO users SET ?', person, function(error, results, fields){
	    if (error) throw error;
	    res.redirect('/');
		
    });

});


app.listen(3000, function(){
    console.log('Server is running');
});

