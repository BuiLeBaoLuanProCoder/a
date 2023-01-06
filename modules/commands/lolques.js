const timeout = 60
const coinsup = 20000 
const coinsdown = 5000
const tientrochoi = 1000
module.exports.config = {
    name: "lolquest",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "lolquest nhưng nhớ viết hoa chữ cái đầu -.-",
    commandCategory: "Game",
    usages: "",
    cooldowns: 5
};
module.exports.run = async function ({ api, args, event, Currencies, Users }) {
  const axios = require("axios");
    const fs = require("fs-extra");
    const { senderID ,threadID, messageID } = event;
    var info = await api.getUserInfo(event.senderID);
    var nameSender = info[event.senderID].name;
    var arraytag = [];
        arraytag.push({id: event.senderID, tag: nameSender});
        let balance = (await Currencies.getData(senderID)).money;
    if (balance <= 5000) return api.sendMessage('bạn nghèo  quá nên không có tiền chơi đâu liuliu',threadID,messageID);
     await Currencies.decreaseMoney(event.senderID, parseInt(tientrochoi));
    const res = await axios.get("https://randomlinkapi-1.duongduong216.repl.co/lolgame");
    const random = res.data.dataGame.question;
    const answer = res.data.dataGame.answer;
     var msg = {body: `Hãy reply tin nhắn này với câu trả lời câu hỏi sau \n=========================\n - ${random} \n=========================\n đã trừ ${nameSender} -${tientrochoi}$` ,mentions: arraytag}
        return api.sendMessage(msg, event.threadID, (error, info) => {
        global.client.handleReply.push({
            type: "reply",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID,
            
           answer: answer
        })
setTimeout(function(){ 
        api.unsendMessage(info.messageID)
        
        }, timeout*1000);
    }) 
}
module.exports.handleReply = async function ({ args, event, Users, Currencies, api, handleReply }) {
    const axios = global.nodemodule['axios'];  
    let { author, answer, messageID } = handleReply;
   
    if (event.senderID != author) return api.sendMessage("xàm lồn quá cho người ta trả lời đi đbrr", event.threadID, event.messageID); 
    switch (handleReply.type) {
        case "reply": {
            const dapan = event.body
            if (dapan == answer) {
               await Currencies.increaseMoney(event.senderID, parseInt(coinsup))
               
               var namePlayer = await Users.getData(event.senderID)
                api.unsendMessage(handleReply.messageID)
                var msg = {body: `${namePlayer.name} đã trả lời chính xác!\nĐáp án: ${answer} (+${coinsup}$)`}
                return api.sendMessage(msg, event.threadID, event.messageID)
            }
            else
               await Currencies.decreaseMoney(event.senderID, parseInt(coinsdown))
            return api.sendMessage(`Câu trả lời không đúng. Đáp án: ${answer} (-${coinsdown}$)!!!`, event.threadID, event.messageID),
            api.unsendMessage(handleReply.messageID);
        }
    }
}