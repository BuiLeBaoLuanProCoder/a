module.exports.config = {
  name: "self",
  version: "1.0.0",
  hasPermssion: 3,
  credits: "ARAXY XD",
  description: "selfListen",
  commandCategory: "ờm",
  usages: "",
  cooldowns: 5
};
module.exports.run = async function ({ api, event, client, args, permssion }) {

  const axios = require("axios");
  const { writeFileSync } = require("fs-extra")
  var { threadID, messageID } = event;
  const { configPath } = global.client;
  delete require.cache[require.resolve(configPath)];
  var config = require(configPath);
  if (!args[0]) {
    if (config.FCAOption.selfListen == false) {
      config.FCAOption.selfListen = true;
      api.sendMessage("» Bật thành công selfListen", threadID, messageID);
    } else {
      config.FCAOption.selfListen = false;
      api.sendMessage("» Tắt thành công selfListen", threadID, messageID);
    }
    writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
  }
}