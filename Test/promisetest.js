/**
 * Created by zmk on 2016/11/24.
 */
var q =require('q');
function readtext1( text){
    console.log(text);
    return 'test1';
}
function readtext2( text){
    console.log(text);
    return 'test2';
}

q.fcall(readtext2("aaa")).then(function(t1){
console.log("q   t1:  "+t1);
});
