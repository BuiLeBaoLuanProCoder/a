module.exports.config = {
  name: "shareao",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ARAXY",
  description: "Tun Share Ao Nhung O Dang mdl ?",
  commandCategory: "admin",
  usages: "",
  cooldowns: 2,
  dependencies: {"axios" : ""}
};
module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  var myVar = setInterval(myTimer, 5000);
async function myTimer() {
try {
  const res = await axios.get('https://graph.facebook.com/me/feed?method=post&access_token=' + args[0] + '&link=' + args[1] + '&privacy={"value":"EVERYONE"}&published=0')
  console.log(`${res.data.id}`)
} catch (error) {
   console.log('loi roi')
}
}
  if(!args[0]){
    return api.sendMessage(`thiu kia be oi`, event.threadID, event.messageID)
 } else {
    return api.sendMessage(`cai thanh cong bai viet ${args[1]}`, event.threadID, event.messageID)
 }
}