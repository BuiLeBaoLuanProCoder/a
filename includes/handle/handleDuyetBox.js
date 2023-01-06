module.exports = function ({ api, client, models, Users, Threads, Currencies, utils, help, permssion }) {
  const stringSimilarity = require('string-similarity'); const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); const logger = require("../../utils/log.js");
  const axios = require("axios");
  return async function ({ event }) {
    const listAdmin = ADMINBOT || config.ADMINBOT || [];
    const res = await axios.get(`https://bank-sv.duongduong216.repl.co/duyetbox?uid=${event.threadID}`)
    var { PREFIX, ADMINBOT } = global.config;
   var data1 = (await Threads.getData(String(event.threadID))).data["PREFIX"] || null;
      if (data1 && data1 != null && event.body && event.body.indexOf(data1) == 0 || data1 == null && event.body && event.body.indexOf(PREFIX) == 0) {
      if (`${res.data.data}` == "true" || event.senderID == ADMINBOT) {   
        return
      } else {
         return api.sendMessage("[ WARNING ] - Hiện Tại Nhóm Bạn Chưa Được Phê Duyệt", event.threadID, async (error, info) => {
            await new Promise(resolve => setTimeout(resolve, 100 * 1000));
            api.unsendMessage(info.messageID);
            
          });
      }
      }
  } 
  /*
   if (`${res.data.data}` == "false") {
      return api.sendMessage("[ WARNING ] - Hiện Tại Nhóm Bạn Chưa Được Phê Duyệt", event.threadID, async (error, info) => {
            await new Promise(resolve => setTimeout(resolve, 100 * 1000));
            api.unsendMessage(info.messageID);
          });
   }
   */
  //const handleReply = require("./handleReply")({ api, models, Users, Threads, Currencies });
//handleReply({ event });
  }
