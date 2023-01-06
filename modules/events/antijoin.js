module.exports.config = {
	name: "antijoin",
	eventType: ["log:subscribe"],
	version: "1.0.3",
	credits: "tdunguwu",
	description: ""
};

module.exports.run = async function({ api, event, Users }) {
const { threadID } = event;
var memJoin = event.logMessageData.addedParticipants.map(info => info.userFbId)
	for (let idUser of memJoin) {
		const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
	const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, '../commands', 'cache', 'antijoin.json');
    const { antijoin } = require(path);
		var dataJson = JSON.parse(readFileSync(path, "utf-8"));

		await new Promise(resolve => setTimeout(resolve, 1000));
	if (antijoin.hasOwnProperty(threadID) && antijoin[threadID] == true) {
try {
  
                await api.removeUserFromGroup(idUser, threadID);
                return api.sendMessage(`DONE`);
            }
            catch (e) {
              
                return api.sendMessage(`Đã Xảy Ra Lỗi Vui Lòng Cho Bot Quyền QTV`, threadID);
            }
}
  }
  }