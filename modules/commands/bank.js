    //big update cực mạnh =)))
    const laisuat = 0.005
    const timeIM = 12000
    module.exports.config = {
        name: "bank",
        version: "0.0.1",
        hasPermssion: 0,
        credits: "tdunguwu", 
        description: "",
        commandCategory: "Coins",
        usages: "",
        cooldowns: 5,
        };
       
    module.exports.onLoad = () => {
      console.log("big update cực mạnh")

        const { existsSync, writeFileSync } = global.nodemodule["fs-extra"];
        const { join } = global.nodemodule["path"];
        const pathData = join(__dirname, "cache", "bank.json");
        if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
    }
    module.exports.run = async ({ event, api, Currencies, args, Users, permssion }) => {
      var msg = [];
      const moment = require("moment-timezone");
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");    
  console.log(timeNow)
  var seconds = moment.tz("Asia/Ho_Chi_Minh").format("ss");
 

  const stk = String(Math.floor(Math.random() * (900000000)) + 1000000)
    const { threadID, messageID, senderID } = event;
    const { readFileSync, writeFileSync } = require("fs-extra");
    var lozz = (await Users.getData(senderID)).name
    const { join } = require("path")
    const pathData = join(__dirname, "cache", "bank.json");
    
    const user = (args.slice(1, args.length)).join(" ");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var userData = dataJson.find(item => item.senderID == senderID) || { senderID: senderID,  money: 200, stk: stk, abc: lozz };
    const moneyInput = parseInt(args[1])
    if(args[0] == '-r' || args[0] == 'register') {
        if (!dataJson.some(i => i.senderID == senderID)) {
        dataJson.push(userData);
        
        writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
        return api.sendMessage(`[ SUCCESS ] » Bạn đã đăng kí thành công, số tài khoản của bạn là ${stk}, chúng tôi cho bạn 200$ và sau đó bạn phải gửi ít nhất 200$ để có lãi💰`, threadID, messageID)
        }
    else return api.sendMessage(`[ WARNING ] » Bạn đã có tài khoản trên hệ thống MIRAI Bank🏦`, threadID, messageID)
    }
     if(args[0] == 'all' || args[0] == '-a') {
for (let stt in dataJson) {
        var title = dataJson[stt].stk;
        var abc = dataJson[stt].abc;
        var ulatroi = dataJson[stt].senderID;
      msg += `Chủ: ${abc}\nID: ${ulatroi} \nSTK: ${title}\n=====================\n`
    }
     return api.sendMessage({ body: msg }, event.threadID);
     }
    if(args[0] == 'check' || args[0] == 'coins') {
    if (dataJson.some(i => i.senderID == senderID) == false) return api.sendMessage('[ WARNING ] » Người dùng chưa đăng kí sử dụng banking, banking register để đăng kí🏦', threadID, messageID)
        else { 
        
        var userMoney = userData.money;
        var userStk = userData.stk;
        return api.sendMessage(`[ SUCCESS ] » Số tiền bạn đang gửi MIRAI Bank là: ${userMoney}$\n số tài khoản là: ${userStk}\n💷 Lãi: +${laisuat}% trong ${timeIM/60} phút`, threadID, messageID)
        }
    } 
    if(args[0] == 'gửi' || args[0] == 'send') {
    if (!args[1] || isNaN(args[1]) || parseInt(args[1]) < 50) return api.sendMessage("[ WARNING ] » Số tiền cần gửi phải là 1 con số và lớn hơn 50$💰", threadID, messageID);
    if (!dataJson.some(i => i.senderID == senderID)) {
        return api.sendMessage('[ WARNING ] » Người dùng chưa đăng kí sử dụng banking, banking register để đăng kí💰', threadID, messageID)
    }
    else { 
        console.log(userData);
        console.log(userData.money)
        const moneyy = (await Currencies.getData(senderID)).money;
        if(moneyy < moneyInput) return api.sendMessage(`[ WARNING ] » Số dư không đủ ${moneyInput} để gửi vào MIRAI Bank💰 `, threadID, messageID)
        var money = userData.money;
        userData.money = parseInt(money) + parseInt(moneyInput);
        writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
        await Currencies.decreaseMoney(event.senderID, parseInt(moneyInput))
        
        return api.sendMessage(`[ SUCCESS ] » Bạn đã gửi ${moneyInput}$ vào MIRAI Bank\n💷 Lãi: +${laisuat}% trong ${timeIM/60} phút`, threadID, messageID)
        }
    }
    if(args[0] == 'find' || args[0] == '-f') {
var userStk = dataJson.find(i => i.stk == args[1])
    if (dataJson.some(i => i.stk == args[1]) == false) return api.sendMessage('[ WARNING ] » Người dùng chưa đăng kí sử dụng banking, banking register để đăng kí🏦', threadID, messageID)
        else { 
        var userName = userStk.abc;
        var userMoney = userStk.money;
        var userStkkk = userStk.stk;
        return api.sendMessage(`[ KIỂM TRA ]\n»Tên Chủ: ${userName}\n» Số tiền bạn đang gửi MIRAI Bank là: ${userMoney}$\n» Số tài khoản là: ${userStkkk}\n======= ${timeNow} =======`, threadID, messageID)
        }
    } 
 if (args[0] == 'rút' || args[0] == 'lấy') { 
        if (!args[1] || isNaN(args[1]) || parseInt(args[1]) < 50) return api.sendMessage("[ WARNING ] » Số tiền cần rút phải là 1 con số và lớn hơn 50$", threadID, messageID);
        if (!dataJson.some(i => i.senderID == senderID)) {
        return api.sendMessage('[ WARNING ] » Người dùng chưa đăng kí sử dụng banking, banking register để đăng kí', threadID, messageID)
        }
    else {  
        
        var money = userData.money;
        if(parseInt(money) < parseInt(moneyInput)) return api.sendMessage('[ WARNING ] » Số dư của bạn không đủ để thực hiện giao dịch này!', threadID, messageID)
        else {
            await Currencies.increaseMoney(event.senderID, parseInt(moneyInput))
            userData.money = parseInt(money) - parseInt(moneyInput)
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            return api.sendMessage(`[ SUCCESS ] » Rút thành công ${parseInt(moneyInput)}$, số dư còn lại là ${parseInt(money) - parseInt(moneyInput)}$`, threadID, messageID)
        }
        }
    }
  if(args[0] == 'pay') {  
    var userData = dataJson.find(item => item.senderID == senderID)
    var userStk = dataJson.find(i => i.stk == args[2])
    if (dataJson.some(i => i.stk == args[2]) == false) return api.sendMessage('[ WARNING ] » Người dùng chưa đăng kí sử dụng banking, banking register để đăng kí🏦', threadID, messageID)
      if (!args[1] || isNaN(args[1]) || parseInt(args[1]) < 50) return api.sendMessage("[ WARNING ] » Số tiền cần rút phải là 1 con số và lớn hơn 50$", threadID, messageID);
    else {  
        var money = userData.money;
        var lmao = userStk.money
        if(parseInt(money) < parseInt(moneyInput)) return api.sendMessage('[ WARNING ] » Số dư của bạn không đủ để thực hiện giao dịch này!', threadID, messageID)
        else {
            userStk.money = parseInt(lmao) + parseInt(moneyInput);
     
            userData.money = parseInt(money) - parseInt(moneyInput)
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            return api.sendMessage(`[ SUCCESS ] » Pay thành công ${parseInt(moneyInput)}$, số dư còn lại là ${parseInt(money) - parseInt(moneyInput)}$`, threadID, messageID)
        }
        }
    }  

    else return api.sendMessage(`=====🏦MIRAI BANK🏦=====\n\n[-r/register] - Đăng kí gửi tiền tại MIRAI Bank💹\n[check/coins] - Xem số tiền trong MIRAI Bank💳\n[gửi/send] - Gửi tiền vào MIRAI Bank💷\n[rút] - Rút tiền từ MIRAI Bank💰\n\n💲 Lãi suất hiện tại: +${laisuat}% trong ${timeIM/60} phút`, threadID, messageID)
    }
 async function bank() {
const { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');
const { join, resolve } = require('path');
const pathData = join(__dirname, "cache", "bank.json");
const user = require('./cache/bank.json');

	if(user[0] == undefined ) return
	while(true) {
	for (let id of user) {
	var userData = user.find(i => i.senderID == id.senderID);
	var money = userData.money;
	userData.money = (parseInt(money + money * laisuat ))
	writeFileSync(pathData, JSON.stringify(user, null, 2));
	}
	console.log("DANG XU LI BANKING");
  console.log("big update cực mạnh")
	await new Promise(resolve => setTimeout(resolve, `${timeIM}` * 1000))
	}
}
 bank();
 /*
  if(args[0] == 'pay') {  
    var userStk = dataJson.find(i => i.stk == args[1])
    if (dataJson.some(i => i.stk == args[1]) == false) return api.sendMessage('[ WARNING ] » Người dùng chưa đăng kí sử dụng banking, banking register để đăng kí🏦', threadID, messageID)
        else { 
      if (!args[2] || isNaN(args[2]) || parseInt(args[2]) < 50) return api.sendMessage("[ WARNING ] » Số tiền cần rút phải là 1 con số và lớn hơn 50$", threadID, messageID);
       var userStk = dataJson.find(i => i.stk == args[1])
    if (dataJson.some(i => i.stk == args[1]) == false) {return api.sendMessage('[ WARNING ] » Người dùng chưa đăng kí sử dụng banking, banking register để đăng kí🏦', threadID, messageID)}
    else {  
        
        var money = userData.money;
        if(parseInt(money) < parseInt(moneyInput)) return api.sendMessage('[ WARNING ] » Số dư của bạn không đủ để thực hiện giao dịch này!', threadID, messageID)
        else {
            userData.money = parseInt(money) + parseInt(moneyInput);
     
            userData.money = parseInt(money) - parseInt(moneyInput)
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            return api.sendMessage(`[ SUCCESS ] » Pay thành công ${parseInt(moneyInput)}$, số dư còn lại là ${parseInt(money) - parseInt(moneyInput)}$`, threadID, messageID)
        }
        }
    }
    }
 */