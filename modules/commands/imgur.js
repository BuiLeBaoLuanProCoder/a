module.exports.config = {
    name: "imgur",
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

module.exports.run = async ({ api, event, args }) => {
const axios = global.nodemodule['axios'];  
var linkanh = event.messageReply.attachments[0].url || args.join(" ") ;
	if(!linkanh) return api.sendMessage('Vui lòng reply hoặc nhập link 1 hình ảnh!!!', event.threadID, event.messageID)
const res = await axios.get(`https://apicailoznheuwu.araxy-ox-qwqbqiws.repl.co/imgur?link=${encodeURIComponent(linkanh)}`);    
var img = res.data.uploaded.image;
    return api.sendMessage(`${img}`, event.threadID, event.messageID);
	
}
