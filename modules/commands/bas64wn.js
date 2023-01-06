module.exports.config = {
	name: "b64en",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "",
	commandCategory: "Other",
	usages: "b64en",
	cooldowns: 5,
	dependencies: {
	"axios":""}
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let ecod = args.join(" ");
const res = await axios.get(`https://some-random-api.ml/base64?encode=${ecod}`);
var base64 = res.data.base64;
return api.sendMessage(`${base64}`, event.threadID, event.messageID)
}