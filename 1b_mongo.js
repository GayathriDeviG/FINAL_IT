var express=require('express')
var bodyParser=require('body-parser')
var urlencodedParser=bodyParser.urlencoded({extended:false})
var app=express()
var ejs=require('ejs')
var MongoClient=require('mongodb').MongoClient
MongoClient.connect("mongodb://127.0.0.1/Q1db",function(err,db)
{
	if(!err)
	{
		console.log("We are connected");
		
		app.get('/',function(req,res)
		{
			res.send("Welcome");
		})

		app.get('/1bindex.html',function(req,res)
		{
			res.sendFile(__dirname+"/"+"1bindex.html")
		})

		app.get('/process_get',function(req,res)
		{
			var USN=req.query.usn
			var NAME=req.query.name
			var SUB=req.query.sub
			var CIE=parseInt(req.query.cie)
			db.collection('student').insert({"usn":USN,"name":NAME,"sub":SUB,"cie":CIE},function(err,doc)
			{
				if(err)
					return console.log(err)
				else
					res.status(201).json(doc.ops[1])
			})
			console.log("Record Inserted!!");
			res.send('<p>USN : '+USN+'</p><p>NAME : '+NAME+'</p><p>SUBJECT_CODE : '+SUB+'</p><p>CIE MARKS : '+CIE+'</p>')
		})

		app.get('/display',function(req,res)
		{
			db.collection('student').find().toArray(function(err,i)
			{
				if(err)
					return console.log(err);
				res.render('1b.ejs',{students:i})
			})
		})

		app.get('/search',function(req,res)
		{
			db.collection('student').find({cie:{$lt:20}}).toArray(function(err,i)
			{
				if(err)
					return console.log(err);
				res.render('1b.ejs',{students:i})
			})
		})

		var server=app.listen(5000,function()
		{
			var host=server.address().address
			var port=server.address().port
			console.log("Listening at http:// %s %s ",host,port);
		})
	}
	else db.close();
})