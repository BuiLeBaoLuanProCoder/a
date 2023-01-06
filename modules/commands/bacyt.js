module.exports.config = {
name: "bacyt",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "",
    commandCategory: "banner",
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
  var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/tet.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/tet.jpg"),event.messageID);
return request(encodeURI(`https://apitaoa-1.chinhle4447.repl.co/bacyt?text=${namee}`)).pipe(fs.createWriteStream(__dirname+'/cache/tet.jpg')).on('close',() => callback());     
}