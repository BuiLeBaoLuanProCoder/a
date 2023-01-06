module.exports.config = {
name: "demo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "",
    commandCategory: "Other",
    usages: "",
    cooldowns: 5
};
module.exports.run = async function ({ api, args, event, Threads, Users }) {
  const so_1 = args[0];
  const so_2 = args[1];
  if(so_1 == so_2) {
    return api.sendMessage("số 1 bằng số 2", event.threadID, event.senderID)
  } else {
    return api.sendMessage("số 1 không bằng số 2", event.threadID, event.senderID)
  }
}