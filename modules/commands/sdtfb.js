module.exports.config = {
    name: "sdtfb",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "",
    commandCategory: "Other",
    usages: "[sdt]",
    cooldowns: 5
};
module.exports.run = async function ({ api, event, args, utils  })  {
const axios = global.nodemodule['axios'];  	
const link = args.join(" ");
if (!link) return api.sendMessage('nhập link fb vào đi đcm', event.threadID, event.messageID)
try {
const res = await axios.get(`https://www.phamvandienofficial.xyz/sdtfb?link=${link}`);
const sdtt = res.data.data.sdt;

return api.sendMessage(`» ${sdtt}`, event.threadID, event.messageID)
} catch {
            return api.sendMessage('không tìm thấy số điện thoại', event.threadID, event.messageID);
        }
}