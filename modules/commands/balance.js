module.exports.config = {
	name: "balance",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Mirai Team",//mod by ARAXY XD
	description: "Kiểm tra số tiền của bản thân hoặc người được tag",
	commandCategory: "economy",
	usages: "[Tag]",
	cooldowns: 5
};

module.exports.run = async function({ api, event, args, Currencies, Users }) {
	const { threadID, messageID, senderID, mentions } = event;
  const fs = require('fs');
const axios = require('axios')
 if(!fs.existsSync(__dirname+'/cache/SplineSans-Medium.ttf')) { 
      let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=102B8O3_0vTn_zla13wzSzMa-vdTZOCmp&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/SplineSans-Medium.ttf", Buffer.from(getfont, "utf-8"));
    };
    if(!fs.existsSync(__dirname+'/cache/SplineSans.ttf')) { 
      let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1--V7DANKLsUx57zg8nLD4b5aiPfHcmwD&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/SplineSans.ttf", Buffer.from(getfont2, "utf-8"));
    };
if (event.type == "message_reply") {
    var uid = event.messageReply.senderID;
    var name = (await Users.getData(uid)).name;
    var money = (await Currencies.getData(uid)).money;
    if (!money) money = 0;
var argss = `${money}`;
}
else if (Object.keys(event.mentions).length == 1) {
		var mention = Object.keys(mentions).keys
		var uid = mention
		var money = (await Currencies.getData(mention)).money;
		if (!money) money = 0;
	  var argss = `${money}`;
    var name = (await Users.getData(mention)).name
	} else {
   var name = (await Users.getData(senderID)).name;
   var uid = senderID
    var money = (await Currencies.getData(senderID)).money;
    if (!money) money = 0;
var argss = `${money}`;
  }
	 const { loadImage, createCanvas } = require("canvas");
    let path = __dirname + "/cache/atmaraxy.png";
    let bg = (await axios.get(`https://imgur.com/wrS74gQ.jpg`, {responseType: "arraybuffer" })).data;
    fs.writeFileSync(path, Buffer.from(bg, "utf-8"));
           let bgBase = await loadImage(path);
    let canvas = createCanvas(bgBase.width, bgBase.height);
    let ctx = canvas.getContext("2d");
    const Canvas = global.nodemodule["canvas"];
    ctx.drawImage(bgBase, 0, 0, canvas.width, canvas.height);
    Canvas.registerFont(__dirname+`/cache/SplineSans-Medium.ttf`, {
        family: "SplineSans-Medium"
    });
    Canvas.registerFont(__dirname+`/cache/SplineSans.ttf`, {
        family: "SplineSans"
    });
    ctx.font = "50px SplineSans-Medium";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText('' + argss.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ', 530, 359);
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(path, imageBuffer);
       var msg =  {body: `sucess số tiền của ${name} like tin nhắn này nếu bạn muốn all in số tiền vào trò may rủi ?`, attachment: fs.createReadStream(path)
    }
return api.sendMessage(msg,  threadID, (error, info) => {
  global.client.handleReaction.push({
      name: this.config.name, 
      messageID: info.messageID,
      author: uid,
    })
    fs.unlinkSync(path),
        messageID
})
}
module.exports.handleReaction = async function({ event, api, handleReaction, Currencies}){
  if (event.userID != handleReaction.author) return;
  //if (event.reaction != "👍") return; 
  const { senderID } = event 
  var money = (await Currencies.getData(handleReaction.author)).money;
  if(money < 500){
    return api.sendMessage('Bạn Không Đủ Tiền Để Chơi', event.threadID)
  }
  var sothu1 = Math.floor(Math.random() * 1000) + 1000
  var sothu2 = Math.floor(Math.random() * 1000) + 1000
  if (sothu1 == sothu2){
  await Currencies.increaseMoney(handleReaction.author, parseInt(money)) 
    return api.sendMessage(`số may mắn của bạn là ${sothu1}\nSố được đưa ra là ${sothu2}\n bạn nhận được số tiền là ${money + money}`,event.threadID)
  } else {
    await Currencies.decreaseMoney(handleReaction.author, parseInt(money)) 
    return api.sendMessage(`số may mắn của bạn là ${sothu1}\nSố được đưa ra là ${sothu2}\n bạn mất trắng số tiền`,event.threadID)
  }
}