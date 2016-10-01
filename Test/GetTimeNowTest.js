/**
 * Created by zmk on 2016/10/1.
 */
var myDate = new Date();
var time=myDate.getYear();        //获取当前年份(2位)
time=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
time=myDate.getMonth();       //获取当前月份(0-11,0代表1月)
time=myDate.getDate();        //获取当前日(1-31)
time=myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
time=myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
time=myDate.getHours();       //获取当前小时数(0-23)
time=myDate.getMinutes();     //获取当前分钟数(0-59)
time=myDate.getSeconds();     //获取当前秒数(0-59)
time=myDate.getMilliseconds();    //获取当前毫秒数(0-999)
time=myDate.toLocaleDateString();     //获取当前日期
var mytime=myDate.toLocaleTimeString();     //获取当前时间

myDate.toLocaleString( );        //获取日期与时间
console.log(myDate.toLocaleDateString()+" "+myDate.toLocaleTimeString());
