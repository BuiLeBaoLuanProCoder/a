module.exports.config = {
    name: "stickbug",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "code ngu thì bị bug",
    commandCategory: "image",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "request": ""
    }
};
module.exports.run = async ({ api, event,args }) =>   {
    
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
	 const { threadID, messageID, senderID, body } = event;
var linkanh =  event.messageReply.attachments[0].url || args.join(" ");
	if(!linkanh) return api.sendMessage('Vui lòng reply hoặc nhập link 1 hình ảnh!!!', event.threadID, event.messageID)
	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/bug.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/bug.mp4"),event.messageID);
	 return request((`https://api-ttk.herokuapp.com/other/stickbug?url=${encodeURIComponent(linkanh)}`)).pipe(fs.createWriteStream(__dirname+'/cache/bug.mp4')).on('close',() => callback());     
}
