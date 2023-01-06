module.exports.config = {
	name: "dbstruck",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "tao ra text hay nek",
	commandCategory: "Other",
	usages: "doublestruck",
	cooldowns: 5,
	dependencies: {"axios" : ""}

	
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let pin = args.join(" ");
if (!pin)
    return api.sendMessage("[Text]", event.threadID, event.messageID);
const res = await axios.get(`https://api.popcat.xyz/doublestruck?text=${pin}`);
var text = res.data.text;

return api.sendMessage(`${text}`, event.threadID, event.messageID)
}