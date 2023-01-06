module.exports.config = {
    name: "m52",
    version: "1.1.1",
    hasPermssion: 0,
    credits: "ARAXY XD",
    description: "",
    commandCategory: "CANVAS ><",
    usages: "OK",
    cooldowns: 5,
};
module.exports.run = async function({ api, args, event, Users, permssion, Currencies }) {
  const { threadID, messageID, senderID} = event
  const request = require('request');
    const axios = require('axios');
    const Canvas = require("canvas"); 
  const fs = require('fs')
if(!fs.existsSync(__dirname+'/cache/UTMLibelKT.ttf')) { 
      let getfont = (await axios.get(`https://github.com/tdunguwu/font/raw/main/UTMLibelKT.ttf`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/UTMLibelKT.ttf", Buffer.from(getfont, "utf-8"));
    };
if(!fs.existsSync(__dirname+'/cache/SVN-Holidays.ttf')) { 
  let getfont2 = (await axios.get(`https://github.com/tdunguwu/font/raw/main/SVN-Holidays.ttf`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname + "/cache/SVN-Holidays.ttf", Buffer.from(getfont2, "utf-8"));
    };
   let path = __dirname + `/cache/avatar_1.png`;
    let bg = (await axios.get(`https://lh3.googleusercontent.com/-Ph7K4UgiZXI/Ye_iE5sLh8I/AAAAAAAA4dQ/AOiqTIE7kc8L-X8XKY-z8ptY4K0__yFpgCNcBGAsYHQ/s0/m52.jpg`, {responseType: "arraybuffer" })).data;
    fs.writeFileSync(path, Buffer.from(bg, "utf-8"));
  let bgBase = await Canvas.loadImage(path);
    let canvas = Canvas.createCanvas(bgBase.width, bgBase.height);
    let ctx = canvas.getContext("2d");
    ctx.drawImage(bgBase, 0, 0, canvas.width, canvas.height);
   Canvas.registerFont(__dirname + `/cache/UTMLibelKT.ttf`, {
      family: "UTM-Libel-KT"
    });
    ctx.textAlign = "right";
    ctx.fillStyle = "#3f3e3c"
    ctx.font = "130px UTM-Libel-KT";
    ctx.fillText(args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0], 500, 260);
    ctx.textAlign = "left";
    ctx.fillText(args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[1], 1200, 400);
    Canvas.registerFont(__dirname + `/cache/SVN-Holidays.ttf`, {
      family: "SVN-Holidays"
    });
    ctx.textAlign = "right";
    ctx.fillStyle = "#d64f55"
    ctx.font = "130px UTM-Libel-KT";
    ctx.fillText(args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[2], 600, 380);
    ctx.textAlign = "left";
    ctx.fillText(args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[3], 1250, 500);
    ctx.beginPath();
	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(path, imageBuffer);
return api.sendMessage({ attachment: fs.createReadStream(path)}, threadID, () => fs.unlinkSync(path), messageID);    
}