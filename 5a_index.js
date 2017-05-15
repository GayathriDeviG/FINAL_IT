var fibo=require('./5a_fibo.js')
var arm=require('./5a_arm.js')
num1=5
ans1=fibo.nthFibo(num1)
console.log(num1+" th Fibonacci number is "+ans1)
num2=17
ans2=arm.isArmstrong(num2)
if(ans2)
console.log(num2+" is an Armstrong number")
else
console.log(num2+" is not an Armstrong number")
