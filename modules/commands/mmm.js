module.exports.config = {
    name: "mmm",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "tdunguwu",
    description: "tao banner tren api lawerpr0ject",
    commandCategory: "banner",
    usages: "bannerlw",
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
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/bannerwe.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/bannerwe.gif"),event.messageID);
	 return request(encodeURI(`https://kocakz.herokuapp.com/api/flamingtext/memories?text=${namee}`)).pipe(fs.createWriteStream(__dirname+'/cache/bannerwe.gif')).on('close',() => callback());     
}