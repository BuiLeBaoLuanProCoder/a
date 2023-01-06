
module.exports.config = {
  name: "timming",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "tdunguwu",
  description: "",
  commandCategory: "countdown",
  usages: "",
  cooldowns: 0
};
module.exports.run = async ({ api, event,args }) => {
  const axios = require("axios")
  let text = args.join(" ")
  if (!text) return api.sendMessage('Vui lòng nhập đúng định dạng [text1 -> text2 ]!', event.threadID, event.messageID);
  const text1 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("->")[0];
	if (!text1) return api.sendMessage('Vui lòng nhập đúng định dạng [text1 -> text2 ]!', event.threadID, event.messageID); 
  const text2 = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("->")[1];
  if (!text2) return api.sendMessage('Vui lòng nhập đúng định dạng [text1 -> text2 ]!', event.threadID, event.messageID); 
  const res = await axios.get(`https://le31.glitch.me/other/date-calculator?first=${text1}&second=${text2}`);
  const s = res.data;
  return api.sendMessage(`Số Năm: ${s.years}\nSố Tháng: ${s.months}\nSố Tuần: ${s.weeks}\nSố Ngày: ${s.days}\nSố Tiếng: ${s.hours}\nSố phút: ${s.minutes}\nSố Giây: ${s.seconds}`, event.threadID, event.messageID)
}