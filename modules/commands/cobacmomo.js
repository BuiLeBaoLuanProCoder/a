module.exports.config = {
    name: "chanlemomo",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Chẵn lẻ momoooo",
    commandCategory: "Cờ Bạc",
    usages: "[C/L/C2/L2]",
    cooldowns: 0
};

module.exports.run = async function ({api, event, args, Users, Currencies }) {
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
  const request = require("request")
    let { senderID, threadID, messageID } = event;
    if(!fs.existsSync(__dirname+'/cache/SplineSans-Medium.ttf')) { 
      let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=102B8O3_0vTn_zla13wzSzMa-vdTZOCmp&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/SplineSans-Medium.ttf", Buffer.from(getfont, "utf-8"));
    };
    if(!fs.existsSync(__dirname+'/cache/SplineSans.ttf')) { 
      let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1--V7DANKLsUx57zg8nLD4b5aiPfHcmwD&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/SplineSans.ttf", Buffer.from(getfont2, "utf-8"));
    };
    if (!fs.existsSync(__dirname + '/cache/clmm.png')) {
        request('https://i.imgur.com/pJNIBPb.png').pipe(fs.createWriteStream(__dirname + '/cache/clmm.png'));
      }
    const moment = require("moment-timezone");
    var time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm");
    var day = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
    var codeGD = String(Math.floor(Math.random() * (90000000000 - 1)) + 10000000000)
    var lastNumber = parseInt(codeGD.slice(-1))
    const { loadImage, createCanvas } = require("canvas");
    let path = __dirname + "/cache/comment.png";
    var coins = args[1]
    var content = args[0]
    if (!content){
        var msg = { body: "==== Hệ Thống Chẵn Lẻ Tài Xỉu Momo ====\nĐây Là Trung Tâm Cho Các Bạn Nâng Đôi Gia Sản Còn Phá Sản Thì Chịu Để Có Thể Tham Gia Chơi Nhân Đôi Tài Sản Thì Bạn Cần Nhập Các Lệnh Sau.\n»Chanlemomo [ C [ 2 , 4 , 6 , 8 ] | L [1 , 3 , 5 , 7 ] | C2 [ 0 , 2 , 4 , 6 , 8 ] | L2 [ 1 , 3 , 5 , 7 , 9 ] ] ! Đây Là Game Chẵn Lẻ Các Số Dưới Đây Là Các Số Cuối Mã GD Khi Bot Gửi Ảnh Nhé Nên Cố Mà Để Ý Khong Keu Bot Bip HiuHiu.\n»Chanlemomo [ T [ 5 , 6 , 7 , 8 ] | X [ 1 , 2 , 3 , 4 ] | T2 [ 5 , 6 , 7 , 8 , 9 ] | L2 [ 0 , 1 , 2 , 3 , 4 ] ] ! Đây Là Trò Tài Xỉu Dành Cho Mấy Fen Thích TaiXiu Hơn ChanLe.\n»Chanlemomo [ N1 [ 1 , 2 , 3 ] | N2 [ 4 , 5 , 6 ] | N3 [ 7 , 8 , 9 ] | N0 [ 0 ] ] ! Riêng Chơi Cái Này Có Thể Nâng Tài Sản Lên X3 Hoặc X5 =)) Sịt Thì Khóc Đi Nka Moaz :>.\n Hãy Tham Gia Đi Tục Ngữ Có Câu ( Đen Tình Đỏ Bạc ) Đen Tình Vô Đây Giải Sầu Nha :<."
, attachment : [
      fs.createReadStream(__dirname + "/cache/clmm.png")
    ]}
     return api.sendMessage(msg, threadID, messageID)
    }
    if (!coins) return api.sendMessage("Vui Lòng Nhập Tiền Cược!", threadID, messageID);
    var money = (await Currencies.getData(senderID)).money
    if(money < parseInt(coins)) return api.sendMessage('Hong Đủ Tiền Bé Ơi!', threadID, messageID);
    if(parseInt(coins) < 50) return api.sendMessage('Min 50 bé ơi!', threadID, messageID);
    if(parseInt(coins) > 1000000) return api.sendMessage('Max 1.000.000 Bé Ơi!', threadID, messageID);
    //check win
    var c = [2, 4, 6, 8]
    var l = [1, 3, 5, 7]
    var c2 = [0, 2, 4 ,6 ,8]
    var l2 = [1, 3, 5, 7, 9]
    var n1 = [1, 2, 3]
    var n2 = [4, 5, 6]
    var n3 = [7, 8, 9]
    var n0 =[0]
    var t = [5, 6, 7, 8]
    var x = [1, 2, 3, 4]
    var t2 = [5, 6, 7, 8, 9]
    var x2 = [0, 1, 2, 3, 4]
    var msg = ""
    switch (content.toLowerCase()) {
        case "c": {
            if(c.includes(lastNumber) == true) {
                msg += `»Bạn Đã Thắng!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Bạn Nhận Được x2.5 Tiền Cược!`
                await Currencies.increaseMoney(senderID, parseInt(coins * 1.5));
            }
            else {
                msg += `»Bạn Đã Thua!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Tiền Cược Mất!`
                await Currencies.decreaseMoney(senderID, parseInt(coins));
            }
            break;
       }
        case "l": {
            if(l.includes(lastNumber) == true) {
                msg += `»Bạn Đã Thắng!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Bạn Nhận Được x2.5 Tiền Cược!`
                await Currencies.increaseMoney(senderID, parseInt(coins * 1.5));
            }
            else {
                msg +=`»Bạn Đã Thua!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Tiền Cược Mất!`
                await Currencies.decreaseMoney(senderID, parseInt(coins));
            }
            break;
       }
        case "c2": {
            if(c2.includes(lastNumber) == true) {
                msg += `»Bạn Đã Thắng!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Bạn Nhận Được x2 Tiền Cược!`
                await Currencies.increaseMoney(senderID, parseInt(coins * 1));
            }
            else {
                msg += `»Bạn Đã Thua!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Tiền Cược Mất!`
                await Currencies.decreaseMoney(senderID, parseInt(coins));
            }
            break;
       }
        case "l2": {
            if(l2.includes(lastNumber) == true) {
                msg += `»Bạn Đã Thắng\nSố Cuối Mã GD Là: ${lastNumber}\n»Bạn Nhận Được x2 Tiền Cược!`
                await Currencies.increaseMoney(senderID, parseInt(coins * 1));
            }
            else {
                msg += `»Bạn Đã Thua!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Tiền Cược Mất!`
                await Currencies.decreaseMoney(senderID, parseInt(coins));
            }
            break;
       }
        case "n1": {
            if(n1.includes(lastNumber) == true) {
                msg += `»Bạn Đã Thắng!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Bạn Nhận Được x3 Tiền Cược!`
                await Currencies.increaseMoney(senderID, parseInt(coins * 2));
            }
            else {
                msg += `»Bạn Đã Thua!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Tiền Cược Mất!`
                await Currencies.decreaseMoney(senderID, parseInt(coins));
            }
            break;
       }
        case "n2": {
            if(n2.includes(lastNumber) == true) {
                msg += `»Bạn Đã Thắng!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Bạn Nhận Được x3 Tiền Cược!`
                await Currencies.increaseMoney(senderID, parseInt(coins * 2));
            }
            else {
                msg += `»Bạn Đã Thua!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Tiền Cược Mất!`
                await Currencies.decreaseMoney(senderID, parseInt(coins));
            }
            break;
        }
         case "n3": {
            if(n3.includes(lastNumber) == true) {
                msg += `»Bạn Đã Thắng!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Bạn Nhận Được x3 Tiền Cược!`
                await Currencies.increaseMoney(senderID, parseInt(coins * 2));
            }
            else {
                msg += `»Bạn Đã Thua!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Tiền Cược Mất!`
                await Currencies.decreaseMoney(senderID, parseInt(coins));
            }
            break;
        }
          case "n0": {
            if(n0.includes(lastNumber) == true) {
                msg += `»Bạn Đã Thắng!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Bạn Nhận Được x2,5 Tiền Cược!`
                await Currencies.increaseMoney(senderID, parseInt(coins * 1.5));
            }
            else {
                msg += `»Bạn Đã Thua!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Tiền Cược Mất!`
                await Currencies.decreaseMoney(senderID, parseInt(coins));
            }
            break;
        }
         case "t": {
            if(t.includes(lastNumber) == true) {
                msg += `»Bạn Đã Thắng!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Bạn Nhận Được x2,5 Tiền Cược!`
                await Currencies.increaseMoney(senderID, parseInt(coins * 1.5));
            }
            else {
                msg += `»Bạn Đã Thua!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Tiền Cược Mất!`
                await Currencies.decreaseMoney(senderID, parseInt(coins));
            }
            break;
        }
         case "x": {
            if(x.includes(lastNumber) == true) {
                msg += `»Bạn Đã Thắng!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Bạn Nhận Được x2,5 Tiền Cược!`
                await Currencies.increaseMoney(senderID, parseInt(coins * 1.5));
            }
            else {
                msg += `»Bạn Đã Thua!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Tiền Cược Mất!`
                await Currencies.decreaseMoney(senderID, parseInt(coins));
            }
            break;
        }
         case "t2": {
            if(t2.includes(lastNumber) == true) {
                msg += `»Bạn Đã Thắng!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Bạn Nhận Được x2 Tiền Cược!`
                await Currencies.increaseMoney(senderID, parseInt(coins * 1));
            }
            else {
                msg += `»Bạn Đã Thua!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Tiền Cược Mất!`
                await Currencies.decreaseMoney(senderID, parseInt(coins));
            }
            break;
        }
         case "x2": {
            if(x2.includes(lastNumber) == true) {
                msg += `»Bạn Đã Thắng\nSố Cuối Mã GD Là: ${lastNumber}\n»Bạn Nhận Được x5 Tiền Cược!`
                await Currencies.increaseMoney(senderID, parseInt(coins * 4));
            }
            else {
                msg += `»Bạn Đã Thua!\n»Số Cuối Mã GD Là: ${lastNumber}\n»Tiền Cược Mất!`
                await Currencies.decreaseMoney(senderID, parseInt(coins));
            }
            break;
        }
        default: {
            msg += `Sai Nội Dung!\nKhông Hoàn Tiền!`
            await Currencies.decreaseMoney(senderID, parseInt(coins));
        }
   }
    //xử lí canvas
    let bg = (await axios.get(`https://i.imgur.com/OUPC4iK.png`, {responseType: "arraybuffer" })).data;
    fs.writeFileSync(path, Buffer.from(bg, "utf-8"));
    let bgBase = await loadImage(path);
    let canvas = createCanvas(bgBase.width, bgBase.height);
    let ctx = canvas.getContext("2d");
    const Canvas = global.nodemodule["canvas"];
    ctx.drawImage(bgBase, 0, 0, canvas.width, canvas.height);
    Canvas.registerFont(__dirname+`/cache/SplineSans-Medium.ttf`, {
        family: "SplineSans-Medium"
    });
    Canvas.registerFont(__dirname+`/cache/SplineSans.ttf`, {
        family: "SplineSans"
    });
    ctx.font = "30px SplineSans-Medium";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "start";
    ctx.fillText('-' + coins.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ', 151, 201);
    ctx.font = "25px SplineSans";
    ctx.fillText(content, 64, 1080);
    ctx.font = "26px SplineSans-Medium";
    ctx.textAlign = "right";
    var info = await api.getUserInfo(event.senderID);
    var name = info[event.senderID].name
    ctx.fillText(name, 547, 816);
    ctx.fillStyle = "#FF00FF";
    ctx.font = "22px SplineSans-Medium";
    const data = [" 0993457888 ", " 0984444444 ", " 0992229333 ", " 059874444 " , " 0568777777 " , " 0764322222 "];
    var sdt = data[Math.floor(Math.random() * data.length)]
    ctx.fillText(`${sdt}`, 547, 884);
    ctx.font = "22px SplineSans";
    ctx.textAlign = "start";
    ctx.fillText(codeGD, 279, 240);
    ctx.fillStyle = "#000000";
    ctx.textAlign = "right";
    ctx.font = "22px SplineSans-Medium";
    ctx.fillText('Miễn phí', 547, 504);
    ctx.fillText('Ví MoMo', 547, 436);
    ctx.fillText(`${time} - ${day}`, 547, 367);
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(path, imageBuffer);
    //send
    return api.sendMessage({
            body: msg,
            attachment: fs.createReadStream(path)
        },
        threadID,
        () => fs.unlinkSync(path),
        messageID
    );
};