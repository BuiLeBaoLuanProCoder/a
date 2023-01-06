module.exports.config = {
    name: "antijoin",
    version: "1.1.2",
    hasPermssion: 1,
    credits: "tdunguwu",
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
    const path = resolve(__dirname, 'cache', 'antijoin.json');
    if (!existsSync(path)) {
        const obj = {
            antijoin: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('antijoin')) data.antijoin = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}

module.exports.run = async function({ api, event }) {
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, 'cache', 'antijoin.json');
    const { threadID, messageID } = event;
    const database = require(path);
    const { antijoin } = database;
    if (antijoin[threadID] == true) {
        antijoin[threadID] = false;
        api.sendMessage("Bật antijoin thành công 🐧", threadID, messageID);
    } else {
        antijoin[threadID] = true;
        api.sendMessage("Tắt antijoin thành công 🐧", threadID, messageID);
    }
    writeFileSync(path, JSON.stringify(database, null, 4));
}