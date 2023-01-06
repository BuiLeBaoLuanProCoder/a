module.exports.config = {
    name: "achvi",
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
	var text1 = args.toString().split('|')[0].replace(/,/g,  '  ')
 if (!text1)
    return api.sendMessage("[Text1] | [Text2]", event.threadID, event.messageID);
var text2 = args.toString().split('|')[1].replace(/,/g,  '  ')
 if (!text2)
    return api.sendMessage("[Text1] | [Text2]",
	 event.threadID, event.messageID);
	
	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/achievement.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/achievement.png"),event.messageID);
	 return request(encodeURI(`https://api.leoapi.xyz/image/achievement?title=${text1}&text=${text2}`)).pipe(fs.createWriteStream(__dirname+'/cache/achievement.png')).on('close',() => callback());     
}}
