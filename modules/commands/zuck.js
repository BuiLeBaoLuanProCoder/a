module.exports.config = {
	name: "m52",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "ARAXY UWU",
	description: "khò khò",
	commandCategory: "",
	usages: "[text]",
	cooldowns: 10,
	dependencies: {
		"canvas":"",
		 "axios":"",
		 "fs-extra":""
	}
};
module.exports.run = async function({ api, args, event, Users, permssion, Currencies }) {
  const request = require('request');
    const axios = require('axios');
    const Canvas = require('canvas');
if(!fs.existsSync(__dirname+'/cache/UTM-Libel-KT.woff')) { 
      let getfont = (await axios.get(`https://github.com/tuan2308/tad/raw/main/tad/effect/cover-m52/fonts/UTMLibelKT.woff`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/UTM-Libel-KT.woff", Buffer.from(getfont, "utf-8"));
    };
if(!fs.existsSync(__dirname+'/cache/SVN-Holidays.woff')) { 
  let getfont2 = (await axios.get(`https://github.com/tuan2308/tad/raw/main/tad/effect/cover-m52/fonts/SVN-Holidays.woff`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/SVN-Holidays.woff", Buffer.from(getfont2, "utf-8"));
    };
   let path = __dirname + "/cache/araxy.jpg";
    let bg = (await axios.get(`https://lh3.googleusercontent.com/-Ph7K4UgiZXI/Ye_iE5sLh8I/AAAAAAAA4dQ/AOiqTIE7kc8L-X8XKY-z8ptY4K0__yFpgCNcBGAsYHQ/s0/m52.jpg`, {responseType: "arraybuffer" })).data;
    fs.writeFileSync(path, Buffer.from(bg, "utf-8"));
  let bgBase = await loadImage(path);
    let canvas = createCanvas(bgBase.width, bgBase.height);
    let ctx = canvas.getContext("2d");
    ctx.drawImage(bgBase, 0, 0, canvas.width, canvas.height);
   Canvas.registerFont(__dirname + `./cache/UTM-Libel-KT.woff`, {
      family: "UTM-Libel-KT"
    });
    ctx.textAlign = "right";
    ctx.fillStyle = "#3f3e3c"
    ctx.font = "130px UTM-Libel-KT";
    ctx.fillText("CHÀNG TRAI", 700, 260);
    ctx.textAlign = "left";
    ctx.fillText("CÔ GÁI", 1450, 460);
    Canvas.registerFont(__dirname + `/cache/SVN-Holidays.woff`, {
      family: "SVN-Holidays"
    });
    ctx.textAlign = "right";
    ctx.fillStyle = "#d64f55"
    ctx.font = "130px SVN-Holidays";
    ctx.fillText("m72", 800, 390);
    ctx.textAlign = "left";
    ctx.fillText("m52", 1550, 570);
    ctx.beginPath();
	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(pathImg, imageBuffer);
return api.sendMessage({ attachment: fs.createReadStream(pathImg) }, threadID, () => fs.unlinkSync(pathImg), messageID);    
}