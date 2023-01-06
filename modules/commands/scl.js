module.exports.config = {

    name: "scl1",

    version: "1.0.0",

    hasPermssion: 0,

    credits: "Thiệu Trung Kiên",

    description: "Tải nhạc soundcloud",

    commandCategory: "media",

    usages: "[url]",

    cooldowns: 10,

    dependencies: {

        "axios": "",

        "fs-extra": ""

    }



};

module.exports.run = async function({
    api,
    event,
    args,
}) {

    const axios = global.nodemodule["axios"];

    const fs = global.nodemodule["fs-extra"];
  const request = require("request")

    if (!args.join("") != " ") {
        return api.sendMessage("Bạn phải ngập url soundcloud", event.threadID, event.messageID);
    }

    var url = args[0];

    try {

        const res = await axios.get(`http://api-ttk.herokuapp.com/social/videodl?link=${url}`);

        var callback = () => api.sendMessage({
            body: `${res.data.title}`,
            attachment: fs.createReadStream(__dirname + "/cache/scd1.mp3")
        }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/scd1.mp3"), event.messageID);

        return request(encodeURI(`${res.data.medias[0].url}`)).pipe(fs.createWriteStream(__dirname + '/cache/scd1.mp3')).on('close', () => callback());
    } catch (err) {

        console.log(err)

        return api.sendMessage("Đã xảy ra lỗi", event.threadID);

    }

}