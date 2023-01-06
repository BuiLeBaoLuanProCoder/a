module.exports.config = {
    name: "emojimix",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "mixemoji",
    description: "Ghép Icon",
    commandCategory: "Horizon fix code by kiraUwU",
    cooldowns: 0,
    denpendencies: {
        "fs": "",
        "request": "",
        "emoji-unicode": ""
    }
};
module.exports.run = async function ({ api,event,args }) {
const { threadID, messageID, senderID } = event;
const emojiUnicode = require("emoji-unicode");
const fs = require('fs');
const request = require('request');
try{
  var www = args[0];
  var ww = args[1]
     var emoji1 = "u"+emojiUnicode(www);
     var emoji2 = "u"+emojiUnicode(ww);
 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/mixxx.png")}, threadID, () => fs.unlinkSync(__dirname + "/cache/mixxx.png"),messageID);
 return request(encodeURI(`https://www.gstatic.com/android/keyboard/emojikitchen/20201001/${emoji1}/${emoji1}_${emoji2}.png`)).pipe(fs.createWriteStream(__dirname+'/cache/mixxx.png')).on('close',() => callback());     
} catch (err) {
  return api.sendMessage("lỗi rồi", threadID, messageID)
}
}