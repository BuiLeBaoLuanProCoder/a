module.exports.config = {
  name: "tub",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Araxy XD",
  description: "",
  commandCategory: "admin",
  usages: "",
  cooldowns: 2
};
module.exports.onLoad = () => {
console.log("big update cực mạnh")
const { existsSync, writeFileSync } = global.nodemodule["fs-extra"];
const { join } = global.nodemodule["path"];
const pathData = join(__dirname,'./../../time.json');
        if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
    }
module.exports.run = async({api, event, args}) => {
 const { threadID, messageID, senderID } = event;
 const { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');
  const { join } = require("path")
  const pathData = join(__dirname,'./../../time.json');
   var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
  if( args[0] > args[1] || args[0] > "23" || args[1] > "23"){
return api.sendMessage('Không Thể Thêm Thời Gian Như Bạn Yêu Cầu Xin Vui Lòng Thử Lại', threadID, messageID)
  }
  var jsondemo = dataJson.find(item => item.thread == threadID) || { thread: threadID, time_1: args[0], time_2: args[1]  };
   if (!dataJson.some(i => i.thread == threadID)) {
 dataJson.push(jsondemo);
  writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
     return api.sendMessage('Đã Thêm Thành Công', threadID, messageID)
   } else {
     return api.sendMessage('Box Của Bạn Đã Đặt Thời Gian Rồi Vui Lòng Dùng Callad Để Admin Sửa Lại', threadID, messageID)
   }
}