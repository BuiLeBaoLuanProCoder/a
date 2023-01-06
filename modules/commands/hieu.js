module.exports.config = {
	name: "hieu",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "",
	commandCategory: "Economy",
	usages: "",
	cooldowns: 0
};		

module.exports.run = async function ({ api, event, args, Currencies, Users }) {
		  const { threadID, messageID, senderID } = event;
      const x = Math.floor(Math.random() * 20);
      const y = Math.floor(Math.random() * 20);
      const dap_an = y - x;
      const choose = args[0];
      if(!choose || isNaN(choose) ){return api.sendMessage('nqu', threadID, messageID)}
     const money = args[1];
     const dataMoney = await Currencies.getData(senderID);
    const moneyUser = dataMoney.money;
    if (money < 50 || isNaN(money)) return api.sendMessage("Mức đặt cược của bạn không phù hợp hoặc dưới 50$!!!", threadID, messageID);
    if (moneyUser < money) return api.sendMessage(`Số dư bạn không đủ ${money}$ để có thể chơi`, threadID, messageID);
    if(choose == dap_an){
      await Currencies.increaseMoney(senderID, parseInt(money * 2));
  return api.sendMessage(`bạn thắng bạn chọn là: ${choose}\nsố thứ nhất bot chọn là: ${x}\nsố thứ nhất bot chọn là: ${y}\nhiệu số là ${dap_an}`,threadID, messageID)} else {
    await Currencies.decreaseMoney(senderID, parseInt(money));
  return api.sendMessage(`bạn thua bạn chọn là: ${choose}\nsố thứ nhất bot chọn là: ${x}\nsố thứ nhất bot chọn là: ${y}\nhiệu số là ${dap_an}`,threadID, messageID)
  }
}