module.exports.config = {
	name: "b64dc",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "",
	commandCategory: "Phương tiện",
	usages: "b64dc",
	cooldowns: 5,
	dependencies: {
		"axios":""}
	
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let ecod = args.join(" ");
const res = await axios.get(`https://some-random-api.ml/base64?decode=${ecod}`);
var base64 = res.data.text;
return api.sendMessage(`${base64}`, event.threadID, event.messageID)
}