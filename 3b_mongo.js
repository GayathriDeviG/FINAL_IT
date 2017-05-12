var express=require('express')
var bodyParser=require('body-parser')
var urlencodedParser=bodyParser.urlencoded({extended:false})
var app=express()
var ejs=require('ejs')
var MongoClient=require('mongodb').MongoClient
MongoClient.connect("mongodb://127.0.0.1/Q3db",function(err,db)
{
	if(!err)
	{
		console.log("We are connected");
		
		app.get('/',function(req,res)
		{
			res.send("Welcome");
		})

		app.get('/3b_index.html',function(req,res)
		{
			res.sendFile(__dirname+"/"+"3b_index.html")
		})

		app.get('/process_get',function(req,res)
		{
			var NAME=req.query.name
			var BUDGET=parseFloat(req.query.budget)
			var HERO=req.query.hero
			var HEROINE=req.query.heroine
			db.collection('movie').insert({"name":NAME,"budget":BUDGET,"hero":HERO,"heroine":HEROINE},function(err,doc)
			{
				if(err)
					return console.log(err)
				else
					res.status(201).json(doc.ops[1])
			})
			console.log("Record Inserted!!");
			res.send('<p>Name : '+NAME+'</p><p>Budget : '+BUDGET+'</p><p>Hero : '+HERO+'</p><p>Heroine : '+HEROINE+'</p>')
		})

		app.get('/display',function(req,res)
		{
			db.collection('movie').find().toArray(function(err,i)
			{
				if(err)
					return console.log(err);
				res.render('3b.ejs',{movies:i})
			})
		})

		app.get('/search',function(req,res)
		{
			db.collection('movie').find({budget:{$gt:5000000}}).toArray(function(err,i)
			{
				if(err)
					return console.log(err);
				res.render('3b.ejs',{movies:i})
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