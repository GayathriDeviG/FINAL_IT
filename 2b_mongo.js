var express=require('express')
var bodyParser=require('body-parser')
var urlencodedParser=bodyParser.urlencoded({extended:false})
var app=express()
var ejs=require('ejs')
var MongoClient=require('mongodb').MongoClient
MongoClient.connect("mongodb://127.0.0.1/Q2db",function(err,db)
{
	if(!err)
	{
		console.log("We are connected");
		
		app.get('/',function(req,res)
		{
			res.send("Welcome");
		})

		app.get('/2b_index.html',function(req,res)
		{
			res.sendFile(__dirname+"/"+"2b_index.html")
		})

		app.get('/process_get',function(req,res)
		{
			var newRec=req.query;
			db.collection('student').insert(newRec,function(err,doc)
			{
				if(err)
					return console.log(err)
				else
					res.status(201).json(doc.ops[1])
			})
			console.log("Record Inserted!!");
			res.send('<p>NAME : '+req.query.name+'</p><p>USN : '+req.query.usn+'</p><p>DEPARTMENT : '+req.query.dept+'</p><p>GRADE : '+req.query.grade+'</p>')
		})

		app.get('/display',function(req,res)
		{
			db.collection('student').find().toArray(function(err,i)
			{
				if(err)
					return console.log(err);
				res.render('2b.ejs',{students:i})
			})
		})

		app.get('/2b_update.html',function(req,res)
		{
			res.sendFile(__dirname+"/"+"2b_update.html")
		})

		app.get('/update',function(req,res)
		{
			var NAME=req.query.name
			var GRADE=req.query.grade
			db.collection('student').update({name:NAME},{$set:{grade:GRADE}},function(err,i)
			{
				if(err)
					return console.log(err);
				else
					res.send("Updated Successfully!!!");
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