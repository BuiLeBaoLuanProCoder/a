module.exports.config = {
name: "coverfb",
version: "1.0.0",
hasPermssion: 0,
credits: "chinl",
description: "Tạo ảnh bìa phong cách dịch vụ facebook",
commandCategory: "photoshop",
usages: "Tạo ảnh bìa phong cách dịch vụ facebook",
cooldowns: 0,
dependencies: {
        "fs-extra": "",
        "request": "",
        "axios": "",
    }
};
module.exports.run = async function ({ api, args, event, permssion }) {
    const request = require('request');
  const fs = require("fs-extra")
  const axios = require("axios")
  const { threadID, messageID, senderID, body } = event;
  if(!args[0]) return api.sendMessage('Vui lòng nhập tên chính!!!', threadID, messageID)
  else return api.sendMessage(`🔍 Bạn đã chọn tên chính là: ${args.join(" ").toUpperCase()}\n\n(Reply tin nhắn này và chọn tên phụ của bạn)`,event.threadID, (err, info) => {
     return global.client.handleReply.push({
        type: "tenphu",
        name: this.config.name,
        author: senderID,
        tenchinh: args.join(" ").toUpperCase(),
        messageID: info.messageID
      });
  },event.messageID);
}
module.exports.handleReply = async function ({ event, api, handleReply }) {
  module.exports.circle = async (image) => {
    const jimp = require("jimp")
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
  }
  if (handleReply.author != event.senderID) return;
  const { threadID, messageID, senderID, body } = event;
  const { loadImage, createCanvas } = require("canvas");
  const request = require('request');
  const fs = require("fs-extra")
  const axios = require("axios")
  let pathImg = __dirname + `/cache/${senderID+20}.png`;
  let pathAva = __dirname + `/cache/${senderID+30}.png`;
  let pathLine = __dirname + `/cache/${senderID+40}.png`;
  const path = require("path")
  const Canvas = require("canvas")
  const __root = path.resolve(__dirname, "cache");
  var tenchinh = handleReply.tenchinh;
 
  switch (handleReply.type) {
    case "tenphu": {
      var tenphu = handleReply.tenphu;
      var tenchinh = handleReply.tenchinh;
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`🔍 Bạn đã chọn tên phụ là ${event.body.toUpperCase()}\n\n(Reply tin nhắn này nhập vào số điện thoại của bạn)`,event.threadID, (err, info) => {
        return global.client.handleReply.push({
          type: "sdt",
          name: this.config.name,
          author: senderID,
          tenphu: event.body,
          tenchinh: tenchinh,
          messageID: info.messageID
        });
      },messageID)
    }
    case "sdt": {
      var sdt = handleReply.sdt;
      var tenchinh = handleReply.tenchinh;
      var tenphu = handleReply.tenphu;
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`🔍 Bạn đã chọn SDT là : ${event.body.toUpperCase()}\n\(Reply tin nhắn này để nhập email của bạn)`,event.threadID, (err, info) => {
        return global.client.handleReply.push({
          type: "email",
          name: this.config.name,
          author: senderID,
          sdt: event.body,
          tenchinh: tenchinh,
          tenphu: tenphu,
          messageID: info.messageID
        });
      },messageID) 
    }
    case "email": {
      var sdt = handleReply.sdt;
      var tenchinh = handleReply.tenchinh;
      var tenphu = handleReply.tenphu;
      var email = handleReply.email;
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`🔍 Bạn đã chọn email là : ${event.body.toUpperCase()}\n\(Reply tin nhắn này để nhập địa chỉ của bạn)`,event.threadID, (err, info) => {
        return global.client.handleReply.push({
          type: "create",
          name: this.config.name,
          author: senderID,
          sdt: sdt,
          tenchinh: tenchinh,
          tenphu: tenphu,
          email: event.body,
          messageID: info.messageID
        });
      },messageID) 
    }
    case "create": {
      var address = event.body.toUpperCase()
      var name = handleReply.tenchinh.toUpperCase()
      var email = handleReply.email.toUpperCase()
      var subname = handleReply.tenphu.toUpperCase()
      var phoneNumber = handleReply.sdt.toUpperCase()
      api.unsendMessage(handleReply.messageID);
      api.sendMessage(`⏳ Đang khởi tạo chương trình tạo ảnh!`,threadID,messageID);
      //=================CONFIG IMG=============//
      let avtAnime = (
        await axios.get(encodeURI(
          `https://graph.facebook.com/${senderID}/picture?height=1500&width=1500&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`),
          { responseType: "arraybuffer" }
        )
      ).data;
      let background = (
        await axios.get(encodeURI(`https://i.postimg.cc/J0fmPtbL/taoanhdep-cover-abstract.jpg`), {
          responseType: "arraybuffer",
        })
      ).data;
      let hieuung = (
        await axios.get(encodeURI(`https://i.postimg.cc/J0fmPtbL/taoanhdep-cover-abstract.jpg`), {
          responseType: "arraybuffer",
        })
      ).data;
      fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
      fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
      fs.writeFileSync(pathLine, Buffer.from(hieuung, "utf-8"));
      var avatar = await this.circle(pathAva);
      //=================DOWNLOAD FONTS=============//
      if(!fs.existsSync(__dirname+`/cache/UTMAvoBold.ttf`)) { 
          let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1DuI-ou9OGEkII7n8odx-A7NIcYz0Xk9o&export=download`, { responseType: "arraybuffer" })).data;
           fs.writeFileSync(__dirname+`/cache/UTMAvoBold.ttf`, Buffer.from(getfont2, "utf-8"));
        };
      //=================DRAW BANNER=============//
      let baseImage = await loadImage(pathImg);
      let baseAva = await loadImage(avatar);
      let baseLine = await loadImage(pathLine);
      let canvas = createCanvas(baseImage.width, baseImage.height);
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
      Canvas.registerFont(__dirname+`/cache/UTMAvoBold.ttf`, { family: "UTMAvoBold" });
      ctx.strokeStyle = "rgba(255,255,255, 0.2)";
      ctx.lineWidth = 3;
      ctx.font = "100px UTMAvoBold";
      ctx.strokeText(name, 30, 100);
      ctx.strokeText(name, 130, 200);
      ctx.textAlign = "right";
      ctx.strokeText(name, canvas.width - 30, canvas.height - 30);
      ctx.strokeText(name, canvas.width - 130, canvas.height - 130);
      ctx.fillStyle = `#ffffff`
      ctx.font = "55px UTMAvoBold";
      ctx.fillText(name, 680, 270);
      ctx.font = "40px UTMAvoBold";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "right";
      ctx.fillText(subname, 680, 320);
      ctx.font = "23px UTM Avo";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "start";
      ctx.fillText(phoneNumber, 1350, 252);
      ctx.fillText(email, 1350, 332);
      ctx.fillText(address, 1350, 410);
      ctx.globalCompositeOperation = "destination-out";
      ctx.drawImage(baseLine, 0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = `#ffffff`
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(baseAva, 824, 180, 285, 285);
      const imageBuffer = canvas.toBuffer();
      fs.writeFileSync(pathImg, imageBuffer);
      return api.sendMessage(
        { attachment: fs.createReadStream(pathImg) },
        threadID,messageID
      );
    }
  }
}