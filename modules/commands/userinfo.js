module.exports.config = {
    name: "userinfo",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "",
    commandCategory: "image",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "request": "",
        "axios": ""
    }, 
	envConfig: {
        APIKEY: "tdunguwu"
	}  
};
 
module.exports.run = async function ({ api, args, event, permssion }) {
    const request = require('request');
  const fs = require("fs-extra")
  const axios = require("axios")
  const { threadID, messageID, senderID, body } = event;
	 const { APIKEY } = global.configModule.fbcover;
	const res = await axios.get(`https://randomlinkapi-1.wanttoluv.repl.co/getLink1`); 
	let key = res.data.data;
 if (`tdungdeptraisieucapvippro` != `${key}`) { console.log('\x1b[33m[ WARN ]\x1b[37m » có key chưa nhóc con đjt mẹ mày luôn đấy con chó:))');        return api.sendMessage('[ WARN ] Phát hiện người điều hành bot ' + global.config.BOTNAME + ' leak modules "' + this.config.name + '"', threadID, messageID);      }   
	else if (this.config.credits != 'tdunguwu') {
        console.log('\x1b[33m[ WARN ]\x1b[37m » Đổi credits con cặc đjt mẹ mày luôn đấy con chó:))');
        return api.sendMessage('[ WARN ] Phát hiện người điều hành bot ' + global.config.BOTNAME + ' đổi credits modules "' + this.config.name + '"', threadID, messageID);
      } 
	 else {
    return api.sendMessage(`Vui lòng reply tin nhắn này để nhập tên của bạn`, event.threadID, (err, info) => {
        return global.client.handleReply.push({
            type: "vanity",
            name: this.config.name,
            author: senderID,
            messageID: info.messageID
        });
    }, event.messageID);
}
} 
module.exports.handleReply = async function({ api, event, args, handleReply, client, __GLOBAL, Threads, Users, Currencies }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const request = require("request");
    
    var info = await api.getUserInfo(event.senderID);
    var nameSender = info[event.senderID].name;
    var arraytag = [];
        arraytag.push({id: event.senderID, tag: nameSender});
        var sex = await info[event.senderID].gender;
    var gender = sex == 2 ? "Nam" : sex == 1 ? "Nữ" : "Gay";
    if (handleReply.author != event.senderID) return;
    const {
        threadID,
        messageID,
        senderID
    } = event;

    switch (handleReply.type) {
          
        case "vanity": { 
        	api.unsendMessage(handleReply.messageID);
        	return api.sendMessage(`🔍Bạn đã chọn tên là ${event.body}\n(Reply tin nhắn này nhập vào địa chỉ)`,threadID , function (err, info) { 
        	  return global.client.handleReply.push({ 
        	  	type: 'create',
        	  	name: 'userinfo',
        	  	author: senderID,
        	  	vanity: event.body,
        	  	messageID: info.messageID
        	  })
        	}, messageID);
        }
        case "create": {
            var vanity = handleReply.vanity;
            var location = event.body;
            api.unsendMessage(handleReply.messageID);
            api.sendMessage(`⏳ Đang khởi tạo chương trình tạo ảnh!`,threadID, (err, info) => {
            setTimeout(() => {
            	api.unsendMessage(info.messageID);
            	var callback = () => api.sendMessage({body:`Đây là ảnh của ${nameSender}\nname: ${vanity}\nlocation: ${location}\nvanity + id: ${senderID}`,mentions: arraytag,attachment: fs.createReadStream(__dirname + "/cache/fbcover.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/fbcover.png"),event.messageID);
                return request(encodeURI(`https://api-ttk.herokuapp.com/canvas/userinfo?location=${location}&name=${vanity}&gender=${gender}&vanity=${senderID}&uid=${senderID}`)).pipe(fs.createWriteStream(__dirname + '/cache/fbcover.png')).on('close', () => callback());
            }, 1000);
          }, messageID);
        }
    }} 
					