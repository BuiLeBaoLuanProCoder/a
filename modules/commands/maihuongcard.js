module.exports.config = {
    name: "maihuong",
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
 const text1 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0];
const text2 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1];
 ;
	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/maihuong.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/maihuong.png"),event.messageID);
	 return request(encodeURI(`http://mzkapi.me/shopmaihuong?text1=${text1}&text2=${text2}&apikey=KeyTest`)).pipe(fs.createWriteStream(__dirname+'/cache/maihuong.png')).on('close',() => callback());     
}}