module.exports.config = {
  name: "age",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Orson",//CuGoiLaLuan:3
  description: "age no api =))",
  commandCategory: "countdown",
  usages: "[ngày/tháng/năm sinh]",
  cooldowns: 0
};

module.exports.run = function ({ event, args, api, getText }) {
  const moment = require("moment-timezone");
  var date = new Date();
  var yearin = moment.tz("Asia/Ho_Chi_Minh").format("YYYY");
  var dayin = moment.tz("Asia/Ho_Chi_Minh").format("DD");
  var monthin = moment.tz("Asia/Ho_Chi_Minh").format("MM");
  var input = args[0];
  if (!input) return api.sendMessage("Sai định dạng", event.threadID);
  var content = input.split("/");
  var dayout = parseInt(content[0]);
  if (!dayout || isNaN(dayout) || dayout > 31 || dayout < 1) { return api.sendMessage("Ngày sinh không hợp lệ!", event.threadID)}
  var monthout = parseInt(content[1]);
  if (!monthout || isNaN(monthout) || monthout > 12 || monthout < 1) { return api.sendMessage("Tháng sinh không hợp lệ!", event.threadID)}
  var yearout = parseInt(content[2]);
  if (!yearout || isNaN(yearout) || yearout > yearin || yearout < 1) { return api.sendMessage("Năm sinh không hợp lệ!", event.threadID)}
  var tuoi = yearin - yearout
  var msg = `Năm nay bạn ${tuoi} tuổi.`
  if (monthout > monthin) {var tuoi = tuoi - 1; var aftermonth = monthout - monthin; var msg = `Năm nay bạn ${tuoi} tuổi. Còn ${aftermonth} tháng nữa là bạn sẽ tròn ${tuoi + 1} tuổi.`};
  if (monthin == monthout && dayin < dayout) {var tuoi = tuoi - 1; var afterday = dayout - dayin; var msg = `Năm nay bạn ${tuoi} tuổi. Còn ${afterday} ngày nữa là bạn sẽ tròn ${tuoi + 1} tuổi.`};
  return api.sendMessage(msg, event.threadID)
}