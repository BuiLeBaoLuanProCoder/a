module.exports.config = {
    name: "tictoc",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "",
    commandCategory: "image",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "request": ""
    }
};
module.exports.run = async ({ api, event,args }) =>  {
    
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
	 const { threadID, messageID, senderID, body } = event;
   try{
let text = args.join(" ")
  if (!text) return api.sendMessage('Vui lòng nhập đúng định dạng [text1 | text2 | text3]!', event.threadID, event.messageID);
  const length_0 = parseInt(text.length)
 const text1 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0];
 if (!text1) return api.sendMessage('Vui lòng nhập đúng định dạng [text1 | text2 | text3]!', event.threadID, event.messageID);
const text2 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1];
if (!text2) return api.sendMessage('Vui lòng nhập đúng định dạng [text1 | text2 | text3]!', event.threadID, event.messageID);
 
 
	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/toptop.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/toptop.png"),event.messageID);
	 return request(encodeURI(`https://database-test.bangprocode.repl.co/edit/anhbia?apikey=DVB&name=${text1}&age=${text2}`)).pipe(fs.createWriteStream(__dirname+'/cache/toptop.png')).on('close',() => callback());     
}
catch (err) {
        console.log(err)
        return api.sendMessage(`Đã xảy ra lỗi`, event.threadID)
    }
}