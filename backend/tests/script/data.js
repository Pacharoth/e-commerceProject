// var date1 = new Date("06/02/2019");
// var date2 = new Date("06/02/2019");
 
// // To calculate the time difference of two dates
// var Difference_In_Time = date2.getTime() - date1.getTime();
 
// // To calculate the no. of days between two dates
// var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
// console.log(Difference_In_Days)
var date = new Date()
date.setFullYear(2020);
date.setMonth(11)
console.log(date.toLocaleDateString())