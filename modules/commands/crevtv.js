module.exports.config = {
    name: "crevtv",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "",
    commandCategory: "Other",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  const { threadID, messageID } = event;

   let type = args.join(" ");
    if (!type) {
        return api.sendMessage("Thiếu từ khoá", event.threadID);
    }
var callback = () => api.sendMessage({body:`ảnh vua tiếng việt của b đây =)))))))`,attachment: fs.createReadStream(__dirname + "/cache/xam.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/xam.jpg"),event.messageID);
return request(encodeURI(`https://www.phamvandienofficial.xyz/vuatiengviet/image?word=${type}`)).pipe(fs.createWriteStream(__dirname+'/cache/xam.jpg')).on('close',() => callback());     
}