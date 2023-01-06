module.exports.config = {
	name: "scp",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "",
	commandCategory: "Phương tiện",
	usages: "",
	cooldowns: 5,
	dependencies: {
		"axios":""}
	
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
try {
let scp = args.join(" ");
if (!scp) return api.sendMessage("địt mẹ chưa nhập nội dung để coi kìa ", event.threadID, event.messageID);
const res = await axios.get(`https://le31.glitch.me/other/scp?q=${scp}`);
var low = res.data.data;
return api.sendMessage(`${low}`, event.threadID, event.messageID)}
catch (err) {
        console.log(err)
        return api.sendMessage("Đã xảy ra lỗi", event.threadID);
    }
}