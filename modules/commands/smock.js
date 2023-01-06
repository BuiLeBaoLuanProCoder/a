module.exports.config = {
    name: "smoke",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "tdunguwu",
    description: "tao banner tren api lawerpr0ject",
    commandCategory: "banner",
    usages: "bannerlw",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  const { threadID, messageID } = event;

  const text1 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0];
  const res = await axios.get(`https://lawerpr0ject.herokuapp.com/banner/smoketext?text=${text1}&apikey=lawerteam`);
  let url = res.data.url;
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/uwu.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/uwu.jpg"),event.messageID);
return request(encodeURI(`${url}`)).pipe(fs.createWriteStream(__dirname+'/cache/uwu.jpg')).on('close',() => callback());     
}