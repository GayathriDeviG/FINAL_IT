function isAutomorphic(num)
{
	var square=num*num
	var n=num.toString()
	var s=square.toString()
	if(s.endsWith(n))
	return 1
	else
	return 0
}
module.exports.isAutomorphic=isAutomorphic