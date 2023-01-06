module.exports.config = {
    name: "pinteres",
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

  const type = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0];
if (!type) return api.sendMessage('Vui lòng nhập đúng định dạng [text1 ]!', event.threadID, event.messageID);
  const res = await axios.get(`http://api-ttk.herokuapp.com/social/pinterest?text=${encodeURIComponent(type)}&apikey=ttk`);
  let url = res.data.result[0];
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/pinteres.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/pinteres.jpg"),event.messageID);
return request(encodeURI(`${url}`)).pipe(fs.createWriteStream(__dirname+'/cache/pinteres.jpg')).on('close',() => callback());     
}