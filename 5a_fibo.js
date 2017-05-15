function nthFibo(num)
{
	if(num==1)
		return 0
	else if(num==2)
		return 1
	else
		return nthFibo(num-1)+nthFibo(num-2)
}
module.exports.nthFibo=nthFibo 