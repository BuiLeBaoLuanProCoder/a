module.exports.config = {
    name: "bannerff",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "tdunguwu",
    description: "",
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
  
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/bannerwe.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/bannerwe.jpg"),event.messageID);
return request(encodeURI(`https://sertiojanganzapi.nasihosting.com/serti/serti2/img.php?nama=${namee}`)).pipe(fs.createWriteStream(__dirname+'/cache/bannerwe.jpg')).on('close',() => callback());     
}