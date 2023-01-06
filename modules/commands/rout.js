module.exports.config = {
	name: "roul",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Chơi bầu cua",
	commandCategory: "Economy",
	usages: "roul [color] [money]",
	cooldowns: 10,
	
};		

module.exports.run = async ({ event, api, args, Currencies }) => {
  	var { threadID, messageID, senderID } = event
		    const moneydb = (await Currencies.getData(event.senderID)).money;
        if (moneydb == undefined) return api.sendMessage("Người dùng chưa tồn tại!", event.threadID, event.messageID);
				var color = args[0]
  				var money = args[1]
				if (!color || !money) return api.sendMessage(`[ ROUL ] Bạn chưa nhập thông tin đặt cược!`, threadID, messageID);
    		(money == "all") ? ((moneydb > 10000) ? money = 10000 : money = moneydb) : "";
				if (isNaN(money)) return api.sendMessage(`[ ROUL ] Số tiền đặt cược của bạn không phải là một con số, vui lòng xem lại cách sử dụng tại /help roul`, threadID, messageID);
				if (!money || !color) return api.sendMessage("[ ROUL ] Sai format", threadID, messageID);
				if (money > moneydb) return api.sendMessage(`[ ROUL ] Số tiền của bạn không đủ`, threadID, messageID);
    			if (money > 100000) return api.sendMessage(`[ ROUL ] Số tiền đặt cược của bạn quá khủng, tối đa là 100000 $!`, event.threadID, event.messageID);
				if (money < 200) return api.sendMessage(`[ ROUL ] Số tiền đặt cược của bạn quá nhỏ, tối thiểu là 200$`, threadID, messageID);
				var check = (num) => (num == 0) ? '😡' : (num % 2 == 0 && num % 6 != 0 && num % 10 != 0) ? '♥️' : (num % 3 == 0 && num % 6 != 0) ? '💚' : (num % 5 == 0 && num % 10 != 0) ? '💛' : (num % 10 == 0) ? '💜' : '🖤️';
				let random = Math.floor(Math.random() * 500);
				if (color == "o" || color == "cam") color = 0;
				else if (color == "r" || color == "đỏ") color = 1;
				else if (color == "g" || color == "xanh") color = 2;
				else if (color == "y" || color == "vàng") color = 3;
				else if (color == "v" || color == "tím") color = 4;
				else if (color == "b" || color == "đen") color = 5;
				else return api.sendMessage("[ ROUL ] Bạn chưa nhập thông tin cá cược!, đen [x0.5] đỏ [x1.25] xanh [x1.5] vàng [x1.75] tím [x2] cam [x4]", threadID, messageID);

        if (color == 0 && check(random) == '😡') api.sendMessage(`[ ROUL ]\nBạn đã chọn màu 😡, bạn đã thắng với số tiền được nhân lên 4: ${money * 4}$\nSố tiền hiện tại của bạn là: ${moneydb + (money * 4)}$.`, threadID, () => Currencies.increaseMoney(senderID, parseInt(money * 4)), messageID);
				else if (color == 1 && check(random) == '♥️') api.sendMessage(`[ ROUL ]\nBạn đã chọn màu ♥️, bạn đã thắng với số tiền nhân lên 2: ${money * 2}$\nSố tiền hiện tại của bạn là: ${moneydb + (money * 2)}$.`, threadID, () => Currencies.increaseMoney(senderID, parseInt(money * 2)), messageID);
				else if (color == 2 && check(random) == '💚') api.sendMessage(`[ ROUL ]\nBạn đã chọn màu 💚, bạn đã thắng với số tiền nhân lên 1: ${money * 1}$\nSố tiền hiện tại của bạn là: ${moneydb + (money * 1)}$.`, threadID, () => Currencies.increaseMoney(senderID, parseInt(money * 1)), messageID);
				else if (color == 3 && check(random) == '💛') api.sendMessage(`[ ROUL ]\nBạn đã chọn màu 💛, bạn đã thắng với số tiền nhân lên 0.75: ${money * 0.75}$\nSố tiền hiện tại của bạn là: ${moneydb + (money * 0.75)}$.`, threadID, () => Currencies.increaseMoney(senderID, parseInt(money * 0.75)), messageID);
				else if (color == 4 && check(random) == '💜') api.sendMessage(`[ ROUL ]\nBạn đã chọn màu 💜, bạn đã thắng với số tiền nhân lên 0.5: ${money *0.5}$\nSố tiền hiện tại của bạn là: ${moneydb + money *0.5}$.`, threadID, () => Currencies.increaseMoney(senderID, parseInt(money *0.5)), messageID);
				else if (color == 5 && check(random) == '🖤️') api.sendMessage(`[ ROUL ]\nBạn đã chọn màu 🖤️, bạn đã thắng với số tiền nhân lên 0.1: ${money * 0.1}$\nSố tiền hiện tại của bạn là: ${moneydb + (money * 0.1)}$.`, threadID, () => Currencies.increaseMoney(senderID, parseInt(money * 0.1)), messageID);
				else api.sendMessage(`[ ROUL ]\nMàu ${check(random)}\nBạn đã ra đê ở và mất trắng số tiền: ${money}$ :'(\nSố tiền hiện tại của bạn là: ${moneydb - money} $`, threadID, () => Currencies.decreaseMoney(senderID,  parseInt(money)), messageID);
}