'use strict';
const rdPathName = Math.floor(Math.random() * 99999999999999);
module.exports.config = {
  name: "callad",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "NTKhang",
  description: "thông báo lỗi của bot đến admin hoặc góp ý",
  commandCategory: "quản lí nhóm",
  usages: "[lỗi gặp phải hoặc ý kiến]",
  cooldowns: 5,
};

module.exports.handleReply = async function({ api, args, event, handleReply, Users }) {
  const request = require('request');
  const fs = require('fs-extra');
  const axios = require('axios');
  const { threadID, senderID, messageID } = event;
  var nameUser = (await Users.getData(senderID)).name;
  var pathAttachment = [];
  if (event.attachments.length != 0) {
    var urlPath = event.attachments[0].url;
    var getURL = await request.get(urlPath);
    var pathname = getURL.uri.pathname;
    var ext = pathname.substring(pathname.lastIndexOf(".") + 1);
    var getdata = (await axios.get(`${urlPath}`, { responseType: 'arraybuffer' })).data;
    var path = __dirname + `${rdPathName}` + `.${ext}`;
    fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'));
    pathAttachment.push(fs.createReadStream(path))
  }
  switch (handleReply.type) {
    case "reply":
      {
        var idad = global.config.ADMINBOT && global.config.SUPERADMIN
        for (let ad of idad) {
          api.sendMessage({
            body: "📩Phản hồi từ " + nameUser + "\n\n" + event.body,
            attachment: pathAttachment || null
            //mentions: [{ id: senderID, tag: nameUser }]
          }, ad, (e, data) => global.client.handleReply.push({
            name: "callad",
            messageID: data.messageID,
            messID: messageID,
            author: senderID,
            id: threadID,
            type: "calladmin"
          }))
        }
      }
      break;
    case "calladmin":
      {
        api.sendMessage({
          body: `📩Tin nhắn từ admin đến bạn\n\n»💬Reply tin nhắn này để tiếp tục báo cáo về admin :\n\n${event.body}`,
          attachment: pathAttachment || null,

        },
          handleReply.id, (e, data) => global.client.handleReply.push({
            name: "callad",
            author: senderID,
            messageID: data.messageID,
            messID: messageID,
            type: "reply"
          }), handleReply.messID);
      }
      break;
  }
};

module.exports.run = async function({ api, event, Threads, args, Users }) {
  const request = require('request');
  const fs = require('fs-extra');
  const axios = require('axios');
  const { threadID, senderID, messageID } = event;
  if (!args[0]) return api.sendMessage("» Bạn chưa nhập nội dung cần báo cáo", threadID, messageID);
  let nameT = (await api.getThreadInfo(event.threadID)).name || "Tên không tồn tại";
  var nameUser = (await Users.getData(event.senderID)).name;
  var vanity = senderID;
  var urlSl = `Fb.com/${vanity}`;
  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss | DD/MM/YYYY");
  var formReport = `== Báo cáo từ:「${nameUser}」==\n\n» Box: ${nameT}\n» ID box: ${threadID}\n» ID use: ${senderID}\n» Fb url: ${urlSl}\n\n» Nội dung: ${args.join(" ")}\n\nTime: ${gio}`;
  if (event.type == "message_reply") {
    var urlPath = event.messageReply.attachments[0].url;
    var getURL = await request.get(urlPath);
    var pathname = getURL.uri.pathname;
    var ext = pathname.substring(pathname.lastIndexOf(".") + 1);
    let getdata = (await axios.get(`${urlPath}`, { responseType: 'arraybuffer' })).data;
    var path = __dirname + `${rdPathName}` + `.${ext}`;
    fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'));
    var formReportPath = {
      body: formReport,
      attachment: fs.createReadStream(path)
    }
    api.sendMessage(`» Vào ${gio}\n» Báo cáo của bạn đã được gửi đến các admin bot`, threadID, () => {
      var idad = global.config.ADMINBOT && global.config.SUPERADMIN
      for (let ad of idad) {
        api.sendMessage(formReportPath, ad, (error, info) => {
          if (error) { return } else
            global.client.handleReply.push({
              name: "callad",
              messageID: info.messageID,
              author: senderID,
              messID: messageID,
              id: threadID,
              url: urlSl,
              type: "calladmin"
            })
        });
      }
    });
  } else {
    api.sendMessage(`» Vào ${gio}\n» Báo cáo của bạn đã được gửi đến các admin bot`, threadID, () => {
      var idad = global.config.ADMINBOT
      var idad = global.config.SUPERADMIN
      for (let ad of idad) {
        api.sendMessage(formReport, ad, (error, info) => {
          if (error) { return } else
            global.client.handleReply.push({
              name: "callad",
              messageID: info.messageID,
              author: senderID,
              messID: messageID,
              id: threadID,
              url: urlSl,
              type: "calladmin"
            })
        });
      }
    });
  }
}