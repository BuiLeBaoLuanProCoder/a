module.exports.config = {
    name: "meevrywhere",
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
module.exports.run = async ({ api, event,args }) => {  {
    
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
	 const { threadID, messageID, senderID, body } = event;
	 let text = args.join(" ")
  if (!text) return api.sendMessage('Vui lòng nhập đúng định dạng [text1 | text2 ]!', event.threadID, event.messageID);
  const length_0 = parseInt(text.length)
  const text1 = text.substr(0, text.indexOf(' | ')); 
  if (!text1) return api.sendMessage('Vui lòng nhập đúng định dạng [text1 | text2 ]!', event.threadID, event.messageID);
  const length = parseInt(text1.length)
  const text2 = text.split(" | ").pop()
  if (!text2) return api.sendMessage('Vui lòng nhập đúng định dạng [text1 | text2 ]!', event.threadID, event.messageID);
  const length_2 = parseInt(text2.length)

	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/poh.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/poh.png"),event.messageID);
	 return request(encodeURI(`https://api.memegen.link/images/buzz/${text1}/${text2}.png`)).pipe(fs.createWriteStream(__dirname+'/cache/poh.png')).on('close',() => callback());     
}}
