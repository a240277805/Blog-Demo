var redis = require('redis');
var config = require('../config');
// use custom redis url or localhost
var client = redis.createClient(config.RedisPort || 6379, config.RedisHost || 'localhost');
var RDS_PWD = '123456';
client.auth(RDS_PWD, function(){
    console.log("通过RedisPWD认证");
});

client.on('error', function(err){
    console.error('Redis连接错误: ' + err);
    process.exit(1);
});
/**
 * 设置缓存
 * @param key 缓存key
 * @param value 缓存value
 * @param expired 缓存的有效时长，单位秒
 * @param callback 回调函数
 */
exports.setItem = function(key, value, expired, callback){
    client.set(key, JSON.stringify(value), function(err){
        if(err){
            return callback(err);
        }
        // if(expired)｛
         client.expire(key, expired);
        // ｝
//      return callback(null);
    });
}
/**
 * 获取缓存
 * @param key 缓存key
 * @param callback 回调函数
 */
exports.getItem = function(key, callback){
    client.get(key, function(err, reply){
        if(err){
            return callback(err);
        }
        return callback(null, JSON.parse(reply));
    });

}
/**
 * 移除缓存
 * @param key 缓存key
 * @param callback 回调函数
 */
exports.removeItem = function(key, callback){
    client.del(key, function(err){
        if(err){
            return callback(err);
        }
        return callback(null);
    });
}


/*client.set('abc','nininininini',function(err){
 if(err)
 {
 console.log(err);
 }
 //设置过期时间，单位妙
 client.expire('abc',1);
 console.log('sucess cha ru  something');
 })

 client.get('abc',function(err,reply){
 if(err)
 {
 console.log(err);
 }
 console.log(reply);
 })*/

/**
 * 获取默认过期时间，单位秒
 */
exports.defaultExpired = Number(require('../config/setting').CacheExpired);
// console.log('OK');
