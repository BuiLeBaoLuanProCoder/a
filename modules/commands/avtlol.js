module.exports.config = {
	name: "xamcac",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "",
	commandCategory: "system",
	usages: "",
	cooldowns: 5
};
module.exports.run = async function ({ api, args, event, Threads, Users }) {


        const request = global.nodemodule["request"];
        const fs = global.nodemodule["fs-extra"];
        let { senderID, threadID, messageID } = event;
        var name = (await Users.getData(senderID)).name
if (event.type == "message_reply") {
        name = event.messageReply.body}
  var namee = args.join(" ") || name;
  var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/tdung.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/tdung.jpg"),event.messageID);
return request(encodeURI(`https://api.lolhuman.xyz/api/ephoto1/avatarlolnew?apikey=7f6c1b087aad2d0c9147f6f5&text=${namee}`)).pipe(fs.createWriteStream(__dirname+'/cache/tdung.jpg')).on('close',() => callback());     
}