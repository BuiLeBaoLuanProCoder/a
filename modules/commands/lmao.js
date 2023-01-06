   module.exports.config = {
        name: "lmao",
        version: "0.0.1",
        hasPermssion: 0,
        credits: "tdunguwu",
        description: "",
        commandCategory: "lmao",
        usages: "",
        cooldowns: 5,
        };
module.exports.onLoad = async () => {
        const { existsSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];

    const path = resolve(__dirname, "cache", "leakdiemroiemselenbangvang.json");

    if (!existsSync(path)) return await global.utils.downloadFile("https://raw.githubusercontent.com/tdunguwu/bang_vang_gban_mdl-/main/kkk.json", path);
    else return;
    }
    module.exports.run = async ({ event, api, Currencies, args, Users }) => { 
       const { threadID, messageID, senderID } = event;
    const { readFileSync, writeFileSync } = require("fs-extra");
    const { join } = require("path")
    const pathData = join(__dirname, "cache", "leakdiemroiemselenbangvang.json");
     var dataJson = JSON.parse(readFileSync(pathData, "utf-8"))
    if (dataJson.some(i => i.senderID !== senderID) == false) return api.sendMessage('leak cái đbuồi bố m nhé', threadID, messageID)
        else {  
        return api.sendMessage(`ok done`, threadID, messageID)
        }
    } 
            
