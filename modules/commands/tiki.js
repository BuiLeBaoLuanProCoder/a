module.exports.config = {
name: "tiki",
version: "1.0.0",
hasPermssion: 0,
credits: "Shiron-chinhle",
description: "Banner tiki",
commandCategory: "Image",
usages: "Banner tiki",
cooldowns: 5
};
module.exports.run = async function ({ api, args, event, Threads, Users }) {
let { senderID, threadID, messageID } = event;

  const { loadImage, createCanvas } = require("canvas");

  const request = require('request');

  const fs = require("fs-extra")

  const axios = require("axios")

  let pathImg = __dirname + `/cache/${senderID}123.png`;

  let background = (

    await axios.get(encodeURI(

      `https://2.bp.blogspot.com/-C1Brj2ntUhM/XtOmlT2tmgI/AAAAAAAAe6c/4DUr5vHILGMvl1QJFGAYwpLhpX9m4SFygCNcBGAsYHQ/s1600/tiki.jpg?fbclid=IwAR2w5Ka2Bx_4tBGiujr1RLByPmkFVguMaSnYik_ioktbM7oXq-HapkaC_Rc`),

      { responseType: "arraybuffer" }

    )

  ).data;

  fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));





/*-----------------download----------------------*/

if(!fs.existsSync(__dirname+`/cache/Muli Black.otf`)) { 

      let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=1WKXarqTN1zoV3aPGxQMKS_YQmRJYMcsu&export=download`, { responseType: "arraybuffer" })).data;

       fs.writeFileSync(__dirname+`/cache/Muli Black.otf`, Buffer.from(getfont, "utf-8"));

    };

/*---------------------------------------------*/

  var name = (await Users.getData(senderID)).name

  var namee = args.join(" ") || name

  const Canvas = require("canvas")

  let baseImage = await loadImage(pathImg);

  let canvas = createCanvas(baseImage.width, baseImage.height);

  let ctx = canvas.getContext("2d");

  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

  Canvas.registerFont(__dirname+`/cache/Muli Black.otf`, {

        family: "Muli Black"

    });

  ctx.font = `55px Muli Black`;

  ctx.fillStyle = "#ffc903";

  ctx.textAlign = "start";

  ctx.fillText(namee.toUpperCase(), 626, 427);

  ctx.beginPath();

  const imageBuffer = canvas.toBuffer();

  fs.writeFileSync(pathImg, imageBuffer);

  return api.sendMessage(

    { attachment: fs.createReadStream(pathImg) },

    threadID,

    () => fs.unlinkSync(pathImg),

    messageID

  );

}
