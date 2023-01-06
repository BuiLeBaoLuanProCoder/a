const money = 100 // tùy chỉnh
module.exports.config = {
  name: "ghenshin",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Araxxy",  
  description: "romdom ảnh về nhân vật game ghenshin",
  commandCategory: "Dành cho người dùng",
  usages: "image",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
}
module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
  var sotien = (await Currencies.getData(event.senderID)).money
 
  const { threadID, senderID, messageID } = event;
   if( sotien < money){
    return api.sendMessage(`Nghèo`,threadID, messageID)
  }
  return api.sendMessage(`🖼️Danh sách các ảnh hiện có\n👉 baal\n👉 yunjin\n👉 Yae\n👉 mona\n👉 yoimiya\n👉 hutao\n👉 ganyu\n[ REPLY ]`, threadID, (error, info) => {
          global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: senderID,
            messageID: info.messageID
          })
        })
    }
module.exports.handleReply = async function({
  args, event, Users, api, handleReply, Currencies
}) {
  const { threadID, messageID, senderID } = event;
  const axios = require("axios")
  const fs = require('fs-extra');
  const request = require('request')
  const dataMoney = await Currencies.getData(senderID);
  const moneyUser = dataMoney.money;
  var { author } = handleReply;
  if (event.senderID != author) return api.sendMessage("CÚT", event.threadID, event.messageID);
  switch (handleReply.type) {
    case "choosee": {
      switch (event.body) {
        case "1":{
          axios.get('https://mona.feedheavens.repl.co').then(res => {
  var image = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `mona nè <3\n- ${money} đô`,
            attachment: fs.createReadStream(__dirname + `/cache/araxy.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/araxy.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/araxy.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: moneyUser - money})
      })
        break;
        }
        case "2":{
           axios.get('https://hutao.feedheavens.repl.co').then(res => {
  var image = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `Hutao nè <3\n- ${money} đô`,
            attachment: fs.createReadStream(__dirname + `/cache/araxy.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/araxy.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/araxy.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: moneyUser - moneyUser})
      })
          break;
        }
        case "3":{  axios.get('https://ganyu.feedheavens.repl.co').then(res => {
  var image = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `Ảnh Ganyu cho bạn đây\n- ${money} đô`,
            attachment: fs.createReadStream(__dirname + `/cache/araxy.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/araxy.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/araxy.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: moneyUser - money})
      })
          break;
        }
          case"4":{
             axios.get('https://yoimiya.feedheavens.repl.co').then(res => {
  var image = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `yoimiya nè <3\n- ${money} đô`,
            attachment: fs.createReadStream(__dirname + `/cache/araxy.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/araxy.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/araxy.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: moneyUser - money})
      })
            break;
          }
        case "5":{
           axios.get('https://Yunjin.feedheavens.repl.co').then(res => {
  var image = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `Yunjin nè <3\n- ${money} đô`,
            attachment: fs.createReadStream(__dirname + `/cache/araxy.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/araxy.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/araxy.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: moneyUser - money})
      })
          break;
        }
          case"6":{
             axios.get('https://Raiden-Shogun.feedheavens.repl.co').then(res => {
  var image = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `Raiden shotgun nè <3\n- ${money} đô`,
            attachment: fs.createReadStream(__dirname + `/cache/araxy.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/araxy.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/araxy.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: moneyUser - money})
      })
          }
      }
    }
  }
}