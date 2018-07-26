const { mysql } = require('../qcloud');
// const uuid=  require('uuid')

async function get(ctx, next) {
  var res = await mysql("fengm").select('*');
  var commit = await mysql("fengmCommit").select('*');
  ctx.state.data = {
    res: res,
    commit: commit
  };
}


async function post(ctx, next) {
  /**
   * 解析微信发送过来的请求体
   * 可查看微信文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/receive.html#接收消息和事件
   */
  const body = ctx.request.body;
  //查询哪个
  const list = await mysql("fengmCommit").select('*');
  body.id = list.length + 1;
  // body.text = URLDecoder.decode(body. )
  // body.time = formatDate('-');
  await mysql("fengmCommit").insert(body)
  const a = await mysql("fengmCommit").select('*');
  ctx.state.data = {
    res: 111111111
  }
}

module.exports = {
  get,
  post
}