module.exports.config = {
	name: "todreply",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "",
	commandCategory: "other",
    cooldowns: 5
};
module.exports.run = async ({ event, api, args, Currencies }) => {
  const request = require("request");
const fs = require("fs");
   const { threadID, messageID, senderID } = event;
    
    
    
    if (!args[0]) {
     var msg = {body: `[ REPLY ] Tin Nhắn này để chọn thật hoặc thách \n=========================\n1: thách\n2: thật\n=========================`}
        
        return api.sendMessage(msg, event.threadID, (error, info) => {
        
            global.client.handleReply.push({
                type: "choosee",
                name: this.config.name,
                author: event.senderID,
                messageID: info.messageID
            })
        })
    }
}
    module.exports.handleReply = async function ({
    args,
    event,
    Users,
    api,
    handleReply,
    Currencies
}) {
  const axios = require("axios");
    var { author } = handleReply;
    if (event.senderID != author) return api.sendMessage("cút mẹ mày đi", event.threadID, event.messageID); 
    switch (handleReply.type) {
    case "choosee": {
        switch (event.body) {
        case "1": {
          api.unsendMessage(handleReply.messageID);
          
               const res = await axios.get(`https://le31.glitch.me/other/truthordare/dare/play`);
    return api.sendMessage(`dare : ${res.data.data}`, event.threadID, event.messageID)

            }
            
        
        
        case "2": {
          api.unsendMessage(handleReply.messageID);
         const res = await axios.get(`https://le31.glitch.me/other/truthordare/truth/play`);
    return api.sendMessage(`truth : ${res.data.data}`, event.threadID, event.messageID)
            }
            break;
					default:
           const choose = parseInt(event.body);
            	if (isNaN(event.body)) return api.sendMessage("Vui lòng nhập 1 con số", event.threadID, event.messageID);
            	if (choose > 2 || choose < 1) return api.sendMessage("Lựa chọn không nằm trong danh sách.", event.threadID, event.messageID); 
            
    }
    }
}
}