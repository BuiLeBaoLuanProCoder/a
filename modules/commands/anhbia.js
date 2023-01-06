module.exports.config = {
  name: "anhbia",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Hanaku UwuU",
  description: "baner",
  commandCategory: "Image",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function({ api, args, event, permssion }) {
  const request = require('request');
  const fs = require("fs-extra")
  const axios = require("axios")
  const { threadID, messageID, senderID, body } = event;
  if (args[0] == "color") {
    var callback = () => api.sendMessage({ body: `của bạn đây UwU`, attachment: fs.createReadStream(__dirname + "/cache/taoanhdep.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/taoanhdep.png"), event.messageID);
    return request(encodeURI(`https://www.studytienganh.vn/upload/2017/08/40.jpg`)).pipe(fs.createWriteStream(__dirname + '/cache/taoanhdep.png')).on('close', () => callback());
  } else if (args[0] == "find") {
    const ress = await axios.get('https://dino-1.araxy.repl.co/data3')
    var nhanvat = args[1]
    const data2 = ress.data.anime[nhanvat - 1].imgAnime
    var imag = (await axios.get(`${data2}`, {
      responseType: "stream"
    })).data;
    var msg = {
      body: 'Ảnh Của Bạn Đây',
      attachment: imag
    }
    return api.sendMessage(msg, threadID, messageID)
  }
  else {
    return api.sendMessage(`Vui lòng reply tin nhắn này để nhập ID nhân vật [ ARAXY ]`, event.threadID, (err, info) => {
      return global.client.handleReply.push({
        type: "characters",
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
  const lengthchar = (await axios.get('https://run.mocky.io/v3/c3d88a1a-56e6-4d7b-88a9-e936a4eb1e0c')).data
  const { loadImage, createCanvas } = require("canvas");
  const path = require('path');
  const Canvas = require('canvas');
  let pathImg = __dirname + `/tad/avatar_11.png`;
  let pathImg1 = __dirname + `/tad/avatar_1_11.png`;
  let pathImg2 = __dirname + `/tad/avatar_1_21.png`;
  let pathAva = __dirname + `/tad/avatar_21111.png`;
  //let pathLine = __dirname + `/tad/avatar_311.png`;
  if (handleReply.author != event.senderID) return api.sendMessage('Cusc Giumf', event.threaID);
  const {
    threadID,
    messageID,
    senderID
  } = event;

  switch (handleReply.type) {
    case "characters": {
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`🔍Bạn đã chọn ID nhân vật là ${event.body}\n(Reply tin nhắn này nhập vào tên chính của bạn)`, threadID, function(err, info) {
        return global.client.handleReply.push({
          type: 'subname',
          name: 'anhbia',
          author: senderID,
          characters: event.body,
          messageID: info.messageID
        })
      }, messageID);
    }
    case "subname": {
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`🔍Bạn đã chọn tên chính là ${event.body}\n(Reply tin nhắn này nhập vào tên phụ của bạn)`, threadID, function(err, info) {
        return global.client.handleReply.push({
          type: 'color',
          name: 'anhbia',
          author: senderID,
          characters: handleReply.characters,
          name_s: event.body,
          messageID: info.messageID
        })
      }, messageID);
    }

    case "color": {
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`🔍Bạn đã chọn tên phụ là ${event.body}\nNhập màu nền của bạn (lưu ý: nhập tên tiếng anh của màu - Nếu không muốn nhập màu thì nhập "no")\n(Reply tin nhắn này)`, threadID, function(err, info) {
        return global.client.handleReply.push({
          type: 'linkfb',
          name: 'anhbia',
          author: senderID,
          characters: handleReply.characters,
          subname: event.body,
          name_s: handleReply.name_s,
          messageID: info.messageID
        })
      }, messageID)
    }
    case "linkfb": {
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(`🔍Bạn đã chọn màu là ${event.body}\nNhập link fb của bạn để hoàn tất`, threadID, function(err, info) {
        return global.client.handleReply.push({
          type: 'create',
          name: 'anhbia',
          author: senderID,
          characters: handleReply.characters,
          subname: handleReply.subname,
          name_s: handleReply.name_s,
          color: event.body,
          messageID: info.messageID
        })
      }, messageID)
    }
    case "create": {
      var idchar = handleReply.characters;
      var name_ = handleReply.name_s;
      var subname_ = handleReply.subname;
      var color = handleReply.color
      var linkfb_ = event.body;
      api.unsendMessage(handleReply.messageID);
      if (!color || color == "no" || color == "" || color == "No") {
        var color_ = lengthchar[idchar].colorBg;
      } else {
        var color_ = color
      }
      let background = (await axios.get(encodeURI(`https://lh3.googleusercontent.com/-JZxo4uTVIKQ/YaS7VBjAojI/AAAAAAAA1rk/mg_Bp0Z6_yUGLp1lfC9ugriYTGFfRaXTwCNcBGAsYHQ/s0/layer-2.png`), { responseType: "arraybuffer" })).data;
      fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
      let background2 = (await axios.get(encodeURI(`https://lh3.googleusercontent.com/-j9JKCim94ks/YaIMA7fVnPI/AAAAAAAA1k8/g9e5X5FfRH4NiG-7hHRNikGxViI2o8pYQCNcBGAsYHQ/s0/layer-3.png`), { responseType: "arraybuffer" })).data;
      fs.writeFileSync(pathImg1, Buffer.from(background2, "utf-8"));
      let background3 = (await axios.get(encodeURI(`https://lh3.googleusercontent.com/-F8w1tQRZ9s0/YXZZmKaylRI/AAAAAAAAynI/HBoYISaw-LE2z8QOE39OGwTUiFjHUH6xgCNcBGAsYHQ/s0/layer4.png`), { responseType: "arraybuffer" })).data;
      fs.writeFileSync(pathImg2, Buffer.from(background3, "utf-8"));
      let ava = (await axios.get(encodeURI(`${lengthchar[idchar].imgAnime}`), { responseType: "arraybuffer" })).data;
      fs.writeFileSync(pathAva, Buffer.from(ava, "utf-8"));
      if (!fs.existsSync(__dirname +
        `/tad/UTM-Avo.ttf`)) {
        let getfont = (await axios.get(`https://github.com/hanakuUwU/font/blob/main/UTM%20Avo.ttf?raw=true`, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/tad/UTM-Avo.ttf`, Buffer.from(getfont, "utf-8"));
      }
      const test = "https://facebook.com/" + linkfb_;
      let l1 = await loadImage(pathAva);
      let l2 = await loadImage(pathImg);
      let l3 = await loadImage(pathImg1);
      let l4 = await loadImage(pathImg2);
      let a = await loadImage(pathImg);
      let canvas = createCanvas(a.width, a.height);
      var ctx = canvas.getContext("2d");
      Canvas.registerFont(__dirname + `/tad/UTM-Avo.ttf`, {
        family: "UTM-Avo"
      });
      ctx.save();
      ctx.fillStyle = color_;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      ctx.save();
      ctx.drawImage(l2, 0, 0, canvas.width, canvas.height);
      ctx.restore();
      ctx.save();
      ctx.globalCompositeOperation = "multiply";
      ctx.globalAlpha = "0.5"
      ctx.drawImage(l1, -300, -300, 1500, 1500);
      ctx.restore();
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.transform(1, 0, 1, 1, 0, 0);
      ctx.fillRect(500, 0, 650, 740);
      ctx.restore();


      ctx.save();
      ctx.beginPath();
      ctx.save();
      ctx.transform(1, 0, 1, 1, 0, 0);
      ctx.rect(500, 0, 650, 740);
      ctx.restore();
      ctx.clip();
      ctx.save();
      ctx.globalAlpha = "0.1";
      ctx.drawImage(l1, 300, -300, 1500, 1500);
      ctx.restore();
      ctx.save();
      ctx.drawImage(l3, 0, 0, canvas.width, canvas.height);
      ctx.restore();
      ctx.save();
      ctx.globalCompositeOperation = "color";
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      ctx.restore();
      var ttx = 950;
      var tty = 600;
      var ttpad = 180;
      var ttsize = "300px";
      ctx.save();
      ctx.beginPath();
      ctx.save();
      ctx.transform(1, 0, 1, 1, 0, 0);
      ctx.rect(500, 0, 650, 740);
      ctx.restore();
      ctx.clip();
      ctx.save();
      ctx.translate(ttx, tty);
      ctx.globalAlpha = 0.5;
      ctx.rotate(Math.PI / 180 * 45);
      ctx.strokeStyle = color_;
      ctx.lineWidth = 4;
      ctx.textAlign = "center";
      ctx.font = ttsize + " DIN Condensed"; ctx.strokeText(subname_.split("").join(String.fromCharCode(8203)), 0, 0);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = color_;
      ctx.lineWidth = 2;
      ctx.translate(ttx + ttpad, tty - ttpad);
      ctx.rotate(Math.PI / 180 * 45);
      ctx.textAlign = "center";
      ctx.font = ttsize + " DIN Condensed";
      ctx.fillText(subname_.split("").join(String.fromCharCode(8202)), 0, 0);
      ctx.restore();
      ctx.strokeStyle = color_;
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = 5;
      ctx.translate(ttx + ttpad * 2, tty - ttpad * 2);
      ctx.rotate(Math.PI / 180 * 45);
      ctx.textAlign = "center";
      ctx.font = ttsize + " DIN Condensed"; ctx.strokeText(subname_.split("").join(String.fromCharCode(8202)), 0, 0);
      ctx.restore();
      ctx.restore();
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0, 0.3)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.drawImage(l1, 900, -200, 1000, 1000);
      ctx.restore();
      ctx.save();
      //ctx.style.letterSpacing = '5px';
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.font = "bold 65px UTM-Avo";
      ctx.fillText(name_, 430, 390);
      ctx.restore();
      ctx.save();
      // ctx.style.letterSpacing = '10px';
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.font = "27px UTM-Avo";
      ctx.fillText(test.toUpperCase(), 430, 440);
      ctx.restore();
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.fillRect(430 - 300 / 2, 470, 300, 5)
      ctx.font = "27px UTM-Avo";
      ctx.fillText("xxx".toUpperCase(), 150, 300);
      ctx.restore();
      ctx.beginPath();
      const imageBuffer = canvas.toBuffer();
      fs.writeFileSync(pathImg, imageBuffer);
      return api.sendMessage({
        body: "Ảnh Của Bạn Đây",
        attachment: fs.createReadStream(pathImg)
      },
        event.threadID,
        () => fs.unlinkSync(pathImg),
        fs.unlinkSync(pathImg1),
        fs.unlinkSync(pathImg2),
        fs.unlinkSync(pathAva),
        event.messageID
      );
    }
  }
}
