module.exports.config = {
  name: "base64",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "tdunguwu",
  description: "",
  commandCategory: "Other",
  usages: "",
  cooldowns: 2,
  dependencies: {"axios" : ""}
};
module.exports.run = async({api, event, args}) => {
	const axios = require('axios');
var ag = args.join(" ").split(" - ");
var text1 = ag[0],
    text2 = ag[1];
    if (args[0] == "en" || args[0] == "encode" ) {
		const res = await axios.get(`https://some-random-api.ml/base64?encode=${text2}`);

return api.sendMessage(`${res.data.binary}`, event.threadID, event.messageID)
}
else if (args[0] == "de" || args[0] == "decode" ) {
  const res = await axios.get(`https://some-random-api.ml/base64?decode=${text2}`);

return api.sendMessage(`${res.data.text}`, event.threadID, event.messageID)
}
else if (args.join() == "") { 
	  return api.sendMessage(`Sai định dạng`, event.threadID, event.messageID)} 

}