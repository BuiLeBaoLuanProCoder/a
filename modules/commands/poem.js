module.exports.config = {
	name: "poem",
	version: "1.0.5",
	hasPermssion: 0,
	credits: "ManhG",
	description: "bài thơ",
	commandCategory: "Horoscope",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
const axios = require('axios');
const res = await axios.get(`https://le31.glitch.me/other/poem?key=0533886feac912c1d9021e24b7fe4d0afe7e0263`);
var poem =       res.data.data;

//console.log(poem)

return api.sendMessage(` 🍄 == Bài thơ == 🍄 \n\n${poem}  `, event.threadID, event.messageID)
}