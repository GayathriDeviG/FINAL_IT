function isArmstrong(num)
{
	var sum=0,rem=0,cube=0,temp
	temp=num
	while(num!=0)
	{
		rem=num%10
		cube=rem*rem*rem
		sum=sum+cube
		num=num-rem
		num=num/10
	}
	//console.log(sum)
	if(sum==temp)
		return 1
	else
		return 0
}
module.exports.isArmstrong=isArmstrong