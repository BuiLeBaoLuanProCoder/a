module.exports.config = {
    name: "check", //đổi credit đi lmeo
    version: "1.0.0",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "",
    commandCategory: "group",
    usages: "check",
    cooldowns: 3
    
};
module.exports.run = async({api,event,args}) => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    var tile = Math.floor(Math.random()*101);
    var a = Math.floor(Math.random()*101);
    var b = Math.floor(Math.random()*101);
    var c = Math.floor(Math.random()*101);
    var d = Math.floor(Math.random()*101);
    var e = Math.floor(Math.random()*101);
    var f = Math.floor(Math.random()*150);
    if(!args[0]){
      if(event.type == "message_reply") { uid = event.messageReply.senderID }
      else uid = event.senderID;
      var info = await api.getUserInfo(uid);
    var nameSender = info[uid].name;
    
        var callback = () => api.sendMessage({body:`🌻Tên: ${nameSender}\n🌻UID: ${uid}\n🌻IQ: ${a}\n🌻Độ Đẹp: ${b}\n🌻Độ Giàu: ${c}\n🌻ai bíc: ${d}\n🌻Chịu${e}\n🌻Thọ: ${f}`,
        attachment: fs.createReadStream(__dirname + "/cache/i4.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/i4.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/i4.png')).on('close',
        () => callback());
    }
    else {
      if (args.join().indexOf('@') !== -1){
    var mentions = Object.keys(event.mentions)
    var info = await api.getUserInfo(mentions);
    var namemention = info[mentions].name;
        var callback = () => api.sendMessage({body:`🌻Tên: ${namemention}\n🌻IQ: ${a}\n🌻Độ Đẹp: ${b}\n🌻Độ Giàu: ${c}\n🌻ai bíc: ${d}\n🌻Chịu${e}\n🌻Thọ: ${f}`,
        attachment: fs.createReadStream(__dirname + "/cache/i4.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/i4.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/i4.png')).on('close',
        () => callback());
    }
  }
  }