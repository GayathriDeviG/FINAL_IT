function stacks(num)

{
	
var stack=[];

	var len=num.length;
	
console.log("Stack");
	
for (var i=0;i<len;i++)

	{
		
stack.push(num[i]);  
		
console.log("Element pushed into stack:"+num[i]);
	
}   
 
 
	for (var i=0;i<len;i++)
	
{
  
		var j = stack.pop();
		
console.log("Element popped from stack:"+j);
	
}			

}

module.exports.stacks=stacks

