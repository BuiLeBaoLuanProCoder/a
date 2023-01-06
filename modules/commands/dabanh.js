const doi1 = ["Việt Nam", "Thái Lan", "Indo","Lào","Nhật Bản","Trung Quốc","Hàn Quốc","Nga","UZBEKISTAN","IRAN"]
//tự thêm ai gảnh đâu
const random1 = doi1[Math.floor(Math.random() * doi1.length)]
const random2 = doi1[Math.floor(Math.random() * doi1.length)]
if (random2 == random1) { return }
module.exports.config = {
  name: "dabong",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Araxy ?",
  description: "idk",
  commandCategory: "Game",
  usages: "[create/join/leave/start/end]",
  cooldowns: 0
};
module.exports.handleEvent = async function({
  api,
  event,
  Currencies
}) {
  const fs = require("fs-extra")
  const axios = require("axios")
  const {
    threadID,
    messageID,
    body,
    senderID
  } = event;
  if (!body) return;
  async function checkMoney(senderID, maxMoney) {
        var i, w;
        i = (await Currencies.getData(senderID)) || {};
        w = i.money || 0
        if (w < parseInt(maxMoney)) return false;
        else return true;
    }
  /*
  async function hiep1(doi1, doi2) {
    var doi1 = Math.floor(Math.random() * 9)
    var doi2 = Math.floor(Math.random() * 9)
    var msg1 = {
      body: `» Kết quả Hiệp 1 ${doi1} : ${doi2}`
    }
  }
  async function hiep2(doi1h2, doi2h2) {
    var doi1h2 = Math.floor(Math.random() * 9)
    var doi2h2 = Math.floor(Math.random() * 9)
    var msg2 = {
      body: `» Kết quả Hiệp 2 ${doi1h2} : ${doi2h2}`
    }
  }*/
  const choosee = body.split(" ")
  var doi1 = Math.floor(Math.random() * 5)
  var doi2 = Math.floor(Math.random() * 5)
  var doi1h2 = Math.floor(Math.random() * 5)
  var doi2h2 = Math.floor(Math.random() * 5)
  const tong1 = doi1 + doi1h2
  const tong2 = doi2 + doi2h2
  if (tong1 > tong2) {
    var araxy = random1
  } else if( tong1 < tong2 ) {
    var araxy = random2
  } else{
    var luanluu = [random1, random2]
    var doithang = luanluu[Math.floor(Math.random() * luanluu.length)]
    var araxy = doithang
  }
  var ketqua = [araxy]
  const typ = ["d1", "d2"]
  if (typ.includes(choosee[0]) == true) {
    if (!global.dabanh) return
    const gameThread = global.dabanh.get(threadID) || {};
    if (!gameThread) return;
    if (gameThread.start != true) return;
    if (!choosee[1]) return api.sendMessage('Vui lòng nhập số tiền cược!', threadID, messageID);
    if (await checkMoney(senderID, choosee[1]) == false) return api.sendMessage('Bạn không đủ tiền cược!', threadID, messageID)
    else {
      var playerGame = gameThread.player.length
      if (!gameThread.player.find(i => i.userID == senderID)) return;

      else {
        var s, q;
        var s = gameThread.player.findIndex(i => i.userID == senderID);
        var q = gameThread.player[s];
        if (q.choose.status == true) return api.sendMessage('⚠ Bạn đã chọn rồi không thể chọn lại!', threadID, messageID);
        else {
          if (typ.includes(choosee[0]) == true) {
            if(choosee[0] == "d1"){
              var link = random1
            } else if(choosee[0] == "d2") {
              var link = random2
            }
            gameThread.player.splice(s, 1);
            gameThread.player.push({
              name: q.name,
              userID: senderID,
              choose: {
                status: true,
                msg: link,
                money: parseInt(choosee[1])
              }
            });
            api.sendMessage(`👤 Người chơi ${q.name} đã chọn ${choosee[0]} với mức đặt cược ${choosee[1]}$`, threadID, messageID);
          }
          else  {
            gameThread.player.splice(s, 1);
            gameThread.player.push({ name: q.name, userID: senderID, choose: { status: true, msg: random2 } });
            api.sendMessage('👤 Người chơi ' + q.name + `  Đã Chọn ${choosee[0].toLowerCase()}`, threadID, messageID);
          }
          var vv = 0,
            vvv = gameThread.player.length;
          for (var c of gameThread.player) {
            if (c.choose.status == true) vv++;
          }
          if (vv == vvv) {
            var msg1 = {
              body: "» Đang Đá Hiệp 1"
            }
            api.sendMessage(msg1, threadID, async (error, info) => {
              await new Promise(resolve => setTimeout(resolve, 3000));
            }, messageID);
            api.sendMessage(`Hiệp 1 Đang Có Tỷ Số Là ${doi1} : ${doi2}`, threadID, async (error, info) => {
              await new Promise(resolve => setTimeout(resolve, 3000));
              api.sendMessage(`Hiệp 2 Đang Có Tỷ Số Là ${doi1h2} : ${doi2h2}`, threadID, async (error, info) => {
                await new Promise(resolve => setTimeout(resolve, 3000));
              })
                api.sendMessage(`Tổng Tỷ Số 2 Hiệp Là ${tong1} : ${tong2} và đội thắng là ${araxy}`, threadID, async (error, info) => {
                await new Promise(resolve => setTimeout(resolve, 3000));
            }, messageID);
            await new Promise(resolve => setTimeout(resolve, 3000));
            await checkWin(ketqua, gameThread);
          })} else return;
        }
      }
    }
    async function checkWin(ketqua, gameThread) {
      var checkwin = gameThread.player.filter(i => ketqua.includes(i.choose.msg) == true)
      var checklose = gameThread.player.filter(i => ketqua.includes(i.choose.msg) == false)
      var msg;
      if (checkwin.length != 0) {
        msg = '[====NHỮNG NGƯỜI THẮNG CUỘC====]\n'
        for (let i of checkwin) {
          var checkItem = ketqua.filter(a => a == i.choose.msg)
          console.log(checkItem)
          await Currencies.increaseMoney(i.userID, parseInt(i.choose.money) * checkItem.length);
          msg += `${i.name} đặt ${i.choose.msg} + ${parseInt(i.choose.money) * checkItem.length}$\n`
        }
      }
      if (checklose.length != 0) {
        msg += '\n[====NHỮNG NGƯỜI THUA CUỘC====]\n'
        for (let i of checklose) {
          await Currencies.decreaseMoney(i.userID, parseInt(i.choose.money));
          msg += `${i.name} đặt ${i.choose.msg} - ${i.choose.money}$\n`
        }
      }
      global.dabanh.delete(threadID);
      return api.sendMessage(msg, threadID, messageID);
    }
  }
}
module.exports.run = async function({ api, event, args, Threads, Users, Currencies }) {
  try {
    if (!global.dabanh) global.dabanh = new Map();
    const { threadID, messageID, senderID } = event;
    var gameThread = global.dabanh.get(threadID);
    switch (args[0]) {
      case "create":
      case "new":
      case "-c": {
        if (await checkMoney(senderID, 50) == false) return api.sendMessage('Yêu cầu có ít nhất 50$ để tham gia!', threadID, messageID)
        if (global.dabanh.has(threadID)) return api.sendMessage('⚠ Nhóm này đã được mở bàn game!', threadID, messageID);
        var name = await Users.getNameUser(senderID);
        global.dabanh.set(threadID, {
          box: threadID,
          start: false,
          author: senderID,
          player: [{
            name,
            userID: senderID,
            choose: {
              status: false,
              msg: null,
              money: null
            }
          }]
        });
        return api.sendMessage(`Tạo bàn chơi dabanh thành công!\n Giữa 2 Đội ${random1} vs ${random2}\n...dabanh join\n...dabanh start\n...dabanh leave\n...dabanh end`, threadID, messageID);
        break;
      }
      case "join":
      case "-j": {
        if (await checkMoney(senderID, 50) == false) return api.sendMessage('Yêu cầu có ít nhất 50$ để tham gia!', threadID, messageID)
        if (!global.dabanh.has(threadID)) return api.sendMessage('Không có bàn dabanh nào để tham gia!', threadID, messageID);
        if (gameThread.start == true) return api.sendMessage('Game đã bắt đầu trước đó!', threadID, messageID);
        if (gameThread.player.find(i => i.userID == senderID)) return api.sendMessage('Bạn đã tham gia trước đó rồi!', threadID, messageID);
        var name = await Users.getNameUser(senderID);
        gameThread.player.push({
          name,
          userID: senderID,
          choose: {
            stats: false,
            msg: null,
            money: null
          }
        });
        global.dabanh.set(threadID, gameThread);
        return api.sendMessage('Tham gia thành công!', threadID, messageID);
        break;
      }
      case "leave":
      case "-l'": {
        if (!global.dabanh.has(threadID)) return api.sendMessage('Không có bàn dabanh nào để rời khỏi!', threadID, messageID);
        if (!gameThread.player.find(i => i.userID == senderID)) return api.sendMessage('Bạn chưa tham gia nên không thể rời!', threadID, messageID);
        if (gameThread.start == true) return api.sendMessage('Game đã bắt đầu rồi, hơi muộn nha!', threadID, messageID);
        if (gameThread.author == senderID) {
          global.dabanh.delete(threadID);
          var name = await Users.getNameUser(senderID);
          return api.sendMessage('⚠ Bàn game đã được bắt đầu không thể rời!', threadID, messageID);
        } else {
          gameThread.player.splice(gameThread.player.findIndex(i => i.userID == senderID), 1);
          global.dabanh.set(threadID, gameThread);
          var name = await Users.getNameUser(senderID);
          api.sendMessage('Rời thành công!', threadID, messageID);
          return api.sendMessage(`${name} đã rời khỏi, số lượng người chơi còn lại là ${gameThread.player.length}`, threadID);
        }
        break;
      }
      case "start":
      case "-s": {
        if (!gameThread) return api.sendMessage('Không có bàn dabanh nào để bắt đầu!', threadID, messageID);
        if (gameThread.author != senderID) return api.sendMessage('Chỉ có người tạo mới có thể bắt đầu!', threadID, messageID);
        if (gameThread.player.length <= 1) return api.sendMessage('Số lượng người chơi phải từ 2 trở lên!', threadID, messageID);
        if (gameThread.start == true) return api.sendMessage('Game đã bắt đầu trước đó', threadID, messageID);
        gameThread.start = true;
        global.dabanh.set(threadID, gameThread);
        return api.sendMessage(`con cặc nhớ 2 đội là ${random1} và ${random2}`, threadID);
        break;
      }
      case "end":
      case "-e": {
        if (!gameThread) return api.sendMessage('Không có bàn dabanh nào để kết thúc!', threadID, messageID);
        if (gameThread.author != senderID) return api.sendMessage('Chỉ có người tạo mới có thể kết thúc!', threadID, messageID);
        global.dabanh.delete(threadID);
        return api.sendMessage(`Kết thúc thành công`, threadID, messageID);
        break;
      }
      default: {
        return api.sendMessage("⚠ BODY:\n- create/new/-c: Tạo bàn chơi dabanh\n- join/-j: Tham gia vào bàn dabanh\n- leave/-l: Rời khỏi bàn dabanh\n- start/-s: Bắt đầu bàn dabanh\n- end/-e: Kết thúc bàn dabanh", threadID, messageID);
      }
    }
  } catch (err) {
    return api.sendMessage(getText("error", err), event.threadID, event.messageID);
  }
  async function checkMoney(senderID, maxMoney) {
    var i, w;
    i = (await Currencies.getData(senderID)) || {};
    w = i.money || 0
    if (w < parseInt(maxMoney)) return false;
    else return true;
  }
}
