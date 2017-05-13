var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var urlencodedParser=bodyParser.urlencoded({extended:false})

app.get('/',function(req,res)
{
	res.send('Welcome');
})

app.get('/4b_index.html',function(req,res)
{
	res.sendFile(__dirname+"/"+"4b_index.html");
})

app.get('/nit',function(req,res)
{
	console.log("Got a request for National Institute of Technology");
	res.send('Branches in NIT Surathkal are</br>1.Mechanical Engineering</br>2.Civil Engineering</br>3.Chemical Engineering</br>4.Computer Science</br>');
})

app.get('/rv',function(req,res)
{
	console.log("Got a request for RV College of Engineering");
	res.send('Branches in RV College are</br>1.Mechanical Engineering</br>2.Civil Engineering</br>3.Chemical Engineering</br>4.Computer Science</br>');
})

app.get('/manipal',function(req,res)
{
	console.log("Got a request for Manipal Institute of Technology");
	res.send('Branches in Manipal Institute are</br>1.Mechanical Engineering</br>2.Civil Engineering</br>3.Chemical Engineering</br>4.Computer Science</br>');
})

app.get('/msrit',function(req,res)
{
	console.log("Got a request for Ramaiah Institute of Technology");
	res.send('Branches in MSRIT are</br>1.Mechanical Engineering</br>2.Civil Engineering</br>3.Chemical Engineering</br>4.Computer Science</br>');
})

app.get('/pesit',function(req,res)
{
	console.log("Got a request for PES Institute of Technology");
	res.send('Branches in PESIT are</br>1.Mechanical Engineering</br>2.Civil Engineering</br>3.Chemical Engineering</br>4.Computer Science</br>');
})

var server=app.listen(5000,function()
{
	var host=server.address().address
	var port=server.address().port
	console.log("Example app listening at http://%s %s",host,port);
})