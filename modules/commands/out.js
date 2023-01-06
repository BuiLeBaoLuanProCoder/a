module.exports.config = {
  name: "out",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "VanHung & fix by Dung UwU",
  description: "Out theo id box",
  commandCategory: "Admin",
  usages: "out",
  cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
  const moment = require("moment-timezone");
  var time = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss || DD/MM/YYYY');
    const name = args.join(" ")
   let namee = await api.getThreadInfo(name)
  if (!name) api.removeUserFromGroup(api.getCurrentUserID(), event.threadID)
else api.sendMessage(`Bot đã nhận lệnh rời khỏi nhóm ${namee.name} từ Admin\nVào lúc: ${time}`, name, () => api.removeUserFromGroup(api.getCurrentUserID(), name)).then(api.sendMessage("💦Bot đã rời nhóm " + namee.name, event.threadID, event.messageID))
}