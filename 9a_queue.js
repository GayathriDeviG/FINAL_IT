
function queues(num)

{

	var queue = [];

	var len=num.length;

	console.log("Queue"); 

	for (var i=0;i<len;i++)
	
{
		
queue.push(num[i]); 
		
console.log("Element inserted into queue:"+num[i]); 
	
}  
 
 
	for (var i=0;i<len;i++)
	
{
  
		var j = queue.shift();
		

console.log("Element deleted from queue:"+j);

	}			         
}
module.exports.queues=queues
