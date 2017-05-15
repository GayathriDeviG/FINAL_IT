var express = require('express');  
var bodyParser = require('body-parser'); 
var ejs = require('ejs');
var MongoClient = require('mongodb').MongoClient;
var app = express();  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// Connect to the db
MongoClient.connect("mongodb://127.0.0.1/5bdb", function(err, db) 
{
 if(!err) 
 {
    	console.log("We are connected");
	app.get('/', function (req, res) 
	{  
   		console.log("Got a GET request for the homepage");  
   		res.send('<h1>Welcome to Library</h1>');  
	})
  	
	app.get('/5b_index.html', function (req, res) 
	{  
   		res.sendFile( __dirname + "/" + "5b_index.html" );    
	})
  
	
	app.get('/process_get', function (req, res) 
	{ 
		var newBook = req.query;
		console.log(newBook);
		db.collection('books').insert(newBook, function(err, doc) 
		{
    			if (err) 
			{
      			console.log("Failed to create new data.");
    			} 
			else 
			{
		 		res.status(201).json(doc.ops[1]);
    			}
  		})
    		console.log("Sent data are (GET): Name  :"+req.query.name+" Title :"+req.query.title+" Author :"+req.query.author+" Subject :"+req.query.subject+" Year :"+req.query.year);
		res.send('<p> Book Inserted</p> </br><p>Name : ' + req.query['name']+'</p><p>Title: '+req.query['title']+'</p><p>Author: '+req.query['author']+'</p><p>Subject: '+req.query['subject']+'</p><p>Year: '+req.query['year']+'</p>'); 
  	}) 

	app.get('/display', function (req, res) 
	{ 
		db.collection('books').find().toArray(function(err , i)
		{
        		if (err) 
				return console.log(err)
			res.render('5b.ejs',{books: i})  
     		})
	}) 


	app.get('/delete',function(req,res)
	{
		db.collection('books').remove({subject:{$ne:"CSE"}},function(err,i)
		{
			if(!err)
				res.send("Books removed successfully")
			else
				return console.log(err)
		})
	})
var server = app.listen(5000, function() 
	{  
	var host = server.address().address  
  	var port = server.address().port  
	console.log("Example app listening at http://%s:%s", host, port)  
	})  
}
else
{   
db.close();  
}
});
