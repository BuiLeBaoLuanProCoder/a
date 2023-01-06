module.exports.config = {
	name: "banerttk",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "chinhle",
	description: "baner",
	commandCategory: "Image",
	usages: "text1 = ag[0], text2 = ag[1];",
	cooldowns: 5
};
module.exports.run = async ({ event,
    api,
    global,
    Config,
    logger,
    Threads,
    Users,
    args,
    body,
    is }) => {
  try {
        const axios = require("axios");
        const request = require("request");
        const fs = require("fs-extra");
        var ag = args.join(" ").split(' | ');
        var text1 = ag[0],
            text2 = ag[1],
            text3 = ag[2];
        if (!text1) {
            return api.sendMessage("DANH SÁCH CÁC TAG BANNER\n\n1.CSGO\n2.NARUTO\n3.CROSSFIRE\n\nExample: =>banner <tag> | <text> ", event.threadID)
        }
        if (text1 == "pubg") {
            if (!text2 || !text3) {
                return api.sendMessage("Error\n\nExample: =>banner pubg | [text1] | [text2]", event.threadID);
            } else {
                let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/pubg.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/pubg.png`), event.messageID);
                };
                return request(encodeURI(`https://lawerpr0ject.herokuapp.com/banner/pubg?text1=${text2}&text2=${text3}&apikey=lawerteam`))
                    .pipe(fs.createWriteStream(__dirname + `/cache/pubg.png`))
                    .on("close", callback);
            }
        }
       if (text1 == "smoketext") {
            if (!text2) {
                return api.sendMessage("Error\n\nExample: =>banner smoketext | [text]", event.threadID);
            } else {
                const res1 = await axios.get(`http://lawerpr0ject.herokuapp.com/banner/smoketext?text=${text2}`);
                var url1 = res1.data.url;
                let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/smoketext.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/smoketext.png`), event.messageID);
                };
                return request(encodeURI(url1))
                    .pipe(fs.createWriteStream(__dirname + `/cache/smoketext.png`))
                    .on("close", callback);
            }

        }
        if (text1 == "naruto") {
            if (!text2) {
                return api.sendMessage("Error\n\nExample: =>banner naruto | [text]", event.threadID);
            } else {
                const res1 = await axios.get(`http://lawerpr0ject.herokuapp.com/banner/naruto?text=${text2}`);
                var url1 = res1.data.url;
                let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/naruto.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/naruto.png`), event.messageID);
                };
                return request(encodeURI(url1))
                    .pipe(fs.createWriteStream(__dirname + `/cache/naruto.png`))
                    .on("close", callback);
            }

        }
        if (text1 == "crossfire") {
            if (!text2) {
                return api.snedMessage("Error\n\nExample: =>banner crossfire | [text]", event.threadID);
            } else {
                let callback = function() {
                    api.sendMessage({
                        attachment: fs.createReadStream(__dirname + `/cache/crossfire1.png`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/crossfire1.png`), event.messageID);
                };
                return request(encodeURI(`https://lawerpr0ject.herokuapp.com/banner/crossfire?text=${text2}&apikey=lawerteam`))
                    .pipe(fs.createWriteStream(__dirname + `/cache/crossfire1.png`))
                    .on("close", callback);
            }
        }
    } catch (err) {
        console.log(err)
        return api.sendMessage("Đã xảy ra lỗi", event.threadID);
    }
}