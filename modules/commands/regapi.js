module.exports.config = {
	name: "regapi",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "ARAXY UwU",
	description: "",
	commandCategory: "System",
	usages: "",
	cooldowns: 5
};

module.exports.run = async function({ api, event, args, Currencies, Users }) {
 const axios = require('axios');
var id = global.config.ADMINBOT;

  const res = (await axios.get('https://api.gintech.tk/apikey?type=register&name=' + api.getCurrentUserID())).data
  for(let ad of id ){
    if(res.success == 200){
      api.sendMessage('Api_Key Của Bạn Là:' + res.apikey, ad)
    } else {
      api.sendMessage('Key Đã Tồn Tại Vui Lòng Liên Hệ Với Author Api Để Biết Thêm Chi Tiết ', ad)
    }
  }
}