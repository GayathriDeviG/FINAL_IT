var express = require('express') 
var bodyParser = require('body-parser') 
var ejs = require('ejs')
var MongoClient = require('mongodb').MongoClient
var app = express()  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
MongoClient.connect("mongodb://127.0.0.1/q10db", function(err, db) 
{
 	if(!err) 
	{
    	console.log("We are connected")
	app.get('/', function (req, res) 
	{  
   		console.log("Got a GET request for the homepage")  
   		res.send('<h1>Welcome to Database for Faculty</h1>')
	})
  	app.get('/10b_index.html', function (req, res) 
	{  
   		res.sendFile( __dirname + "/" + "10b_index.html" )   
	})  
								
	app.get('/process_get', function (req, res) 
	{ 
		var newRec = req.query
		console.log(newRec)
		db.collection('Faculty').insert(newRec, function(err, doc) 
		{
    			if (err) 
				console.log("Failed to create new data.")
    			else 
				res.status(201).json(doc.ops[1])
    																
  		})
    		console.log("Sent data are (GET): ID :"+req.query.id+" Title :"+req.query.title+"  Name :"+req.query.name+" Branch :"+req.query.branch)
		res.send('<p> Record Inserted</p> </br><p>ID : ' + req.query['id']+'</p><p>Title: '+req.query['title']+'</p><p> Name: '+req.query['name']+'</p><p> Branch: '+req.query['branch']+'</p>')
  	}) 
	app.get('/display', function (req, res) 
	{ 
		db.collection('Faculty').find().toArray(function(err , i)
		{
        		if (err) 
				return console.log(err)
			res.render('10b.ejs',{faculty: i})  
     		})

	}) 
	app.get("/search", function(req, res) 
	{
		db.collection('Faculty').find({title:"Professor",branch:"CSE"}).toArray(function(err, i) 
		{
    			if (err) 
				return console.log(err.message+ "Failed to get data.")
    																		
			else 
				res.render('10b.ejs',{faculty: i})  
    																		
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
		db.close() 
})
