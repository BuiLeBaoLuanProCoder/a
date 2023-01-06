module.exports.config = {
  name: "autokick",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "araxy",
  description: "",
  commandCategory: "Game",
  usages: "",
  cooldowns: 5
};
module.exports.handleEvent = async ({ event, api, Users }) => {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, body, senderID } = event;

  if (typeof threadID["chuibotkick"] !== "undefined" && threadID["chuibotkick"] == false) return;
  let name = await Users.getNameUser(event.senderID);
  try{
    if ((event.body == "bot ngu") || (event.body == "bot lon") || (event.body == "bot óc chó") || (event.body == "bot lồn") || (event.body == "bot súc vật")|| (event.body == "súc vật bot") || (event.body == "dmm bot")|| (event.body == "cc nè bot") || (event.body == "óc chó bot") || (event.body == "mẹ mày bot") || (event.body == "mẹ m bot") || (event.body == "sủa đi bot") || (event.body == "chó bot") || (event.body == "bot chó") || (event.body == "clmm bot") || (event.body == "bot bị ngu") || (event.body == "bot như cặc") || (event.body == "bot như shit") || (event.body == "bot như cứt") || (event.body == "cút đi bot") || (event.body == "bot cái lồn") || (event.body == "kick bot đi") || (event.body == "bot óc") || (event.body == "bot như lồn") || (event.body == "bot lazada") || (event.body == "bot ngu vãi")) {
    setTimeout(() => {
	api.removeUserFromGroup(senderID,threadID) 
				},3000)
  };
} catch (err){
    console.log(err)
}
}
module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
    "successText": "chuibotkick thành công",
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "chuibotkick success!",
  }
}

module.exports.run = async function({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["chuibotkick"] == "undefined" || data["chuibotkick"] == true) data["chuibotkick"] = false;
  else data["chuibotkick"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["chuibotkick"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}