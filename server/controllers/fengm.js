const { mysql } = require('../qcloud');
// const uuid=  require('uuid')

module.exports = async ctx => {
  // var id = uuid.v1();
  var res = await mysql("fengm").select('*');
  ctx.state.data = {
    res: res
  };
}