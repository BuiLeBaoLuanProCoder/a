module.exports.config = {
  name: "bannerlod",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Hanaku UwuU",
  description: "banner",
  commandCategory: "banner",
  usages: "",
  cooldowns: 5
};
module.exports.run = async function({ api, args, event, permssion }) {
  const fs =  require('fs-extra')
   if (!fs.existsSync(__dirname +
    `/tad/GothicA1-Light.ttf`)) {
    let getfont = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/GothicA1-Light.ttf`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + `/tad/GothicA1-Light.ttf`, Buffer.from(getfont, "utf-8"));
  };
  if (!fs.existsSync(__dirname + `/tad/UTMGodsWord.ttf`)) {
    let getfont2 = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/UTM%20Gods%20Word.ttf`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + `/tad/UTMGodsWord.ttf`, Buffer.from(getfont2, "utf-8"));
  };
   return api.sendMessage("Reply Tin Nhắn Này Để Chọn Char", event.threadID, (err, info) => {
    return global.client.handleReply.push({
      step: 1,
      name: "bannerlod",
      author: event.senderID,
      messageID: info.messageID
    });
  }, event.messageID);
}
module.exports.handleReply = async function({ api, event, args, handleReply, client, __GLOBAL, Threads, Users, Currencies }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const request = require("request");
  if (event.senderID != handleReply.author) return api.sendMessage('CúC', event.threaID);
  const { loadImage, createCanvas } = require("canvas");
  const path = require('path');
  const Canvas = require('canvas');
  let pathImg = __dirname + `/tad/avatar_1.png`;
  let pathAva = __dirname + `/tad/avatar_2.png`;
  let pathLine = __dirname + `/tad/avatar_3.png`;
  const lengthchar = (await axios.get('https://run.mocky.io/v3/c3d88a1a-56e6-4d7b-88a9-e936a4eb1e0c')).data
    if(handleReply.step == 1){
      api.unsendMessage(handleReply.messageID);
    if(isNaN(event.body)) return api.sendMessage('Bạn phải nhập một con số', event.threadID, event.messageID)   
    return api.sendMessage(`Bạn chọn char mang ID ${event.body}, hãy reply tin nhắn này để nhập tên chính`, event.threadID, (err, info) => {
    return global.client.handleReply.push({
      step: 2,
      name: "bannerlod",
      author: event.senderID,
      idchart: event.body,
      messageID: info.messageID
    });
  }, event.messageID);
  }
  else if(handleReply.step == 2){
api.unsendMessage(handleReply.messageID);
    return api.sendMessage(`Bạn chọn tên chính ${event.body}, hãy reply tin nhắn này để nhập tên phụ`, event.threadID, (err, info) => {
    return global.client.handleReply.push({
      step: 3,
      name: "bannerlod",
      author: event.senderID,
      idchart: handleReply.idchart,
      tenchinh: event.body,
      messageID: info.messageID
    });
  }, event.messageID);
  }
  else if(handleReply.step == 3){
    api.unsendMessage(handleReply.messageID);
    return api.sendMessage(`Bạn chọn tên phụ ${event.body}, hãy reply tin nhắn này để nhập tên github`, event.threadID, (err, info) => {
    return global.client.handleReply.push({
      step: 4,
      name: "bannerlod",
      author: event.senderID,
      idchart: handleReply.idchart,
      tenchinh: handleReply.tenchinh,
      tenphu: event.body,
      messageID: info.messageID
    });
  }, event.messageID);
  }
    else if(handleReply.step == 4){
  api.unsendMessage(handleReply.messageID);
return api.sendMessage(`Bạn chọn tên github ${event.body}, hãy reply tin nhắn này để nhập tên facebook`, event.threadID, (err, info) => {
    return global.client.handleReply.push({
      step: 5,
      name: "bannerlod",
      author: event.senderID,
      idchart: handleReply.idchart,
      tenchinh: handleReply.tenchinh,
      tenphu: handleReply.tenphu,
      github: event.body,
      messageID: info.messageID
    });
  }, event.messageID);
  }
      else if(handleReply.step == 5){
        api.unsendMessage(handleReply.messageID);
return api.sendMessage(`Bạn chọn tên facebook ${event.body}, hãy reply tin nhắn này để nhập màu bạn muốn`, event.threadID, (err, info) => {
    return global.client.handleReply.push({
      step: 6,
      name: "bannerlod",
      author: event.senderID,
      idchart: handleReply.idchart,
      tenchinh: handleReply.tenchinh,
      tenphu: handleReply.tenphu,
      github: handleReply.github,
      facebook: event.body,
      messageID: info.messageID
    });
  }, event.messageID);
  } else if(handleReply.step == 6){
        //api.unsendMessage(handleReply.messageID);
    const tenchinh = handleReply.tenchinh
    const idchart = handleReply.idchart
    const subname = handleReply.tenphu
    const github = handleReply.github
    const facebook = handleReply.facebook
    const color = event.body
    if(color == "no" || color == "No"){
      var color_ = lengthchar[idchart].colorBg
    } else {
      var color_ = color
    }
    let background = (await axios.get(encodeURI(`https://imgur.com/vx7X6Gd.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    let ava = (await axios.get(encodeURI(`${lengthchar[idchart].imgAnime}`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathAva, Buffer.from(ava, "utf-8"));
    let l1 = await loadImage(pathAva);
    let a = await loadImage(pathImg);
    let canvas = createCanvas(a.width, a.height);
    var ctx = canvas.getContext("2d");
    ctx.drawImage(a, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(l1, 850, -200, 1300, 1300);
    ctx.save();
     Canvas.registerFont(__dirname + `/tad/UTMGodsWord.ttf`, {
      family: "UTM Gods Word"
    });
    ctx.textAlign = "start";
    ctx.font = "125px UTM Gods Word";
    var jack = ctx.createLinearGradient(0, 0, 0, 1000);
    jack.addColorStop(0, color_);
    jack.addColorStop(0.55, color_);
    jack.addColorStop(0.65, "rgba(255, 255, 255, 0)");
    var jack = ctx.createLinearGradient(0, 0, 0, 1000);
    jack.addColorStop(0, color_ );
    jack.addColorStop(0.55, color_);
    jack.addColorStop(0.65, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = jack
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 15;
    ctx.fillText(tenchinh, 100, 310);
    ctx.restore();
    ctx.save();
     Canvas.registerFont(__dirname + `/tad/GothicA1-Light.ttf`, {
      family: "time-1"
    });
     ctx.textAlign = "start";
    ctx.font = "80px time-1";
    ctx.fillText(subname, 100, 500);
    Canvas.registerFont(__dirname + `/tad/GothicA1-Light.ttf`, {
      family: "time"
    });
    ctx.textAlign = "start";
    ctx.font = "70px time";
    ctx.fillText("@" + github, 255, 710)
    ctx.fillText("@" + facebook , 255, 875)
    ctx.restore();
    ctx.save
    ctx.beginPath();
    const imageBuffer = canvas.toBuffer();
   fs.writeFileSync(pathImg, imageBuffer);
  return api.sendMessage({
    body: `ảnh của bạn đây`,
    attachment: fs.createReadStream(pathImg)
  },
    event.threadID,
    () => fs.unlinkSync(pathImg),
    fs.unlinkSync(pathAva),
    event.messageID
  );
  }
  }