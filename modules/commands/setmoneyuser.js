module.exports.config = {
  name: "setmoneyuser",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "bủh",
  description: "Điều chỉnh thông tin của người dùng",
  commandCategory: "system",
  usages: "",
  cooldowns: 5
};
module.exports.run = async function ({ event, api, Currencies, args }) {
  const { threadID, messageID, senderID } = event;
  if (args[0] == "uid") {
    var lmao = args[1]
    var uid_them = args[2]
    await Currencies.increaseMoney(lmao, parseInt(uid_them));
    return api.sendMessage(`[Money] Đã cộng thêm ${uid_them}$ cho ${lmao}`, threadID, messageID)
  }
  if (args[0] == "add") {
    var mentionID = Object.keys(event.mentions);
  var concac = parseInt(args[1]);
  var message = [];
  var error = [];
    if (mentionID.length != 0) {
      for (singleID of mentionID) {
        if (!concac || isNaN(concac)) {
        return  api.sendMessage('lz', threadID, messageID)
        }
        try {
          await Currencies.increaseMoney(singleID, concac);
          message.push(singleID);
        } catch (e) { console.log(e) };
      }
      return api.sendMessage(`[Money] Đã cộng thêm ${concac}$ cho ${message.length} người`, threadID, function () { if (error.length != 0) return api.sendMessage(`[Error] Không thể thể cộng thêm tiền cho ${error.length} người!`, threadID) }, messageID);
    }
    } 
     else {
      if (event.type == "message_reply") { uid = event.messageReply.senderID }
      else uid = event.senderID;
      var money = args[0]
      await Currencies.increaseMoney(uid, parseInt(money));
      return api.sendMessage(`[Money] Đã cộng thêm ${money}$ cho ${uid}`, threadID, messageID)
    }
  
}