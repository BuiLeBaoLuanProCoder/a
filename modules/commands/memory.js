module.exports.config = {
  name: 'memory',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'tdunguwu',
  description: 'Just Game',
  commandCategory: 'Game',
  cooldowns: 0,
  envConfig: {
        APIKEY: 'tdunguwu'
    }
};

module.exports.wrapText = (ctx, text, maxWidth) => {
	return new Promise(resolve => {
		if (ctx.measureText(text).width < maxWidth) return resolve([text]);
		if (ctx.measureText('W').width > maxWidth) return resolve(null);
		const words = text.split(' ');
		const lines = [];
		let line = '';
		while (words.length > 0) {
			let split = false;
			while (ctx.measureText(words[0]).width >= maxWidth) {
				const temp = words[0];
				words[0] = temp.slice(0, -1);
				if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
				else {
					split = true;
					words.splice(1, 0, temp.slice(-1));
				}
			}
			if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
			else {
				lines.push(line.trim());
				line = '';
			}
			if (words.length === 0) lines.push(line.trim());
		}
		return resolve(lines);
	});
} 


module.exports.run = async function ({ api, event, args, Users }) {
  const axios = require("axios");

  	const data = ["bán nha","mua ib","test module thôi"];
    const random = data[Math.floor(Math.random() * data.length)];
	let { senderID, threadID, messageID } = event;
	const { loadImage, createCanvas } = require("canvas");
	const fs = require("fs-extra");;

	let pathImg = __dirname + '/cache/memory.jpg';
	
	let getPorn = (await axios.get(`https://i.ibb.co/MZgPTtV/IMG-20210622-185316.jpg`, { responseType: 'arraybuffer' })).data;
	fs.writeFileSync(pathImg, Buffer.from(getPorn, 'utf-8'));
	let baseImage = await loadImage(pathImg);
	let canvas = createCanvas(baseImage.width, baseImage.height);
	let ctx = canvas.getContext("2d");
	ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
	ctx.font = "400 30px serif";
	ctx.fillStyle = "#ffffff";
	ctx.textAlign = "start";
	let fontSize = 20;
while (ctx.measureText(random).width > 2000) {
		fontSize--;
		ctx.font = `400 ${fontSize}px serif, Regular`;
	}
	const lines = await this.wrapText(ctx, random, 350);
	ctx.fillText(lines.join('\n'), 150, 170);//comment
	ctx.beginPath();
	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(pathImg, imageBuffer);
  try {
    api.sendMessage({ attachment: fs.createReadStream(pathImg) }, event.threadID, async (err, info) => {
      fs.unlinkSync(pathImg),
      await new Promise(resolve => setTimeout(resolve, 10 * 1000));
      api.unsendMessage(info.messageID)
      var msg = { body: `reply tin nhắn để trả lời câu hỏi`}
      return api.sendMessage(msg, event.threadID, (error, info) => {
        global.client.handleReply.push({
          type: "reply",
          name: this.config.name,
          author: event.senderID,
          messageID: info.messageID,

          answer: random
        })
      })
    })
  }
  catch (err) {
    console.log(err)
  }
}
module.exports.handleReply = async function({ args, event, Users, Currencies, api, handleReply }) {
  let { author, answer, messageID } = handleReply;

  if (event.senderID != author) return api.sendMessage("xàm lồn quá cho người ta trả lời đi đbrr", event.threadID, event.messageID);
  switch (handleReply.type) {
    case "reply": {
      const dapan = event.body
      if (dapan == answer) {

        var namePlayer = await Users.getData(event.senderID)
        api.unsendMessage(handleReply.messageID)
        var msg = { body: `${namePlayer.name} đã trả lời chính xác!\nĐáp án: ${answer} ` }
        return api.sendMessage(msg, event.threadID, event.messageID)
      }
      else
        
      return api.sendMessage(`Câu trả lời không đúng. Đáp án: ${answer}`, event.threadID, event.messageID),
        api.unsendMessage(handleReply.messageID);
    }
  }
}
