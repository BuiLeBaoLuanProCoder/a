module.exports.config = {
    name: "facts",
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
	var text1 = args.toString().replace(/,/g,  '  ');
 if (!text1)
    return api.sendMessage("[Text1]", event.threadID, event.messageID);

	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/facts.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/facts.png"),event.messageID);
	 return request(encodeURI(`https://api.popcat.xyz/facts?text=${text1}`)).pipe(fs.createWriteStream(__dirname+'/cache/facts.png')).on('close',() => callback());     
}}
