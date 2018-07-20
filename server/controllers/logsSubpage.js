const { mysql } = require('../qcloud');
// const uuid=  require('uuid')

module.exports = async ctx => {
  // var id = uuid.v1();
  var url = ctx.query.title;
  var table = await mysql('book1').select('*').where({text:url.toString()});
  var tableId = table[0].id*1;
  var res = await mysql("book1detail" + tableId).select('*');
  var res2 = await mysql("book1detailxxk" + tableId).select('*');
  ctx.state.data = {
    res:res,
    res2:res2
  };
}