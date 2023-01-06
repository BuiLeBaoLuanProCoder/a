module.exports.config = {
	name: "podium",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "Podium",
	commandCategory: "image",
	usages: "Podium",
	cooldowns: 5,
	dependencies: {"fs-extra": "","discord.js": "","discord-image-generation" :"","node-superfetch": ""}
};

module.exports.run = async ({ event, api, args, Users }) => {
  const DIG = global.nodemodule["discord-image-generation"];
  const Discord = global.nodemodule['discord.js'];
  const request = global.nodemodule["node-superfetch"];
  const fs = global.nodemodule["fs-extra"];
  if (this.config.credits != 'tdunguwu') {
        console.log('\x1b[33m[ WARN ]\x1b[37m » Đổi credits con cặc đjt mẹ mày luôn đấy con chó:))'+ global.config.BOTNAME + ' đổi credits modules "' + this.config.name + '"');
        return api.sendMessage('[ WARN ] Phát hiện người điều hành bot ' , event.threadID, event.messageID);
      }
   let { senderID, threadID, messageID } = event;
  var id = Object.keys(event.mentions)[0] || event.senderID;
   var id1 = Object.keys(event.mentions)[1];
   
	var name1 = (await Users.getData(senderID)).name
  var name2 = (await Users.getData(id)).name
  var name3 = (await Users.getData(id1)).name
  var avatar1 = (await request.get(`https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).body;
  var avatar2 = (await request.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).body;
  var avatar3 = (await request.get(`https://graph.facebook.com/${id1}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).body;
 
  let img = await new DIG.Podium().getImage(avatar1, avatar2,avatar3,name1,name2,name3);
  let attach = new Discord.MessageAttachment(img);
  var path_podium = __dirname + "/cache/Podium.png";
  fs.writeFileSync(path_podium, attach.attachment);
  api.sendMessage({attachment: fs.createReadStream(path_podium)}, event.threadID, () => fs.unlinkSync(path_podium), event.messageID);
}