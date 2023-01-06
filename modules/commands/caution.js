module.exports.config = {
    name: "caution",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "tdunguwu",
    description: "",
    commandCategory: "banner",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  const { threadID, messageID } = event;
  const text1 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0];
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/123.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/123.png"),event.messageID);
	 return request(encodeURI(`https://api.popcat.xyz/caution?text=${text1}`)).pipe(fs.createWriteStream(__dirname+'/cache/123.png')).on('close',() => callback());     
}