module.exports.config = {
	name: "tarot",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "DuyVuongUwU",
	description: "tao code tao còn không biết nó là gì:))",
	commandCategory: "Game", 
	cooldowns: 5,
    dependencies: {
    "axios": "",
    "request": "",
    "fs-extra": ""
	}
};

module.exports.run = async function ({ args, api, event, Currencies, client, Users}) {
const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
axios.get(`https://le31.glitch.me/tarot`).then(res => {
	let name = res.data.data.name;
	let suite = res.data.data.suite;
	let img = res.data.data.image;
	let msg = res.data.data.description;
	let v = res.data.data.interpretation;
	let ext = res.data.data.image.substring(res.data.data.image.lastIndexOf(".") + 1);
	let callback = function () {
		api.sendMessage({
			            body: `===== TAROT =====\n\nName -> ${name}\nSuite -> ${suite}\n${msg}\n\nInterpretation -> ${v}`,
						attachment: fs.createReadStream(__dirname + `/cache/tarot.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/tarot.${ext}`), event.messageID);
	};
	   request(res.data.data.image).pipe(fs.createWriteStream(__dirname + `/cache/tarot.${ext}`)).on("close", callback);
})
}