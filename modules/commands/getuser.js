module.exports.config = {
    name: "getuser",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Xem thông tin của người dùng facebook",
    commandCategory: "group",
    usages: "[reply/tag/id]",
    cooldowns: 3
    
};
module.exports.run = async({api,event,args}) => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const axios = global.nodemodule['axios'];  

    if(!args[0]){
    if(event.type == "message_reply") { uid = event.messageReply.senderID }
    else uid = event.senderID;`)).data;  
    var gender = res.gender == 'male' ? "Nam" : res.gender == 'female' ? "Nữ" : "Không công khai";
    var birthday = res.sinhnhat ? `${res.sinhnhat}` : "Không công khai";
    var love = res.relationship ? `${res.relationship}` : "Chưa kết hôn"
    var location = res.location ? `${res.location}` : "Không công khai"
    var url = res.url_profile ? `${res.url_profile}` : "nịt"
    var callback = () => api.sendMessage({body:`🌻Tên: ${res.name}\n🌻UID: ${uid}\n🌻Follow: ${res.follow}\n🌻Giới tính: ${gender}\n🌻Birthday: ${birthday}\n🌻Kết hôn: ${love}\n🌻Location: ${location}\n🌻Url:${res.url_profile}`,
        attachment: fs.createReadStream(__dirname + "/cache/i4.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/i4.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/i4.png')).on('close',
        () => callback());
   }
    else {
    if (args.join().indexOf('@') !== -1){
    var mentions = Object.keys(event.mentions)
    const res = await axios.get(`https://apicailoznheuwu.araxy-ox-qwqbqiws.repl.co/info?uid=${mentions}&key=araxy`);  
   var gender = res.gender == 'male' ? "Nam" : res.gender == 'female' ? "Nữ" : "Không công khai";
    var birthday = res.sinhnhat ? `${res.sinhnhat}` : "Không công khai";
    var love = res.relationship ? `${res.relationship}` : "Chưa kết hôn"
    var location = res.location ? `${res.location}` : "Không công khai"
    var url = res.url_profile ? `${res.url_profile}` : "nịt"
    var callback = () => api.sendMessage({body:`🌻Tên: ${res.name}\n🌻UID: ${mentions}\n🌻Follow: ${res.follow}\n🌻Giới tính: ${gender}\n🌻Birthday: ${birthday}\n🌻Kết hôn: ${love}\n🌻Location: ${location}\n🌻Url:${res.url_profile}`,
        attachment: fs.createReadStream(__dirname + "/cache/i4.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/i4.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/i4.png')).on('close',
        () => callback());
    }
    else {
    const res = await axios.get(`https://apicailoznheuwu.araxy-ox-qwqbqiws.repl.co/info?uid=${args[0]}&key=araxy}`);  
     var gender = res.gender == 'male' ? "Nam" : res.gender == 'female' ? "Nữ" : "Không công khai";
    var birthday = res.sinhnhat ? `${res.sinhnhat}` : "Không công khai";
    var love = res.relationship ? `${res.relationship}` : "Chưa kết hôn"
    var location = res.location ? `${res.location}` : "Không công khai"
    var url = res.url_profile ? `${res.url_profile}` : "nịt"
    var callback = () => api.sendMessage({body:`🌻Tên: ${res.name}\n🌻UID: ${args[0]}\n🌻Follow: ${res.follow}\n🌻Giới tính: ${gender}\n🌻Birthday: ${birthday}\n🌻Kết hôn: ${love}\n🌻Location: ${location}\n🌻Url:${res.url_profile}`,
        attachment: fs.createReadStream(__dirname + "/cache/i4.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/i4.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${args[0]}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/i4.png')).on('close',
        () => callback());
    }
  }
}