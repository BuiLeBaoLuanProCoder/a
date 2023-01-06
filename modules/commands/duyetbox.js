 
    api.sendMessage(`[ DUYET BOX ] - Đã Gửi Yêu Cầu Của Bạn Thành Công`, threadID, messageID)
  }

  if (event.body == "dang ky"|| event.body == "Dangky" || event.body == "đăng ký" || event.body == "dangky") {
    const res = await axios.get(`https://ddos-thi-doi.araxy.repl.co/reg?uid=${event.senderID}&name=${encodeURI('Người Dùng Facebook')}`)
    if (`${res.data.data}` == "false") {
      return api.sendMessage(`${res.data.msg}`, threadID, messageID)
    } else {
      return api.sendMessage(`${res.data.msg} số lần request là ${res.data.request}`, threadID, messageID)
    }
  }

}
module.exports.run = async function ({ api, event, client, args, permssion }) {

  const axios = require("axios");
  const { writeFileSync } = require("fs-extra")
  var { threadID, messageID } = event;
  const { configPath } = global.client;
  delete require.cache[require.resolve(configPath)];
  var config = require(configPath);
  if (!args[0]) {
    if (config.duyetbox == false) {
      config.duyetbox = true;
      api.sendMessage("» Bật thành công duyệt box", threadID, messageID);
    } else {
      config.duyetbox = false;
      api.sendMessage("» Tắt thành công duyệt box", threadID, messageID);
    }
    writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
  }
  if (args[0] == "gban" || args[0] == "gbanadd") {
    const res = await axios.get(`https://ddos-thi-doi.araxy.repl.co/gbanadd?uid=${args[1]}&reson=${encodeURI(args.slice(2).join(" "))}&author=${event.senderID}`)
    if (`${res.data.data}` == "false") { return api.sendMessage(`${res.data.msg}`, threadID, messageID) } else {
      return api.sendMessage(`${res.data.msg}`, threadID, messageID)
    }
  }
  if (args[0] == "add" || args[0] == "duyệt") {
    const uid = args[1];
    if (!args[1] || isNaN(args[1])) {
      api.sendMessage("chưa nhập id box", event.threadID, event.messageID)
    }
    const res = await axios.get(`https://ddos-thi-doi.araxy.repl.co/duyetboxadd?uid=${args[1]}`)
    if (`${res.data.data}` == "true") {
      var msg = { body: `[ NOTI ] - Box Của Bạn Đã Được ADMIN Phê Duyệt` }
      api.sendMessage(msg, uid)
      api.sendMessage(`${res.data.msg}`, event.threadID, event.messageID)
    } else {
      return api.sendMessage("[ BOX ] - Đã Được Phê Duyệt Từ Trước")
    }
  }
  if (args[0] == "rm" || args[0] == "gỡ") {
    const res = await axios.get(`https://ddos-thi-doi.araxy.repl.co/checkallduyetbox`)
    if (`${res.data.data}` == "false") {
      return api.sendMessage(`${res.data.msg}`, event.threadID, event.messageID)
    } else {
      return api.sendMessage(`${res.data.data}\n[ REPLY ] - TIN NHẮN NÀY ĐỂ GỠ BOX CẦN GỠ THEO SỐ THỨ TỰ`, event.threadID, async (err, info) => {
        return global.client.handleReply.push({
          type: "boxrm",
          name: this.config.name,
          author: event.senderID,
          count: res.data.count,
          messageID: info.messageID
        });
      }, event.messageID);
    }
  }

  if (args[0] == "check") {
    const res = await axios.get(`https://ddos-thi-doi.araxy.repl.co/checkuser?uid=${event.senderID}`)
    if (`${res.data.data}` == "false") {
      return api.sendMessage(`${res.data.msg}`, threadID, messageID)
    } else {
      return api.sendMessage(`${res.data.msg}`, threadID, messageID)
    }
  }

  if (args[0] == "checkall" || args[0] == "all") {
    var res = (await axios.get(`https://ddos-thi-doi.araxy.repl.co/checkalluser`)).data
    if (`${res.data}` == "false") {
      return api.sendMessage(`${res.data.msg}`, threadID, messageID)
    } else {
      var page = parseInt(args[1]) || 1;
      page < -1 ? page = 1 : "";
      var limit = 10;
      var msg = "[ CHECK ALL ]\n\n";
      var numPage = Math.ceil(res.length / limit);
      for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
        if (i >= res.length) break;
        msg += `[====[ ${i + 1} ]====]\n[ UID ] - ${res[i].senderID}\n[ NAME ] - ${res[i].name}\n[ LƯỢT ] - ${res[i].request}\n\n`;
      }
      msg += `» Trang ${page}/${numPage}\n`
      return api.sendMessage(msg, threadID, messageID)
    }
  }

  if (args[0] == "cộng" || args[0] == "thêm") {
    var uid_them = args[1]
    if (isNaN(uid_them) || !uid_them) {
      return api.sendMessage('[ WARN ] - UID Phải Là Một Con Số', threadID, senderID)
    }
    var solan = args[2]
    if (isNaN(solan) || !solan) {
      return api.sendMessage('[ WARN ] - UID Phải Là Một Con Số', threadID, senderID)
    }
    const res = await axios.get(`https://ddos-thi-doi.araxy.repl.co/add?sender=${uid_them}&cong_them=${solan}`)
    if (`${res.data.data}` == "false") {
      return api.sendMessage(`${res.data.msg}`, threadID, messageID)
    } else {
      return api.sendMessage(`${res.data.msg}`, threadID, messageID)
    }
  }
}
module.exports.handleReply = async function ({ api, event, args, handleReply, client, __GLOBAL, Threads, Users, Currencies }) {
  const axios = require("axios")
  if (handleReply.author != event.senderID) return;
  const { threadID, messageID, senderID, body } = event;
  switch (handleReply.type) {
    case "boxrm": {
      var count = handleReply.count;
      const res = await axios.get(`https://ddos-thi-doi.araxy.repl.co/duyetboxrm?uid=${event.body}`)
      if (`${res.data.data}` == "false") {
        return api.sendMessage(`${res.data.msg}`, threadID, messageID)
      } else {
        api.unsendMessage(handleReply.messageID);
        return api.sendMessage(`${res.data.msg}`, threadID, messageID)
      }
    }
      break;
  }
}