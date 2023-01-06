module.exports.config = {
	name: "emojify",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "tao ra text hay nek",
	commandCategory: "Other",
	usages: "",
	cooldowns: 5,
	dependencies: {"axios" : ""}

	
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let tx = args.join(" ");
const res = await axios.get(`https://api.leoapi.xyz/text/emojify?text=${tx}`);
var text = res.data.emojified;

return api.sendMessage(`${text}`, event.threadID, event.messageID)
}