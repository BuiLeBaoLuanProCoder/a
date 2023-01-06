module.exports.config = {
  name: "khienavt",
  version: "1.0.1",
  hasPermssion: 2,
  credits: "tdunguwu",
  description: "",
  commandCategory: "admin",
  usages: "",
  cooldowns: 0,
  denpendencies: {
    "fs-extra": "",
    "request": ""
  }
};
module.exports.run = async function ({ args, api, event }) {
  const query = args[0];
    if (!query) return api.sendMessage("Vui lòng chọn on hoặc off", event.threadID, event.messageID);
    api.profilePictureGuard(query == "on" ? true : false, (err) => {
      if (err)  api.sendMessage("Đã xảy ra lỗi, vui lòng thử lại sau");
      else  api.sendMessage(`Đã ${query == 'on' ? 'bật' : 'tắt'} khiên avatar của bot thành công`, event.threadID, event.messageID);
    })
}
