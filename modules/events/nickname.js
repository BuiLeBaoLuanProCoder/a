module.exports.config = {
	name: "nickname",
	eventType: ["log:user-nickname"],
	version: "1.0.3",
	credits: "tdunguwu",
	description: ""
};

module.exports.run = async function({ api, Threads, event, Users }) {
  const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, '../commands', 'cache', 'nickname.json');
    const { nickname } = require(path);  
  const { logMessageData, threadID, author, messageID } = event;
  if (nickname.hasOwnProperty(threadID) && nickname[threadID] == false) return
  const idbot = await api.getCurrentUserID();
  const { ADMINBOT } = global.config;
  const { i } = await Threads.getData(threadID, logMessageData.participant_id);
  try{
  if(author != idbot && !ADMINBOT.includes(author) && logMessageData.nickname != nickname){
    var k = logMessageData.participant_id
    api.changeNickname(i, threadID, k);
    var name = (await Users.getData(k)).name
    return api.sendMessage('Box Đang Bật Chế Độ Cấm Đổi Biệt Danh Nên Sẽ Đưa Biệt Danh Về Như Cũ')
  }
} catch(e){
    console.log(e);
    return api.sendMessage("đã xảy ra lỗi không mong muốn", threadID)
}
}