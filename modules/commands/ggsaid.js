module.exports.config = {
name: "ggsaid",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "",
    commandCategory: "image",
    usages: "",
    cooldowns: 5
};
module.exports.run = async function ({ api, args, event, Threads, Users }) {


        const request = global.nodemodule["request"];
        const fs = global.nodemodule["fs-extra"];
        let { senderID, threadID, messageID } = event;
       if(event.type == "message_reply") { uid = event.messageReply.senderID }
      else uid = event.senderID;
      var info = await api.getUserInfo(uid);
    var nameSender = info[uid].name;
  var callback = () => api.sendMessage({body:`Lmaô`,attachment: fs.createReadStream(__dirname + "/cache/ggsaid.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/ggsaid.jpg"),event.messageID);
return request(encodeURI(`https://database-test.bangprocode.repl.co/api/ggsaid?apikey=DVB&name=${nameSender}`)).pipe(fs.createWriteStream(__dirname+'/cache/ggsaid.jpg')).on('close',() => callback());     
}