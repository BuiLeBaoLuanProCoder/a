module.exports.config = {
    name: "maver",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "tdunguwu",
    description: "",
    commandCategory: "banner",
    usages: "bannerlw",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {

  const request = require('request');
  const fs = require("fs");
  const { threadID, messageID } = event;
	
  const text1 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0];
  const text2 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1];
  
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/bannerwe.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/bannerwe.jpg"),event.messageID);
return request(encodeURI(`https://zenzapi.xyz/api/textpro/marvel?text=${text1}&text2=${text2}&apikey=54ece32d06`)).pipe(fs.createWriteStream(__dirname+'/cache/bannerwe.jpg')).on('close',() => callback());     
}