module.exports.config = {
    name: "checknude",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "",
    commandCategory: "Game",
    usages: "[reply]",
    cooldowns: 5,
	dependencies: {
  "axios": "",}
};

module.exports.run = async ({ api, event }) => {
const axios = global.nodemodule['axios'];  
var linkanh =  event.messageReply.attachments[0].url || args.join(" ");
	if(!linkanh) return api.sendMessage('Vui lòng reply hoặc nhập link 1 hình ảnh!!!', event.threadID, event.messageID)
const res = await axios.get(`https://api-test.d-jukie.repl.co/nude?key=wltOzZ4tD7&link= ${encodeURIComponent(linkanh)}`);    
var img = res.data.data;
    return api.sendMessage(`tỷ lệ nude của ảnh là: ${img}%`, event.threadID, event.messageID);
	
}
