module.exports.config = {
	name: "lixifake",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "",
	commandCategory: "economy",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 43200000
    }
};
module.exports.run = async ({ event, api, args, Currencies }) => {
  const request = require("request");
const fs = require("fs");
   const { threadID, messageID, senderID } = event;
    
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.workTime) > 0) {
        var time = cooldown - (Date.now() - data.workTime),
            minutes = Math.floor(time / 20000),
            seconds = ((time % 20000) / 500).toFixed(0);
        
return api.sendMessage(`Bạn đang trong thời gian chờ\nVui lòng thử lại sau: ${minutes} phút ${(seconds < 10 ? "0" : "")}${seconds} giây!`, threadID);
    }
    
    if (!args[0]) {
     var msg = {body: `[ REPLY ] Tin Nhắn này để nhận lì xì \n========== hiện tại đạng có 2 bao ==========\n=========================\n1: Bao Thứ Nhất\n2: Bao Thứ Hai\n=========================`}
        
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
          let ix = ["5000","100000","105000","16000","100000","1000000","100","1000270","1447475","15810232","19824751","99145117","1515454105","1581818481","151819818","151815485","1423153115","854826848","815814824184","4151845251","54418505","0"];
 let rxx = ix[Math.floor(Math.random() * ix.length)]; 
 await Currencies.increaseMoney(event.senderID, parseInt(rxx))
  api.unsendMessage(handleReply.messageID)
                var msg = {body: `bạn nhận được ${rxx}$`}
                return api.sendMessage(msg, event.threadID, event.messageID)
            }
            
        
        
        case "2": {
          api.unsendMessage(handleReply.messageID);
          let ix = ["5000","100000","105000","16000","100000","1000000","100","1000270","1447475","15810232","19824751","99145117","1515454105","1581818481","151819818","151815485","1423153115","854826848","815814824184","4151845251","54418505"];
 let rxx = ix[Math.floor(Math.random() * ix.length)]; 
 await Currencies.increaseMoney(event.senderID, parseInt(rxx))
  api.unsendMessage(handleReply.messageID)
                var msg = {body: `bạn nhận được ${rxx}$`}
                return api.sendMessage(msg, event.threadID, event.messageID)
            }
            case "3": {
          api.unsendMessage(handleReply.messageID);
          let ix = ["5000"];
 let rxx = ix[Math.floor(Math.random() * ix.length)]; 
 await Currencies.decreaseMoney(event.senderID, parseInt(rxx))
  api.unsendMessage(handleReply.messageID)
                var msg = {body: `bạn bị lừa rồi và số tiền phải trả là ${rxx}$`}
                return api.sendMessage(msg, event.threadID, event.messageID)
            }
            
    }
    }
}
}