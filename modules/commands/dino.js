const axios = require("axios")
const fs = require('fs-extra');
const request = require('request')
module.exports.config = {
  name: "dino",
  version: "0.0.1",
  hasPermssion: 0,
  credits: "Rythilite XD",
  description: "soi cai mau lsenderID =))",
  commandCategory: "GÂME",
  usages: "",
  cooldowns: 0
};
module.exports.run = async function({ api, args, event, Users, permssion, Currencies }) {
  const { threadID, messageID , senderID } = event;
  var q = (await Users.getData(senderID)).name;
  if(!args[0]){
    const l = (await axios.get('https://dino-2.araxy.repl.co/play?uid=' + senderID)).data;
    if(l.status == false){
      return api.sendMessage('Etou có lẽ bạn chưa đăng ký tài khoản hoặc đã kiệt sức vui lòng thử lại sau', threadID, messageID)
    } else {
      return api.sendMessage(`Bạn thu thập được ${l.item}, với kích thước ${l.kich_thuoc} và thu được số tiền là ${l.sotien}`, threadID, messageID)
    }
  }
  if(args[0] == 'reg' || args[0] == "dangki" || args[0] == "taotaikhoan"){
  const l = (await axios.get('https://dino-2.araxy.repl.co/login?uid=' + senderID + '&name=' + `${encodeURI(q)}`)).data;
  if(l.data == true){ return api.sendMessage('Bạn đã đăng ký thành công đâm chém nhau thời khủng long làm việc để chăm chỉ kiếm tiền thôiii', threadID, messageID);
 }
  else {return api.sendMessage('Bạn đã từng đăng ký rồi vui lòng làm việc chăm chỉ để sinh tồn thôi =)))', threadID, messageID)
}
  }
if(args[0] == "change" || args[0] == "doivk"){
 const l = (await axios.get(`https://dino-2.araxy.repl.co/check_live?uid=${senderID}`)).data;
 if(l.status == false){ return api.sendMessage('Bạn chưa có tài khoản thì làm seo chơia âhahahah', threadID, messageID)}
  else{
 return api.sendMessage(`${l.msg} Bạn vui lòng reply tin nhắn này theo stt để chọn vũ khí`, threadID, (error, info) => {
          global.client.handleReply.push({
            type: "changevk",
            name: this.config.name,
            author: senderID,
            messageID: info.messageID
          })
        })
    }
  }
}
module.exports.handleReply = async function({
  args, event, Users, api: d, handleReply: e, Currencies: f
}) {
 const { threadID : x, messageID : y, senderID : senderID } = event;
  var q = (await Users.getData(senderID)).name;
  var { author: r} = e;
  if (senderID != r) return;
  switch (e.type) {
    case "changevk": {
      const l = (await axios.get(`https://dino-2.araxy.repl.co/change?uid=${senderID}&stt=${b.body}`)).data;
      if(l.status == "i"){
        return d.sendMessage('số của bạn lựa chọn không hợp lệ hoặc bạn chưa có tài khoản', x , y)
      } else {
        return d.sendMessage('Chọn Vũ Khí Thành Công', x , y)
      }
    }
  }
}