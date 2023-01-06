module.exports.config = {
	name: "txcl",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "Chơi tài xỉu",
	commandCategory: "Economy",
	usages: "",
	cooldowns: 0
};		

 function gameboba(number) {
          if (number[0] === number[1] && number[1] === number[2]) {
            return true;
          } else {
            return false;
          }
        }
module.exports.run = async function ({ api, event, args, Currencies, Users }) {
		  const { threadID, messageID, senderID } = event;
  if (!args[0]) return api.sendMessage("nqu", threadID, messageID);
  const dataMoney = await Currencies.getData(senderID);
    const moneyUser = dataMoney.money;
  const choose = args[0]
    if (choose.toLowerCase() != 'tài' && choose.toLowerCase() != 'xỉu' && choose.toLowerCase() != 'chẵn' && choose.toLowerCase() != 'lẻ' && choose.toLowerCase() != 'boba' && choose.toLowerCase() != 'bộ ba') return api.sendMessage("nqu", threadID, messageID)
    const money = args[1]
    if (money < 50 || isNaN(money)) return api.sendMessage("Mức đặt cược của bạn không phù hợp hoặc dưới 50$!!!", threadID, messageID);
    if (moneyUser < money) return api.sendMessage(`Số dư bạn không đủ ${money}$ để có thể chơi`, threadID, messageID);
    const typ2 = ['chẵn', 'lẻ'];
  const random2 = typ2[Math.floor(Math.random() * typ2.length)];
   const typ = ['tài', 'xỉu'];
  const random = typ[Math.floor(Math.random() * typ.length)];  
   var tai = [4,5,6,7,8,9,10];
    var xiu =[11,12,13,14,15,16,17];
    var chan = [ 0, 2, 4, 6, 8];
    var le =[1, 3, 5, 7, 9];
  if (random == 'tài') {
    var defl_number = tai[Math.floor(Math.random() * tai.length)];
  }
  if (random == 'xỉu') {
    var defl_number = xiu[Math.floor(Math.random() * xiu.length)];
  }
  if (random2 == 'chẵn') {
    var defl_number2 = chan[Math.floor(Math.random() * chan.length)];
  }
  if (random2 == 'lẻ') {
    var defl_number2 = le[Math.floor(Math.random() * le.length)];
  }
  let number = [];
var i = 0;
for (i = 0; i < 3; i++) {
number[i] = Math.floor(Math.random() * 6) +1;
}
 if (choose == 'tài' || choose == 'xỉu') { 
if (choose == random) {
  	await Currencies.increaseMoney(senderID, parseInt(money * 2));
  return api.sendMessage(`[ CỜ BẠC ]\nbạn thắng bot lắc ra ${random} ${defl_number} bạn nhận được ${money * 2}`,event.threadID, event.messageID)
} else {
  	await Currencies.decreaseMoney(senderID, parseInt(money));
      return api.sendMessage(`[ CỜ BẠC ]\nbạn thua bot lắc ra ${random} ${defl_number} bạn mất ${money}`,event.threadID, event.messageID)}
 }
 if (choose == 'chẵn' || choose == 'lẻ') {
if (choose == random2) {
  	await Currencies.increaseMoney(senderID, parseInt(money * 2));
  return api.sendMessage(`[ CỜ BẠC ]\nbạn thắng bot lắc ra ${random2} ${defl_number2} bạn nhận được ${money * 2}`,event.threadID, event.messageID)
} else {
   await Currencies.decreaseMoney(senderID, parseInt(money));  
  return api.sendMessage(`[ CỜ BẠC ]\nbạn thua bot lắc ra ${random2} ${defl_number2} bạn mất ${money}`,event.threadID, event.messageID)}
 }
if (choose == 'bộba' || choose == 'boba') {
  if (gameboba(number) ) {
  	await Currencies.increaseMoney(senderID, parseInt(money * 2));
  api.sendMessage(`[ CỜ BẠC ]\nKết quả là một bộ ba: ${number[0]} - ${number[1]} - ${number[2]}\nBạn đã chọn Bộ ba, bạn đã thắng và nhận được ${money * 2} `, event.threadID, event.messageID);
					} else {
             await Currencies.decreaseMoney(senderID, parseInt(money));
						return api.sendMessage(`[ CỜ BẠC ]\nĐây không phải bộ ba: ${number[0]} - ${number[1]} - ${number[2]}\nBạn đã mất trắng số tiền là ${money}`, event.threadID, event.messageID);
					} 
}
}

