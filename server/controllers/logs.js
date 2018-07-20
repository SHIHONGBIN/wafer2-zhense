const { mysql } = require('../qcloud');
// const uuid=  require('uuid')

module.exports = async ctx => {
  // var id = uuid.v1();
  var res = await mysql("book1").select('*');
  var bannerdata = await mysql('bannertable').select('*');
  var notice = await mysql('indexNotice').select('*');
  ctx.state.data = {
    res: res,
    bannerdata:bannerdata,
    notice: notice
  };
}