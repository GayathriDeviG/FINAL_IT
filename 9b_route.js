var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var urlencodedParser=bodyParser.urlencoded({extended:false})

app.get('/',function(req,res)
{
	console.log("Got a request for the homepage");
	res.send('<body style="background-color:yellow"><h1>Welcome</h1>')
})

app.get('/9b_index.html',function(req,res)
{
	res.sendFile(__dirname+"/"+"9b_index.html");
})

app.get('/karnataka',function(req,res)
{
	console.log("Got a request for Karnataka");
	res.send('<body style="background-color:pink">Must see places in Karnataka are</br>1.Mysore</br>2.Hampi</br>3.Shivamogga Jog Falls');
})

app.get('/kerala',function(req,res)
{
	console.log("Got a request for Kerala");
	res.send('<body style="background-color:violet">Must see places in Kerala are</br>1.Wayanad</br>2.Munnar</br>3.Thekaddy')
})

app.get('/tamilnadu',function(req,res)
{
	console.log("Got a request for Tamil Nadu");
	res.send('<body style="background-color:lightgreen">Must see places in Tamil Nadu are</br>1.Mahabalipuram</br>2.Kanyakumari</br>3.Kodaikanal')
})

var server=app.listen(5000,function()
{
	var host=server.address().address
	var port=server.address().port
	console.log("Example app listening at http://%s %s",host,port);
})