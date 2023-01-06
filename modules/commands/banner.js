module.exports.config = {

    name: "bannerall",

    version: "0.0.1",

    hasPermssion: 0,

    credits: "tdunguwu",

    description: "",

    commandCategory: "banner",

    cooldowns: 0,

    dependencies: {

        "fs-extra": "",

		"axios": "",

        "request": ""    }

};

module.exports.run = async ({ event, api, global, Config, logger, Threads, Users, args, body, is }) => {

var ag = args.join(" ").split(" - ");
var text1 = ag[0],
    text2 = ag[1],
	text3 = ag[2],
  text4 = ag[3];
	
const axios = require('axios');
const request = require('request');
const fs = require('fs-extra');

if (args[0] == "hlw") {
		
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/re.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/re.jpg"),event.messageID);
return request(encodeURI(`https://api-alphabot.herokuapp.com/api/textpro/halloween?text=${text2}&apikey=Alphabot`)).pipe(fs.createWriteStream(__dirname+'/cache/re.jpg')).on('close',() => callback());     
}
else if (args[0] == "8bit") {
	let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/8bit.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/8bit.png`), event.messageID);
                };
                return request(encodeURI(`https://api-alphabot.herokuapp.com/api/textpro/game8bit?text=${text2}&text2=${text3}&apikey=Alphabot`))
                    .pipe(fs.createWriteStream(__dirname + `/cache/8bit.png`))
                    .on("close", callback);
            }
if (args[0] == "blackpink") {
		
  
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/re.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/re.jpg"),event.messageID);
return request(encodeURI(`https://api-alphabot.herokuapp.com/api/textpro/blackpink?text=${text2}&apikey=${text3}`)).pipe(fs.createWriteStream(__dirname+'/cache/re.jpg')).on('close',() => callback());     
}
else if (args[0] == "layer") {
	let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/crossfire1.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/crossfire1.png`), event.messageID);
                };
                return request(encodeURI(`https://api-alphabot.herokuapp.com/api/textpro/layered?text=${text2}&text2=${text3}&apikey=Alphabot`))
                    .pipe(fs.createWriteStream(__dirname + `/cache/crossfire1.png`))
                    .on("close", callback);
            }
            else if (args[0] == "bac") {
	let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/nit.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/nit.png`), event.messageID);
                };
                return request(encodeURI(`https://api.zeks.me/api/splaybutton?text=${text2}&apikey=apivinz`))
                    .pipe(fs.createWriteStream(__dirname + `/cache/nit.png`))
                    .on("close", callback);
            }
            else if (args[0] == "harry") {
	let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/crossfire1.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/crossfire1.png`), event.messageID);
                };
                return request(encodeURI(`https://api-alphabot.herokuapp.com/api/photooxy/harry?apikey=Alphabot&text=${text2}`))
                    .pipe(fs.createWriteStream(__dirname + `/cache/crossfire1.png`))
                    .on("close", callback);
            }
            else if (args[0] == "matrix") {
	let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/crossfire1.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/xamqua.png`), event.messageID);
                };
                return request(encodeURI(`https://api.chipa.xyz/api/textpro/matrix?text=${text2}&apikey=JEXAARU31AJUMMBXU4IXRJ8C`))
                    .pipe(fs.createWriteStream(__dirname + `/cache/xamqua.png`))
                    .on("close", callback);
            }
            else if (args[0] == "hary") {
	let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/crossfire1.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/crossfire1.png`), event.messageID);
                };
                return request(encodeURI(`https://api-alphabot.herokuapp.com/api/textpro/harry_potter?text=${text2}&apikey=Alphabot`))
                    .pipe(fs.createWriteStream(__dirname + `/cache/crossfire1.png`))
                    .on("close", callback);
            }
            else if (args[0] == "neon") {
	let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/crossfire1.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/crossfire1.png`), event.messageID);
                };
                return request(encodeURI(`https://api-alphabot.herokuapp.com/api/textpro/neon?text=${text2}&apikey=Alphabot`))
                    .pipe(fs.createWriteStream(__dirname + `/cache/crossfire1.png`))
                    .on("close", callback);
            }
            else if (args[0] == "cap") {
	let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/crossfire1.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/crossfire1.png`), event.messageID);
                };
                return request(encodeURI(`https://api-alphabot.herokuapp.com/api/photooxy/captain_as?apikey=Alphabot&text=${text2}&text2=${text3}`))
                    .pipe(fs.createWriteStream(__dirname + `/cache/crossfire1.png`))
                    .on("close", callback);
            }
             else if (args[0] == "horror") {
	let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/crossfire1.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/crossfire1.png`), event.messageID);
                };
                return request(encodeURI(`https://api-alphabot.herokuapp.com/api/textpro/horror?text=${text2}&text2=${text3}&apikey=Alphabot`))
                    .pipe(fs.createWriteStream(__dirname + `/cache/crossfire1.png`))
                    .on("close", callback);
            }
            else if (args[0] == "mtd") {
	let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/crossfire1.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/crossfire1.png`), event.messageID);
                };
                return request(encodeURI(`https://api-alphabot.herokuapp.com/api/textpro/metaldark?text=${text2}&apikey=Alphabot`))
                    .pipe(fs.createWriteStream(__dirname + `/cache/crossfire1.png`))
                    .on("close", callback);
            }
            else if (args[0] == "wolf") {
	let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/crossfire1.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/crossfire1.png`), event.messageID);
                };
          return request(encodeURI(`https://api-alphabot.herokuapp.com/api/textpro/wolf_g?text=${text2}&text2=${text3}&apikey=Alphabot`))
                    .pipe(fs.createWriteStream(__dirname + `/cache/crossfire1.png`))
                    .on("close", callback);
            }
            else if (args[0] == "mav") {
	let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/crossfire1.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/crossfire1.png`), event.messageID);
                };
                return request(encodeURI(`https://api-alphabot.herokuapp.com/api/textpro/marvel?text=${text2}&text2=${text3}&apikey=Alphabot`))
                    .pipe(fs.createWriteStream(__dirname + `/cache/crossfire1.png`))
                    .on("close", callback);
            }

else if (args[0] == "mvt") {
	let text = args.join(" ")
var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/pubg1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/pubg1.jpg"),event.messageID);
	 return request(encodeURI(`https://api-alphabot.herokuapp.com/api/textpro/marvel?text=${text2}&text2=${text3}&apikey=Alphabot`)).pipe(fs.createWriteStream(__dirname+'/cache/pubg1.jpg')).on('close',() => callback());     
}

else if (args.join() == "") { return api.sendMessage(`etou sai rồi kìa`, event.threadID, event.messageID) }
}