const timeout = 120
module.exports.config = {
    name: "dhbcemj",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "",
    commandCategory: "Game",
    usages: "",
    cooldowns: 5
};
module.exports.run = async function ({ api, event, Users }) {
  const axios = require("axios");
    const fs = require("fs-extra");
    const { threadID, messageID } = event;
    const datagame = (await axios.get("https://goatbot.tk/api/duoihinhbatchuemoji")).data;
    const random = datagame.data;
     var msg = {body: `Hãy reply tin nhắn này với câu trả lời\n${random.emoji1}${random.emoji2}\n${random.wordcomplete.replace(/\S/g, "█ ")}`}
        return api.sendMessage(msg, event.threadID, (error, info) => {
        global.client.handleReply.push({
            type: "reply",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID,
            
           wordcomplete: random.wordcomplete
        })
setTimeout(function(){ 
        api.unsendMessage(info.messageID)
        }, timeout*1000);
    }) 
}
module.exports.handleReply = async function ({ args, event, Users, api, handleReply }) {
    const axios = global.nodemodule['axios'];  
    let { author, wordcomplete, messageID } = handleReply;
   
    if (event.senderID != author) return api.sendMessage("Bạn không phải là người chơi của câu hỏi này", event.threadID, event.messageID); 
    switch (handleReply.type) {
        case "reply": {
          function formatText (text) {
      return text.normalize("NFD")
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
    }
    
    (formatText(event.body) == formatText(wordcomplete)) ? api.sendMessage(`Chúc mừng bạn đã trả lời đúng đáp án là : ${wordcomplete} `, event.threadID, event.messageID) : api.sendMessage(`Opps, Sai rồi đáp án chính xác là : ${wordcomplete}`,event.threadID, event.messageID),
    api.unsendMessage(handleReply.messageID);
        }
    }
}