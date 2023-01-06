module.exports.config = {
	name: "roblox",
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
let uid = args.join(" ");
if (!uid) return api.sendMessage("địt mẹ chưa nhập nội dung để coi kìa ", event.threadID, event.messageID);
const res = await axios.get(`https://users.roblox.com/v1/users/${uid}`);
 return api.sendMessage(`Tên : ${res.data.name}\nID : ${res.data.id}\nNgày tạo : ${res.data.created}\nBiệt danh : ${res.data.displayName}\nTiểu sử : ${res.data.description}`, event.threadID, event.messageID);
 } catch(err){ return api.sendMessage("Không tìm thấy uid người dùng!",event.threadID, event.messageID)
}
}