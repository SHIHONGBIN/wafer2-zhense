module.exports = async function formatDate(contact) {
  var data = new Date();
  var y = data.getFullYear();
  var mo = data.getMonth() * 1 + 1;
  var d = data.getDate();
  var h = data.getHours();
  var mi = data.getMinutes();
  var s = data.getSeconds();
  return y + contact + mo + contact + d + ' ' + ' ' + h + ':' + mi + ':' + s
}
