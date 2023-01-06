module.exports.config = {
    name: "fbcover",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "HanakuneOwO",
    description: "Tạo ra một avt trên taoanhdep.",
    commandCategory: "image",
    cooldowns: 0
};
 
module.exports.run = async function ({ api, args, event, permssion }) {
    const request = require('request');
  const fs = require("fs-extra")
  const axios = require("axios")
  const { threadID, messageID, senderID, body } = event;
	 else{
        if(args[0] == "list"){
      const list = await axios.get("https://www.phamvandienofficial.xyz/taoanhdep/list");
            var page = 1;
            page = parseInt(args[1]) || 1;
            page < -1 ? page = 1 : "";
            var limit = 15;
            var count = list.data.listAnime.length;
            var numPage = Math.ceil(count / limit);
            var msg = [];
            for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
                if (i >= count) break;
                var nv = list.data.listAnime[i].name;
                msg += `${i+0}. ${nv}\n`
            }
            msg += `Hiện tại có ${count} nhân vật\nSố trang (${page}/${numPage})\nDùng ${global.config.PREFIX}fbcover list <số trang>`;
            return api.sendMessage(msg, event.threadID)
    }
    else {
    return api.sendMessage(`Vui lòng reply tin nhắn này để nhập ID nhân vật`, event.threadID, (err, info) => {
        return global.client.handleReply.push({
            type: "characters",
            name: this.config.name,
            author: senderID,
            messageID: info.messageID
        });
    }, event.messageID);
}
}} 
module.exports.handleReply = async function({ api, event, args, handleReply, client, __GLOBAL, Threads, Users, Currencies }) {
   const fs = require("fs-extra");
  const axios = require("axios");
     const { loadImage, createCanvas } = require("canvas");
   let pathImg = __dirname + `/cache/fbcover22.png`;
    let pathAva = __dirname + `/cache/fbcover222.png`;
    let pathLine = __dirname + `/cache/fbcover2222.png`;
   const Canvas = require("canvas")
    const lengthchar = (await axios.get('https://run.mocky.io/v3/c3d88a1a-56e6-4d7b-88a9-e936a4eb1e0c')).data

  
    const request = require("request");
    if (handleReply.author != event.senderID) return;
    const {
        threadID,
        messageID,
        senderID
    } = event;

    switch (handleReply.type) {
          // fix by DuyVuong
        case "characters": { 
        	api.unsendMessage(handleReply.messageID);
        	return api.sendMessage(`🔍Bạn đã chọn ID nhân vật là ${event.body}\n(Reply tin nhắn này nhập vào tên chính của bạn)`,threadID , function (err, info) { 
        	  return global.client.handleReply.push({ 
        	  	type: 'subname',
        	  	name: 'fbcover',
        	  	author: senderID,
        	  	characters: event.body,
        	  	messageID: info.messageID
        	  })
        	}, messageID);
        }
        case "subname": { 
        	api.unsendMessage(handleReply.messageID);
        	return api.sendMessage(`🔍Bạn đã chọn tên chính là ${event.body}\n(Reply tin nhắn này nhập vào tên phụ của bạn)`,threadID , function (err, info) { 
        		return global.client.handleReply.push({ 
        			type: 'color',
        			name: 'fbcover',
        			author: senderID,
        			characters: handleReply.characters,
        			name_s: event.body,
        			messageID: info.messageID
        		})
        	}, messageID);
        }
        case "color": { 
        	api.unsendMessage(handleReply.messageID);
        	return api.sendMessage(`🔍Bạn đã chọn tên phụ là ${event.body}\nNhập màu nền của bạn (lưu ý: nhập tên tiếng anh của màu - Nếu không muốn nhập màu thì nhập "no")\n(Reply tin nhắn này)`,threadID , function (err, info) {
        		return global.client.handleReply.push({ 
        			type: 'create',
        			name: 'fbcover',
        			author: senderID,
        			characters: handleReply.characters,
        			subname: event.body,
        			name_s: handleReply.name_s,
        			messageID: info.messageID
        		})
        	}, messageID)
        }
        case "create": {
            var nhanvat = handleReply.characters;
            var name = handleReply.name_s;
            var color_ = event.body;
            var subname = handleReply.subname;
          let avtAnime = (
        await axios.get(encodeURI(
            `${lengthchar[nhanvat].imgAnime}`), { responseType: "arraybuffer" })
    ).data;
    let background = (
        await axios.get(encodeURI(`https://lh3.googleusercontent.com/-p0IHqcx8eWE/YXZN2izzTrI/AAAAAAAAym8/T-hqrJ2IFooUfHPeVTbiwu047RkmxGLzgCNcBGAsYHQ/s0/layer2.jpg`), {
            responseType: "arraybuffer",
        })
    ).data;
    let hieuung = (
        await axios.get(encodeURI(`https://lh3.googleusercontent.com/-F8w1tQRZ9s0/YXZZmKaylRI/AAAAAAAAynI/HBoYISaw-LE2z8QOE39OGwTUiFjHUH6xgCNcBGAsYHQ/s0/layer4.png`), {
            responseType: "arraybuffer",
        })
    ).data;
    fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    fs.writeFileSync(pathLine, Buffer.from(hieuung, "utf-8"));
    /*-----------------download----------------------*/
    if (!fs.existsSync(__dirname + `/cache/SVN-BigNoodleTitling.otf`)) {
        let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1uCXXgyepedb9xwlqMsMsvH48D6wwCmUn&export=download`, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/cache/SVN-BigNoodleTitling.otf`, Buffer.from(getfont2, "utf-8"));
    };
          if(color_ == "no" || color_ == "No"){
            var color = lengthchar[nhanvat].colorBg
          } else {
            var color = color_
          }
            api.unsendMessage(handleReply.messageID);
  let baseImage = await loadImage(pathImg);
    let baseAva = await loadImage(pathAva);
    let baseLine = await loadImage(pathLine);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");
    ctx.drawImage(baseImage, 0, 0, baseImage.width, baseImage.height);
    ctx.fillStyle = color;
    ctx.filter = "grayscale(1)"
    ctx.fillRect(0, 164, canvas.width, 633)
    ctx.drawImage(baseLine, 0, 0, baseImage.width, baseImage.height);
    ctx.globalAlpha = 0.5
    ctx.drawImage(baseAva, 0, -320, canvas.width, canvas.width)
    ctx.beginPath();
    ctx.globalAlpha = 1
    ctx.transform(1, 0, -0.2, 1, 0, 0)
    Canvas.registerFont(__dirname + `/cache/SVN-BigNoodleTitling.otf`, {
        family: "SVN-BigNoodleTitling"
    });
    ctx.font = `italic 200px SVN-BigNoodleTitling`;
    ctx.fillStyle = `#FFFFFF`
    ctx.textAlign = "end";
    ctx.globalAlpha = 0.8
    ctx.fillText(name.toUpperCase(), 1215, 535);
    Canvas.registerFont(__dirname + `/cache/SVN-BigNoodleTitling.otf`, {
        family: "SVN-BigNoodleTitling"
    });
    ctx.font = `60px SVN-BigNoodleTitling`;
    ctx.fillStyle = `#FFFFFF`
    ctx.textAlign = "end";
    ctx.globalAlpha = 1
    var l = ctx.measureText(subname).width;
    ctx.fillRect(1500, 164, 150, 633)
    ctx.fillRect(canvas.width - l - 540, 580, l + 50, 75)
    ctx.fillStyle = color
    ctx.fillText(subname.toUpperCase(), 1195, 640);
    ctx.fillStyle = `#FFFFFF`
    ctx.globalAlpha = 0.5
    ctx.fillRect(1300, 164, 150, 633)
    ctx.globalAlpha = 1
    ctx.transform(1, 0, 0.2, 1, 0, 0)
    ctx.filter = "grayscale(0)"
    ctx.drawImage(baseAva, 1010, 97, 700, 700)
    const imageBuffer = canvas.toBuffer();
           fs.writeFileSync(pathImg, imageBuffer);
      return api.sendMessage({
        body: `Mã số nhân vật: ${nhanvat}\nTên chính: ${name}\nTên phụ: ${subname}\nMàu nền: ${color}`,
        attachment: fs.createReadStream(pathImg)
      },
        event.threadID,
        () => fs.unlinkSync(pathImg),
        fs.unlinkSync(pathAva),
    fs.unlinkSync(pathLine),
        event.messageID
      );
        }
    }} 
					