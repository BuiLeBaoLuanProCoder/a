module.exports.config = {
    name: "drake",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "tdunguwu",
    description: "drake",
    commandCategory: "Other",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  const { threadID, messageID } = event;
  const text1 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0];
   const text2 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1];
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/drake.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/drake.png"),event.messageID);
	 return request(encodeURI(`https://api.leoapi.xyz/image/drake?text1=${text1}&text2=${text2}`)).pipe(fs.createWriteStream(__dirname+'/cache/drake.png')).on('close',() => callback());     
}