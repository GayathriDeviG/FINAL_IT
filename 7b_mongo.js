var express = require('express');  
var bodyParser = require('body-parser'); 
var ejs = require('ejs');
var MongoClient = require('mongodb').MongoClient;
var app = express();  
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Connect to the db
MongoClient.connect("mongodb://127.0.0.1/7bdb", function(err, db) 
{
 	if(!err) 
	{
    		console.log("We are connected")
		app.get('/', function (req, res) 
		{  
   			console.log("Got a GET request for the homepage")
   			res.send('<h1>Welcome to Database FinalYears</h1>')  
		})
  		
		app.get('/7b_index.html', function (req, res) 
		{  
   			res.sendFile( __dirname + "/" + "7b_index.html" )    
		})  
								
		app.get('/process_get', function (req, res) 
		{ 
			var newRec = req.query
			console.log(newRec)
			db.collection('Student').insert(newRec, function(err, doc) 
			{
    				if (err) 
				{
      					console.log("Failed to create new data.")
    				} 
				else 
				{
		 			res.status(201).json(doc.ops[1])
    				}
  			})
    			console.log("Sent data are (GET): USN :"+req.query.usn+" Name :"+req.query.name+" Company Name :"+req.query.cname)
			res.send('<p> Record Inserted</p> </br><p>USN : ' + req.query['usn']+'</p><p>Name: '+req.query['name']+'</p><p>Company Name: '+req.query['cname']+'</p>')
  		}) 

		app.get('/display', function (req, res) 
		{ 
			db.collection('Student').find().toArray(function(err , i)
			{
        			if (err) 
					return console.log(err)
				res.render('7b.ejs',{students: i})  
     			});
		}) 
								
		app.get("/search", function(req, res) 
		{
			db.collection('Student').find({cname:"Infosys"}).toArray(function(err , i)
			{
        			if (err) 
					return console.log(err)
				
				res.render('7b.ejs',{students: i})
				
     			});
  		})
		
		app.get('/count',function(req,res)
		{
			db.collection('Student').count({cname:"Infosys"},function(err,c)
				{
					if(err)
						return console.log(err1)
					res.send("Count of no of students selected in Infosys is "+c)
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
 })
