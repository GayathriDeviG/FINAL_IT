function isPalindrome(num)
{
	
	var rev=0
	var n=num
	while (num != 0) 
	{
  		rev=rev*10
		dig=num%10
 	 	rev=rev+dig
		num=num-dig
  		num=num/10
  	}
	console.log("Reverse is "+rev)
	if(rev==n)
		return 1
	else
		return 0
}
module.exports.isPalindrome=isPalindrome