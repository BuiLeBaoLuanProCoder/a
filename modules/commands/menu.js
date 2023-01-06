module.exports.config = {
  name: "menu",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Mirai Team Mod By Kadeer",
  description: "Hướng dẫn cho người mới",
  commandCategory: "Danh sách lệnh",
  usages: "[Tên module]",
  cooldowns: 5,
  envConfig: {
		autoUnsend: true,
		delayUnsend: 10
	}
};

module.exports.run = function({ api, event, args }) {
    const axios = require('axios');
    const request = require('request');
    const fast = global.nodemodule["fast-speedtest-api"];
    const fs = require("fs");
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  	
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  
if (!command) {
  var tl = ["tdungdeptraivcl","Hwanglathanggeii","xamf loonf","Simp nhưng không mê gái 2D bằng 3D =))","Bạn xàm vải","7749 chạy là thượng sách","sát boi nhưng không xi tình","cảm ơn Duy Vuông cung cấp Data help","Nếu bạn thức khuya bạn sẽ buồn ngủ","Tình đầu là tình đau vậy nên tôi không có ni","Simple Live Is Very Ez","Đéo múa được phờ nô ren ti nô thì cút","địc mẹ tôi yêu bạn Nhiều Vải LỒn"];
  var tle = tl[Math.floor(Math.random() * tl.length)];
  
    const commandsPush = [];
    const page = parseInt(args[0]) || 1;
    const pageView = 15;
    let i = 0;
    let msg = "=== DANH SÁCH LỆNH ===\n";
    for (var [name, value] of (commands)) {
        name += `
❯ ${value.config.description}
❯ Thời gian chờ: ${value.config.cooldowns}s
❯ Quyền hạn: ${((value.config.hasPermssion == 0) ? `Người dùng` : (value.config.hasPermssion == 1) ? `Quản trị viên nhóm` : `Quản trị viên BOT`)}\n`;
        commandsPush.push(name);
    }

    commandsPush.sort((a, b) => a.data - b.data);

    const first = pageView * page - pageView;
    i = first;
    const helpView = commandsPush.slice(first, first + pageView);

    for (let cmds of helpView)
        msg += `『${++i}』 - ${cmds}\n`;
    const cmdsView = `
❯ Trang ${page}/${Math.ceil(commandsPush.length/pageView)}
❯ Hiện tại có ${commandsPush.length} lệnh có thể sử dụng
❯ HDSD: ${prefix}help <Số trang> \n[ FACT ]: [ ${tle} ]`;
    return api.sendMessage({body: msg + cmdsView}, threadID, async (error, info) => {
			if (autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, delayUnsend * 25000));
				return api.unsendMessage(info.messageID);
			} else return;
		});

	}
return axios.get('https://apiumaru.khoahoang3.repl.co').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
        api.sendMessage({body:`
» Lệnh: ${command.config.name}
» Thực thi: ${command.config.description}
» Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : "Chưa có hướng dẫn cụ thể"}
» Thời gian chờ: ${command.config.cooldowns}
» Quyền hạn: ${((command.config.hasPermssion == 0) ? `Người dùng` : (command.config.hasPermssion == 1) ? `Quản trị viên nhóm` : `Quản trị viên BOT`)}`,
        attachment: fs.createReadStream(__dirname + `/cache/475.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/475.${ext}`), event.messageID);
        }; request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/475.${ext}`)).on("close", callback);
     })
};