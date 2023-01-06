module.exports.config = {
	name: "putin",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "",
	commandCategory: "image",
	usages: "...",
	cooldowns: 5,
	dependencies: {"fs-extra": "","discord.js": "","discord-image-generation" :"","node-superfetch": ""}
};

module.exports.run = async ({ event, api, args, Users }) => {
  const DIG = global.nodemodule["discord-image-generation"];
  const Discord = global.nodemodule['discord.js'];
  const request = global.nodemodule["node-superfetch"];
  const fs = global.nodemodule["fs-extra"];
  var id = Object.keys(event.mentions)[0] || event.senderID;
  var avatar = (await request.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).body;
  let img = await new DIG.Poutine().getImage(avatar);
  let attach = new Discord.MessageAttachment(img);
  var path_putin = __dirname + "/cache/Poutine.png";
  fs.writeFileSync(path_putin, attach.attachment);
  api.sendMessage({attachment: fs.createReadStream(path_putin)}, event.threadID, () => fs.unlinkSync(path_putin), event.messageID);
}