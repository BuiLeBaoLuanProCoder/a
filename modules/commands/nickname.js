module.exports.config = {
    name: "nickname",
    version: "0.0.1",
    hasPermssion: 1,
    credits: "Hanaku",
    description: "",
    commandCategory: "group",
    usages: "",
    cooldowns: 5,
    dependencies: {
        "path": "",
        "fs-extra": ""
    }
};

module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const log = require(process.cwd() + '/utils/log');
    const path = resolve(__dirname, 'cache', 'nickname.json');
    if (!existsSync(path)) {
        const obj = {
            nickname: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('nickname')) data.nickname = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}

module.exports.run = async function({ api, event }) {
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, 'cache', 'nickname.json');
    const { threadID, messageID } = event;
    const database = require(path);
    const { nickname } = database;
    if (nickname[threadID] == true) {
        nickname[threadID] = false;
        api.sendMessage("Tắt nickname thành công 🐧", threadID, messageID);
    } else {
        nickname[threadID] = true;
        api.sendMessage("Bật nickname thành công 🐧", threadID, messageID);
    }
    writeFileSync(path, JSON.stringify(database, null, 4));
}