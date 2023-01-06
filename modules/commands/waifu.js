module.exports.config = {
  name: "waifu",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "tdunguwu",
  description: "request ảnh",
  commandCategory: "random-img",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "axios": "",
  }
};
module.exports.run = async function ({ event, api, args }) {
  const { threadID, messageID } = event;
  var reply = {
    body: "",
    attachment: (await global.nodemodule["axios"]({
      url: (await global.nodemodule["axios"]('https://api.waifu.pics/sfw/waifu')).data.url, //Nếu api dạng chatfuel thì là .data[0].data '-'
      method: "GET",
      responseType: "stream"
    })).data

  }
  return api.sendMessage(reply, threadID, messageID);
}