module.exports.config = {
    name: "changemymind",
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
	var text = args.join(" ");
  if (event.type == "message_reply") {
        text = event.messageReply.body}
	if (!text) return api.sendMessage("Nhập nội dung cần viết !", threadID, messageID);

	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/ccm.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/ccm.png"),event.messageID);
	 return request(encodeURI(`https://api.leoapi.xyz/image/changemymind?text=${text}`)).pipe(fs.createWriteStream(__dirname+'/cache/ccm.png')).on('close',() => callback());     
}}
