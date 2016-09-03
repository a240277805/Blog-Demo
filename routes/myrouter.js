exports.index=function(req,res)
{
  res.render('index', { title: '首页',
                         layout:'layout'});
};
exports.user=function(req,res)
{

};
exports.post=function(req,res)
{

};
exports.req=function(req,res)
{

};
exports.doReg=function(req,res)
{
  res.render('reg',{title:'用户注册',
                      layout:'layout'});
};
exports.login=function(req,res)
{

};
exports.doLogin=function(req,res)
{

};
exports.logout=function(req,res)
{

};