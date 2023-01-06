
module.exports.config = {
    name: "poke",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "Xem thông tin của 1 pokemon bất kì",
    commandCategory: "Tiện ích",
    usages: "[namePoke]",
    cooldowns: 5
};
module.exports.run = async function ({ api, event, args, utils  })  {
const axios = global.nodemodule['axios'];  
const request = global.nodemodule["request"];	
const res = await axios.get(`https://api.leoapi.xyz/fun/dadjoke`);
let jk = res.data.joke
return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=vi&dt=t&q=${jk}`), (err, response, body) => {
        if (err) return api.sendMessage("Đã có lỗi xảy ra!", event.threadID, event.messageID);
        var retrieve = JSON.parse(body);
        var text = '';
        retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
        var fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0]
return api.sendMessage(`
» ${text} \n -Joker- `, event.threadID, event.messageID)
})}