const { mysql } = require('../qcloud');
const formatDate = require('../middlewares/formatDate.js')

async function get(ctx, next) {
  //获取页数
  const newPage = ctx.query.page-1;
  //每页查询5条数据
  let perPage = 5;
  //每次查询的id
  let pageArr = [];

  //查询哪个表
  var name = ctx.query.name;
  var table = await mysql('book1').select('*').where({ text: name.toString() });
  var tableId = table[0].id * 1;

  let totleLength = await mysql("messageText"+tableId).select('*');
  let totlerArrayLength = totleLength.length;

  for(var i = 0; i < perPage; i++){
    pageArr[i] = (totlerArrayLength -perPage*newPage-i)
  }

  var res = await mysql("messageText" + tableId).select('*').whereIn('id', pageArr);
  ctx.state.data = {
    res: res
  };
}

async function post(ctx, next) {
  /**
   * 解析微信发送过来的请求体
   * 可查看微信文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/receive.html#接收消息和事件
   */
  const body = ctx.request.body;
  //查询哪个表
  var name = ctx.query.name;
  var table = await mysql('book1').select('*').where({ text: name.toString() });
  var tableId = table[0].id * 1;



  const list = await mysql("messageText" + tableId).select('*');
  body.id = list.length+1;
  // body.text = URLDecoder.decode(body. )
  // body.time = formatDate('-');
  await mysql("messageText" + tableId).insert(body)
  
  ctx.state.data = {
    res: tableId
  }
}


module.exports = {
  get,
  post
}