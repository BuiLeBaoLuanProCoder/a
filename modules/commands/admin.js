module.exports.config = {
    name: "admin",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "Mirai Team",// Mod by ARAXY nhé XD
    description: "Quản lý admin bot và dùng để bật tắt QTV và người dùng",
    commandCategory: "config",
    usages: "boxonly dùng để bật tắt",
    cooldowns: 10,
    dependencies: {
        "fs-extra": ""
    }
};
module.exports.languages = {
    "vi": {
        "listAdmin": '[Admin] Danh sách toàn bộ người điều hành bot: \n\n%1\n[SUPERADMIN]:%2\n',
        "notHavePermssion": '[Admin] Bạn không đủ quyền hạn để có thể sử dụng chức năng "%1"',
        "addedNewAdmin": '[Admin] Đã thêm %1 người dùng trở thành người điều hành bot:\n\n%2',
      "addedNewSPAdmin": '[SUPER Admin] Đã thêm %1 người dùng trở thành SUPER ADMIN:\n\n%2',
        "removedAdmin": '[Admin] Đã gỡ bỏ %1 người điều hành bot:\n\n%2',
        "removedSPAdmin": '[SPADMIN Admin] Đã gỡ bỏ %1 SUPERADMIN:\n\n%2'
    },
    "en": {
        "listAdmin": '[Admin] Admin list: \n\n%1',
        "notHavePermssion": '[Admin] You have no permission to use "%1"',
        "addedNewAdmin": '[Admin] Added %1 Admin :\n\n%2',
        "removedAdmin": '[Admin] Remove %1 Admin:\n\n%2'
    }
}
module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {
    const content = args.slice(1, args.length);
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { ADMINBOT, SUPERADMIN } = global.config;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);

    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);

    switch (args[0]) {
        case "list":
        case "all":
        case "-a": {
            const listAdmin = ADMINBOT || config.ADMINBOT || [];
            var msg = [];
const axtyn = SUPERADMIN || config.SUPERADMIN || [];
            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                    const name = (await Users.getData(idAdmin)).name || ""
                    msg.push(`- ${name}\nLINK: https://facebook.com/${idAdmin}`);
                }
            }
 for (const araxt of axtyn) {
                if (parseInt(araxt)) {
                    const name = (await Users.getData(araxt)).name
                    msg.push(`\n[ SUPER ADMINn] - ${name}\nLINK: https://facebook.com/${araxt}\n`);
                }
            }
            return api.sendMessage(`[Admin] Danh sách toàn bộ người điều hành bot: \n\n${msg.join("\n")}`, threadID, messageID);
      
        }

        case "add": {
            if (permssion < 1) return api.sendMessage(getText("notHavePermssion", "add"), threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listAdd.push(`[ ${id} ] \n» ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `[ ADMIN ] \n» ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
case "addspadm": {
             if (permssion !== 3) return api.sendMessage('[ WARN ] - Không Đủ Quyền Hạn', threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    SUPERADMIN.push(id);
                    config.SUPERADMIN.push(id);
                    listAdd.push(`[ ${id} ] \n» ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewSPAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                SUPERADMIN.push(content[0]);
                config.SUPERADMIN.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(`[ SUPER ADMIN] - ${name}`, threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        
}
        case "remove":
        case "rm":
        case "delete": {
            if (permssion != 2) return api.sendMessage(getText("notHavePermssion", "delete"), threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.ADMINBOT.findIndex(item => item == id);
                    ADMINBOT.splice(index, 1);
                    config.ADMINBOT.splice(index, 1);
                    listAdd.push(`[ ${id} ] \n» ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.ADMINBOT.findIndex(item => item.toString() == content[0]);
                ADMINBOT.splice(index, 1);
                config.ADMINBOT.splice(index, 1);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", 1, `[ ${content[0]} ] \n» ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }
case "delspadmin":
        case "delspadm":
        case "rmspadm":{
            if (permssion !== 3) return api.sendMessage("[ WARN ] - Không đủ quyền hạn", threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.SUPERADMIN.findIndex(item => item == id);
                    SUPERADMIN.splice(index, 1);
                    config.SUPERADMIN.splice(index, 1);
                    listAdd.push(`[ ${id} ] \n» ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.SUPERADMIN.findIndex(item => item.toString() == content[0]);
                SUPERADMIN.splice(index, 1);
                config. SUPERADMIN.splice(index, 1);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedSPAdmin", 1, `[ ${content[0]} ] \n» ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }        
        case 'only':
        case '-o': {
            //---> CODE ADMIN ONLY<---//
            if (permssion < 1) return api.sendMessage("⚡️ Quyền nồn biên giới", threadID, messageID);
            if (config.adminOnly == false) {
                config.adminOnly = true;
                api.sendMessage("\n» Bật thành công admin only", threadID, messageID);
            } else {
                config.adminOnly = false;
                api.sendMessage("\n» Tắt thành công admin only", threadID, messageID);
            }
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                break;
              }
               case 'SUPERADMIN':
        case 'spadm': {
            if (permssion < 1) return api.sendMessage(" Quyền nồn biên giới", threadID, messageID);
            if (config.adminOnly == false) {
                config.adminOnly = true;
                api.sendMessage("\n» Bật thành công SUPERADMIN only", threadID, messageID);
            } else {
                config.adminOnly = false;
                api.sendMessage("\n» Tắt thành công SUPERADMIN  only", threadID, messageID);
            }
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                break;
              }
        case 'ibrieng': {
           if (config.ibrieng == false) {
                config.ibrieng = true;
                api.sendMessage("\n» Bật thành công ibrieng", threadID, messageID);
            } else {
                config.ibrieng = false;
                api.sendMessage("\n» Tắt thành công ibrieng", threadID, messageID);
            }
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                break;
        }
        case 'dangky': {
           if (config.dangky == false) {
                config.dangky = true;
                api.sendMessage("\n» Bật thành công dangky", threadID, messageID);
            } else {
                config.dangky = false;
                api.sendMessage("\n» Tắt thành công dangky", threadID, messageID);
            }
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                break;
        }
        case 'boxonly': 
        case 'onlybox': 
        case 'box': {
            if (permssion < 1) return api.sendMessage("Quyền Lồn Biên Giới", threadID, messageID);
            const { resolve } = require("path");
            const pathData = resolve(__dirname, 'cache', 'data.json');
            const database = require(pathData);
            const { adminbox } = database;   
            if (adminbox[threadID] == true) {
                  adminbox[threadID] = false;
                  api.sendMessage("> Tắt thành công chế độ QTV (tất cả mọi người đều có thể sử dụng bot)", threadID, messageID);
              } else {
                  adminbox[threadID] = true;
                  api.sendMessage("✅ Bật thành công chế độ QTV (chỉ QTV box mới có thể sử dụng bot)", threadID, messageID);
              }
              writeFileSync(pathData, JSON.stringify(database, null, 4));
              break;
          }
        default: {
            return api.sendMessage(`"Bạn có thể dùng: \n» .admin list -> xem list admin\n» .admin add -> thêm admin bot\n» .admin remove -> gỡ admin bot\n» .admin boxonly -> bật chế độ chỉ admin box mới được sử dụng bot\n» .admin only -> bật chể độ chỉ admin bot mới được sử dụng bot\n» .admin spadm -> chỉ súp pơ ai đồ đc dùng bot \n».admin ibrieng: Không Ai Được ib riêng với bỏ\n» HDSD: .admin <case>"`, threadID, messageID)
        }
    };
}