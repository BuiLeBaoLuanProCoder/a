module.exports.config = {
	name: "ts",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "",
	commandCategory: "economy",
    cooldowns: 5
};
module.exports.run = async ({ event, api, args, Currencies }) => {
  const request = require("request");
const fs = require("fs");
   const { threadID, messageID, senderID } = event;
    if (!args[0]) {
     var msg = {body: `[ REPLY ] done`}
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
    var { author } = handleReply;
    switch (handleReply.type) {
    case "choosee": {
        switch (event.body) {
        case "1": {
          api.unsendMessage(handleReply.messageID);
          return api.sendMessage(event.threadID, event.threadID, event.messageID);
            }
        case "2": {
          api.unsendMessage(handleReply.messageID);
          
  
                var msg = {body: `sàm`}
                return api.sendMessage(msg, event.threadID, event.messageID)
            }
            case "3": {
          api.unsendMessage(handleReply.messageID);
          
  
                var msg = {body: `sàm`}
                return api.sendMessage(msg, event.threadID, event.messageID)
            }
            
    }
    }
}
}