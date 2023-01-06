module.exports.config = {
	name: "draw",	
	version: "1.1.1", 
	hasPermssion: 0,
	credits: "Hanaku OwO",
	description: "concac", 
	commandCategory: "DVFB",
	usages: "",
	cooldowns: 5
};
module.exports.run = async ({ api, event, args }) => {
    const { threadID, messageID, senderID } = event;
    const axios = require('axios');
    var image = args.join(' ');
    if (!image && event.type == 'message_reply') {
        if (!event.messageReply.attachments || event.messageReply.attachments.length == 0)
            return api.sendMessage('Bạn cần phải reply một ảnh', threadID);
        if (event.messageReply.attachments.length > 1)
            return api.sendMessage('Vui lòng chỉ reply một ảnh!', threadID, messageID);
        if (event.messageReply.attachments[0].type != 'photo')
            return api.sendMessage('Vui lòng chỉ reply ảnh!', threadID, messageID);

        image = event.messageReply.attachments[0].url;
    } else if (!image) {
        image = `https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    } else {
        if (image.indexOf('http') == -1) {
            image = 'https://' + image;
        }
    }
  try{
     const t = (await axios.get(`https://api.zeks.me/api/draw-image?apikey=apivinz&image=` + (encodeURIComponent(image)), {
				responseType: "stream"
			})).data;
    var msg = ({
      body: "Ảnh của bạn đây",
       attachment: t
    })
    return api.sendMessage(msg, threadID, messageID)
  } catch(e){
    console.log(e);
    return api.sendMessage('Đã xãy ra lỗi -_-', threadID, messageID);
  }
}