var express=require('express');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});

var app=express();
var expressValidator=require('express-validator');
app.use(expressValidator());

app.get('/',function(req,res)
{
console.log("Got request for homepage");
res.send("<h1>Welcome</h1>");
})

app.get('/6b_index.html',function(req,res)
{
	res.sendFile(__dirname+"/"+"6b_index.html");
})

app.post('/process_post',urlencodedParser,function(req,res)
{

	req.checkBody('name','Invalid Name').notEmpty();
	req.checkBody('marks','Invalid Marks').isInt();
	var errors=req.validationErrors();
	if(errors)
	{
		res.send(errors);
		return;
	}
	else
	{
		res.send("No Errors");
		console.log("No errors");
		console.log("Data Entered are Name:"+req.body.name+" USN :"+req.body.usn+" Branch :"+req.body.branch+" Marks :"+req.body.marks);
	}
})
var server=app.listen(5000,function()
{
var host=server.address().address;
var port=server.address().port;
console.log("Listening at http:// %s %s",host,port);
})