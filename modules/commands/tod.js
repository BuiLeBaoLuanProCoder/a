module.exports.config = {
  name: "tod",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "tdunguwu",
  description: "",
  commandCategory: "game",
  usages: "",
  cooldowns: 2,
  dependencies: {"axios" : ""}
};
module.exports.run = async({api, event, args}) => {
	const axios = require('axios');
	if (args[0] == "dare" || args[0] == "thach" || args[0] == "thách") {
    const res = await axios.get(`https://le31.glitch.me/other/truthordare/dare/play`);
    return api.sendMessage(`dare : ${res.data.data}`, event.threadID, event.messageID)
}
if (args[0] == "truth" || args[0] == "that" || args[0] == "thật") {
    const res = await axios.get(`https://le31.glitch.me/other/truthordare/truth/play`);
    return api.sendMessage(`truth : ${res.data.data}`, event.threadID, event.messageID)
}
else if (args.join() == "") { 
	  return api.sendMessage(`sai định dạng mất tiu rùi :<\n [ LAWER PR0JECT ]`, event.threadID, event.messageID)} 
}
	