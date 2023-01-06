module.exports.config = {
  name: "box",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "tdunguwu",
  description: "thì là coi all box",
  commandCategory: "admin",
  usages: "",
  cooldowns: 2,
  envConfig: {
        cooldownTime: 0
    }
};
module.exports.run = async({event, api, Threads, Users, args, body, is, Currencies, permssion }) => {
	const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
	const { writeFileSync, readFileSync, createReadStream, unlinkSync, existsSync } = require("fs-extra");
	 const { configPath } = global.client;
    const { ADMINBOT } = global.config;
    const { userName } = global.data;
	 const { threadID, senderID, messageID } = event;
	if (args[0] == "info") {
		let threadInfo = await api.getThreadInfo(event.threadID);
      var gendernam = [];
      var gendernu = [];
      for (let z in threadInfo.userInfo) {
        var gioitinhone = threadInfo.userInfo[z].gender;
        if (gioitinhone == "MALE") {
          gendernam.push(gioitinhone)
        } else {
          gendernu.push(gioitinhone)
        }
      };
      let pathAva = __dirname + `/cache/1.png`;
      let img = (await axios.get(encodeURI(`${threadInfo.imageSrc}`), { responseType: "arraybuffer" })).data;
      writeFileSync(pathAva, Buffer.from(img, "utf-8"));

      var nam = gendernam.length;
      var nu = gendernu.length;
      let sex = threadInfo.approvalMode;
      var pd = sex == false ? "tắt" : sex == true ? "bật" : "Kh";
      if (img) {
        return api.sendMessage({ body: `=== InFo Box ===\n\n❄️ Tên nhóm: ${threadInfo.threadName}\n🧩 TID: ${event.threadID}\n🦋 Phê duyệt: ${pd}\n💸 Emoji: ${threadInfo.emoji}\n🍳 Thông tin: \n👻 ${event.participantIDs.length} thành viên và ${threadInfo.adminIDs.length} quản trị viên.\n🤷‍♀️ Gồm ${nam} nam và ${nu} nữ.\n📩 Tổng số tin nhắn: ${threadInfo.messageCount}.`, attachment: createReadStream(pathAva) }, event.threadID, () => unlinkSync(pathAva), event.messageID);
      } else { return api.sendMessage(`=== InFo Box ===\n\n❄️ Tên nhóm: ${threadInfo.threadName}\n🧩 TID: ${event.threadID}\n🦋 Phê duyệt: ${pd}\n💸 Emoji: ${threadInfo.emoji}\n🍳 Thông tin: \n🤨 Có ${event.participantIDs.length} thành viên và ${threadInfo.adminIDs.length} quản trị viên.\n🤷‍♀️ Gồm ${nam} nam và ${nu} nữ.\n📩 Tổng số tin nhắn: ${threadInfo.messageCount}.`, event.threadID, event.messageID) }
    
}
else if (args[0] == "id") {return api.sendMessage(`${event.threadID}`, event.threadID, event.messageID);
    }
else if (args[0] == "emoji") {
      if (!args[1]) return api.sendMessage(`» Vui lòng nhập emoji cần đổi`, event.threadID, event.messageID);
      const name = args[1] || event.messageReply.body;
      return api.changeThreadEmoji(name, event.threadID)
    }
else if (args[0] == "name") {
      if (!args[1]) return api.sendMessage(`» Vui lòng nhập tên box cẩn đổi`, event.threadID, event.messageID);
      var content = args.join(" ");
      var c = content.slice(4, 99) || event.messageReply.body;
      return api.setTitle(`${c} `, event.threadID);
    }
else if (args[0] == "image") {
      if (event.type !== "message_reply") return api.sendMessage("❌ Bạn phải reply một audio, video, ảnh nào đó", event.threadID, event.messageID);
      if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("❌ Bạn phải reply một audio, video, ảnh nào đó", event.threadID, event.messageID);
      if (event.messageReply.attachments.length > 1) return api.sendMessage(`Vui lòng reply chỉ một audio, video, ảnh!`, event.threadID, event.messageID);
      var callback = () => api.changeGroupImage(createReadStream(__dirname + "/cache/1.png"), event.threadID, () => unlinkSync(__dirname + "/cache/1.png"));
      return request(encodeURI(event.messageReply.attachments[0].url)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
     }
else if (args[0] == "admin") {if (!args[1]) return api.sendMessage(`» Vui lòng thêm các tag: [add/remove] [reply/tag] để thay đổi vai trò của người đó`, event.threadID, event.messageID);
      if (args[1] == 'add') {
        if (event.type == "message_reply") {
          var uid = event.messageReply.senderID
          var name = (await Users.getData(uid)).name
          api.changeAdminStatus(event.threadID, uid, true, editAdminsCallback)
          function editAdminsCallback(err) {
            if (err) return api.sendMessage("» Bot không đủ quyền hạn để thêm quản trị viên", event.threadID, event.messageID);
            return api.sendMessage(`» Đã thêm ${name} làm quản trị viên nhóm`, event.threadID, event.messageID);
          }
        }
        if (args.join().indexOf('@') !== -1) {
          var mentions = Object.keys(event.mentions)
          var name =  (await Users.getData(mentions)).name
          api.changeAdminStatus(event.threadID, mentions, true, editAdminsCallback)
          function editAdminsCallback(err) {
            if (err) return api.sendMessage("» Bot không đủ quyền hạn để thêm quản trị viên", event.threadID, event.messageID);
            return api.sendMessage(`» Đã thêm ${name} làm quản trị viên nhóm`, event.threadID, event.messageID);
          }
        } else return
      } else if (args[1] == 'rm' || args[1] == 'remove' || args[1] == 'del') {
        if (event.type == "message_reply") {
          var uid = event.messageReply.senderID
          var name =  (await Users.getData(uid)).name
          api.changeAdminStatus(event.threadID, uid, false, editAdminsCallback)
          function editAdminsCallback(err) {
            if (err) return api.sendMessage("» Bot không đủ quyền hạn để gỡ quản trị viên hoặc người dùng chưa là quản trị viên", event.threadID, event.messageID);
            return api.sendMessage(`» Đã gỡ vai trò quản trị viên của ${name} `, event.threadID, event.messageID);
          }
        }
        if (args.join().indexOf('@') !== -1) {
          var mentions = Object.keys(event.mentions)
          var name = (await Users.getData(mentions)).name
          api.changeAdminStatus(event.threadID, mentions, false, editAdminsCallback)
          function editAdminsCallback(err) {
            if (err) return api.sendMessage("» Bot không đủ quyền hạn để gỡ quản trị viên hoặc người dùng chưa là quản trị viên", event.threadID, event.messageID);
            return api.sendMessage(`» Đã gỡ vai trò quản trị viên của ${name} `, event.threadID, event.messageID);
          }
		  }
      }
    }
else if (args[0] == "time") {
	var data = (await axios.get("https://le31.glitch.me/other/poem")).data;
  //câu ca dao
  var cadao = data.data
  //ngày giờ
  const moment = require('moment-timezone');
    var ngay = moment.tz('Asia/Ho_Chi_Minh').format('D/MM/YYYY');
    var gio = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');
    var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  //âm lịch (chưa có :))
  if (thu == 'Sunday') thu = 'Chủ Nhật'
  if (thu == 'Monday') thu = 'Thứ Hai'
  if (thu == 'Tuesday') thu = 'Thứ Ba'
  if (thu == 'Wednesday') thu = 'Thứ Tư'
  if (thu == "Thursday") thu = 'Thứ Năm'
  if (thu == 'Friday') thu = 'Thứ Sáu'
  if (thu == 'Saturday') thu = 'Thứ Bảy'
return api.sendMessage(`Ngày: ${ngay} (${thu})\nGiờ: ${gio}\n\nCa dao: ${cadao}..`, event.threadID, event.messageID);
}
else if (args[0] == "car") { 
	axios.get('https://api.popcat.xyz/car').then(res => {
  let ext = res.data.image.substring(res.data.image.lastIndexOf(".") + 1);
  let count = res.data.title;
  let callback = function () {
          api.sendMessage({
            body: `${count}`,
            attachment: fs.createReadStream(__dirname + `/cache/car.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/car.${ext}`), event.messageID);
        };
        request(res.data.image).pipe(fs.createWriteStream(__dirname + `/cache/car.${ext}`)).on("close", callback);
      })
}
else if (args[0] == "yaytext") {
	var content = args.join(" ").toLowerCase();;
    let msgtext = content.replace(/a/g, "𝒂").replace(/ạ/g, "𝒂̣").replace(/à/g, "𝒂̀").replace(/ả/g, "𝒂̉").replace(/á/g,"𝒂́").replace(/ắ/g, "𝒂̆́").replace(/ằ/g, "𝒂̆̀").replace(/ă/g, "𝒂̆").replace(/q/g, "𝒒").replace(/w/g, "𝒘").replace(/e/g, "𝒆").replace(/ể/g, "𝒆̂̉").replace(/ế/g, "𝒆̂́").replace(/ẹ/g, "𝒆̣").replace(/ê/g, "𝒆̂").replace(/ề/g, "𝒆̂̀").replace(/r/g, "𝒓").replace(/t/g, "𝒕").replace(/ỵ/g, "𝒚̣").replace(/y/g, "𝒚").replace(/ỷ/g, "𝒚̉").replace(/ỳ/g, "𝒚̀").replace(/u/g, "𝒖").replace(/ủ/g, "𝒖̉").replace(/ù/g, "𝒖̀").replace(/ú/g, "𝒖́").replace(/ụ/g, "𝒖̣").replace(/i/g, "𝒊").replace(/í/g, "𝒊́").replace(/ì/g, "𝒊̀").replace(/ị/g, "𝒊̣").replace(/o/g, "𝒐").replace(/ỏ/g, "𝒐̉").replace(/ò/g, "𝒐̀").replace(/ó/g, "𝒐́").replace(/ô/g, "𝒐̂").replace(/ồ/g, "𝒐̂̀").replace(/ố/g, "𝒐̂́").replace(/ổ/g, "𝒐̂̉").replace(/ố/g, "𝒐̂́").replace(/p/g, "𝒑").replace(/s/g, "𝒔").replace(/d/g, "𝒅").replace(/đ/g, "đ").replace(/f/g, "𝒇").replace(/g/g, "𝒈").replace(/h/g, "𝒉").replace(/j/g, "𝒋").replace(/k/g, "𝒌").replace(/l/g, "𝒍").replace(/z/g, "𝒛").replace(/x/g, "𝒙").replace(/c/g, "𝒄").replace(/v/g, "𝒗").replace(/b/g, "𝒃").replace(/n/g, "𝒏").replace(/m/g, "𝒎");
    return api.sendMessage(msgtext, threadID,messageID);
}
else if (args[0] == "cadao") {
	const res = await axios.get(`https://raw.githubusercontent.com/HerokeyVN/API_Date/main/CaDao.js`);
  const dataCadao = res.data.data;

  const values = Object.values(dataCadao)
  const rdCadao = values[Math.floor(Math.random() * values.length)]
const anh = await axios.get(`https://apikanna.khoahoang2.repl.co`);
var gai = anh.data.data.substring(anh.data.data.lastIndexOf(".") + 1);

let callback = function () {
    api.sendMessage({
    body: `❤️ Ca Dao Việt Nam ❤️\n\n${rdCadao} `,
    attachment: fs.createReadStream(__dirname + `/cache/gaicadao.${gai}`)
   }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/gaicadao.${gai}`), event.messageID);
   };
   request(anh.data.data).pipe(fs.createWriteStream(__dirname + `/cache/gaicadao.${gai}`)).on("close", callback);
}
else if (args[0] == "work") {
	const { threadID, messageID, senderID } = event;
    
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.workTime) > 0) {
        var time = cooldown - (Date.now() - data.workTime),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0);
        
		return api.sendMessage(`Bạn đang trong thời gian chờ\nVui lòng thử lại sau: ${minutes} phút ${(seconds < 10 ? "0" : "")}${seconds} giây!`, event.threadID, event.messageID);
    }
    else {
        const job = [
            "đi bán vé số",
            "đi sửa xe",
			"hắc cu",
			"bợ đít tdung muhahahahhahâhahahahâhaha",
			"bucu hwy hwang",
			"giả làm gái alimu",
            "làm nhân viên lập trình",
            "đi hack facebook",
            "làm thợ sửa ống nước ( ͡° ͜ʖ ͡°)",
            "làm đầu bếp",
            "làm thợ hồ",
            "fake taxi",
            "đi gangbang người khác",
            "làm re sờ chym mờ",
            "đi bán hàng online",
            "làm nội trợ",
            "đi vả mấy thằng sao đỏ, giun vàng",
            "đi bán hoa",
            "tìm jav/hentai code cho Nghĩa",
            "đi chơi Yasuo trong rank và gánh team"
        ];
        const amount = Math.floor(Math.random() * 600);
        return api.sendMessage(`Bạn ${job[Math.floor(Math.random() * job.length)]} và đã nhận được số tiền là: ${amount} coins`, threadID, async () => {
            await Currencies.increaseMoney(senderID, parseInt(amount));
            data.workTime = Date.now();
            await Currencies.setData(event.senderID, { data });
            return;
        }, messageID);
    }     
}
else if (args[0] == "cave") {
	const { threadID, messageID, senderID } = event;
    
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.workTime) > 0) {
        var time = cooldown - (Date.now() - data.workTime),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0);
        
		return api.sendMessage(`Bạn đã làm đĩ rồi hãy làm lại sau ${(seconds < 10 ? "0" : "")}${seconds} giây để giữ sức!`, event.threadID, event.messageID);
    }
    else {
        const job = [
            "làm đĩ"
        ];
        const amount = Math.floor(Math.random() * 600);
        return api.sendMessage(`Bạn đi làmm đĩ cho các daddy và đã nhận được số tiền là: ${amount} coins`, threadID, async () => {
            await Currencies.increaseMoney(senderID, parseInt(amount));
            data.workTime = Date.now();
            await Currencies.setData(event.senderID, { data });
            return;
        }, messageID);
    }     
}
else if (args[0] == "ghep") { 
	var data = await Currencies.getData(event.senderID);
  var money = data.money
  if (money < 0) api.sendMessage("Bạn cần 1000 đô cho 1 lần ghép hãy tích cực làm việc hoặc xin admin bot!\nCó làm mới có ăn🤑", event.threadID, event.messageID)
  else {
    var tl = ['21%', '67%', '19%', '37%', '17%', '96%', '52%', '62%', '76%', '83%', '100%', '99%', "0%", "48%"];
    var tle = tl[Math.floor(Math.random() * tl.length)];
    let dataa = await api.getUserInfo(event.senderID);
    let namee = await dataa[event.senderID].name
    let loz = await api.getThreadInfo(event.threadID);
    var emoji = loz.participantIDs;
    var id = emoji[Math.floor(Math.random() * emoji.length)];
    let data = await api.getUserInfo(id);
    let name = await data[id].name
    var arraytag = [];
    arraytag.push({ id: event.senderID, tag: namee });
    arraytag.push({ id: id, tag: name });
    api.changeNickname(`Con vợ của ${name}`, event.threadID, event.senderID);
    api.changeNickname(`Thằng chồng của ${namee}`, event.threadID, id);
    var sex = await data[id].gender;
    var gender = sex == 2 ? "Nam🧑" : sex == 1 ? "Nữ👩‍🦰" : "Trần Đức Bo";
    Currencies.setData(event.senderID, options = { money: money - 0 })
    let Avatar = (await axios.get(`https://le31.glitch.me/fb/avt?q=${id}`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/avt.png", Buffer.from(Avatar, "utf-8"));
    let Avatar2 = (await axios.get(`https://le31.glitch.me/fb/avt?q=${event.senderID}`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8"));
    var imglove = [];
    imglove.push(fs.createReadStream(__dirname + "/cache/avt.png"));
    imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));
    var msg = { body: `Hoàn thanh ghép đôi người ghép đôi với bạn có giới tính: ${gender}\nTỉ lệ hợp đôi: ${tle}\n` + namee + " " + "💓" + " " + name, mentions: arraytag, attachment: imglove }
    return api.sendMessage(msg, event.threadID, event.messageID)
  }
}
else if (args[0] == "noel") {  var now = new Date();
        var xmasDay = new Date(now.getFullYear(),11,25);
        var offset = xmasDay.getTime() - now.getTime();
        var days = Math.floor(offset/1000/60/60/24);
        offset-= days*1000*60*60*24;
        var hours = Math.floor(offset/1000/60/60);
        offset-= hours*1000*60*60;
        var minutes = Math.floor(offset/1000/60);
        offset-= minutes*1000*60;
        var second = Math.floor(offset/1000);
        return api.sendMessage("",event.threadID, () => api.sendMessage(`Còn ${days} ngày ${hours} giờ ${minutes} phút ${second} giây là tới NOEL bạn đã có bồ chưa ? `, event.threadID, event.messageID));
 }
 else if (args[0] == "upt") { 
	 const time = process.uptime(),
    days = Math.floor(time / (3600 * 24)),
    hours = Math.floor(time % (3600 * 24) / 3600),
    minutes = Math.floor((time / 60) % 60),
    seconds = Math.floor(time % 60);

  return api.sendMessage([days, hours, minutes, seconds].map(v => (v < 10 ? "0" + v : v)).filter((v, i) => v !== "00" || i > 0).join(":"), event.threadID, event.messageID);
}
else if (args[0] == "checknude") {var linkanh =  event.messageReply.attachments[0].url || args.join(" ");
	if(!linkanh) return api.sendMessage('Vui lòng reply hoặc nhập link 1 hình ảnh!!!', event.threadID, event.messageID)
const res = await axios.get(`https://www.phamvandienofficial.xyz/nude?key=wltOzZ4tD7&link=${encodeURIComponent(linkanh)}`);    
var img = res.data.NSFW_Prob;
    return api.sendMessage(`tỷ lệ nude của ảnh là: ${img}`, event.threadID, event.messageID);
	
}
else if (args[0] == "imgur") {
	var linkanh = event.messageReply.attachments[0].url || args.join(" ");
	if(!linkanh) return api.sendMessage('Vui lòng reply hoặc nhập link 1 hình ảnh!!!', event.threadID, event.messageID)
const res = await axios.get(`https://www.phamvandienofficial.xyz/imgur?link=${encodeURIComponent(linkanh)}`);    
var img = res.data.uploaded.image;
    return api.sendMessage(`${img}`, event.threadID, event.messageID);
	
}
else if (args[0] == "onlyadmin") {
	const permission = `${global.config.ADMINBOT}`;
    if (!permission.includes(event.senderID)) return api.sendMessage("Quyền đéo có code cái lồn à?", event.threadID, event.messageID);
        if (config.adminOnly == false) {
          config.adminOnly = true;
          api.sendMessage("» Bật thành công admin only", threadID, messageID);
        } else {
          config.adminOnly = false;
          api.sendMessage("» Tắt thành công admin only", threadID, messageID);
        }
        }
	else if (args[0] == "petpet") {
		var linkUp = event.messageReply.attachments[0].url || args.join(" ");
	if(!linkUp) return api.sendMessage('Vui lòng reply hoặc nhập link 1 hình ảnh!!!', event.threadID, event.messageID)
	try {
		const res = await axios.get(`https://www.phamvandienofficial.xyz/imgur?link=${encodeURIComponent(linkUp)}`)
		const link = res.data.uploaded.image
		var img = (await axios.get(`https://api-ttk.tk/other/petpetgif?image=${link}`, { responseType: "arraybuffer" })).data;
		fs.writeFileSync(__dirname + `/cache/pet.gif`, Buffer.from(img, "utf-8"));
		return api.sendMessage({ body: `Uh pet`, attachment: fs.createReadStream(__dirname + `/cache/pet.gif`)}, event.threadID, () => 
		fs.unlinkSync(__dirname + `/cache/pet.gif`), event.messageID)
	} catch(e) {
		return api.sendMessage(e, event.threadID, event.messageID);
	}
}
else if (args[0] == "rdclor") {
	var color = ['196241301102133', '169463077092846', '2442142322678320', '234137870477637', '980963458735625', '175615189761153', '2136751179887052', '2058653964378557', '2129984390566328', '174636906462322', '1928399724138152', '417639218648241', '930060997172551', '164535220883264', '370940413392601', '205488546921017', '809305022860427'];
return api.changeThreadColor(color[Math.floor(Math.random() * color.length)], event.threadID)
}
else if (args[0] == "tds") {
	if(args.length == 1) api.sendMessage("Thiếu token tds ?",threadID,messageID)
           else{
           let res = await axios.get(encodeURI(`https://traodoisub.com/api/?fields=profile&access_token=${args[0]}`));
           console.log(res.data)
           var i = res.data;
           var ii = i.data;
           var msg = `🎄Tên tài khoản: ${ii.user}\n🐧Xu: ${ii.xu}\r\n[!] Dữ liệu được lấy từ traodoisub !`
           api.sendMessage(msg,threadID,messageID)
          }
       }
	   else if (args[0] == "setdatabox") {const { threadID } = event;
const { setData, getData } = Threads;
var inbox = await api.getThreadList(100, null, ['INBOX']);
  let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
  const lengthGroup = list.length
  for (var groupInfo of list) {
    console.log(`Đã cập nhật dữ liệu của box ID: ${groupInfo.threadID}`)
    var threadInfo = await api.getThreadInfo(groupInfo.threadID);
    threadInfo.threadName;
    await Threads.setData(groupInfo.threadID, { threadInfo });
  }
    console.log(`Đã cập nhật dữ liệu của ${lengthGroup} box`)
    return api.sendMessage(`Đã cập nhật dữ liệu của ${lengthGroup} box`, threadID)
}
else if (args[0] == "setdatauser") {const { threadID, logMessageData } = event;
    const { setData, getData } = Users;
    var inbox = await api.getThreadList(100, null, ['INBOX']);
    let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
    for (var groupInfo of list) {
        var { participantIDs } = await Threads.getInfo(groupInfo.threadID) || await api.getThreadInfo(groupInfo.threadID);
        for (var id of participantIDs) {
            let data = await api.getUserInfo(id);
            data.name
            let userName = data[id].name
            await Users.setData(id, { name: userName, data: {} });
            console.log(`Đã cập nhật dữ liệu của ID: ${id}`)
        }
    }
    console.log(`Update successful!`)
    return api.sendMessage(`Successfully updated all user data!`, threadID)
}
else if (args[0] == "pairing") {
	if (!args[1]) {
            var ThreadInfo = await api.getThreadInfo(event.threadID);
            var all = ThreadInfo.userInfo
            let data = [];
            for (let u of all) {
                if (u.gender == "MALE") {
                 if ( u != event.senderID) data.push(u.id)   
                }
                if (u.gender == "FEMALE") {
                  if ( u != event.senderID) data.push(u.id)  
              }
            }
            console.log(data)
            if (data.length == 0) return api.sendMessage("Rất tiếc! Không tìm thấy nửa đời của bạn :(", event.threadID, event.messageID);
            let e = data[Math.floor(Math.random() * data.length)]
            let a = (Math.random() * 50)+50;
            var n = (await Users.getData(e)).name;
            const url = api.getCurrentUserID(e);
         
            let getAvatar = (await axios.get(`https://graph.facebook.com/${e}/picture?height=1500&width=1500&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/avt.png", Buffer.from(getAvatar, "utf-8") );
            api.sendMessage({ body: `⚡️Tìm Kiếm Nửa Kia Của Bạn\n⚡️Tên: ${n}\n⚡️Mối Quan Hệ: Độc Thân (có thể)\n⚡️Độ Phù Hợp: ${a.toFixed(2)}%\n⚡️ID: ${e}\n⚡️Profile: fb.me/${url}`,
                  attachment: fs.createReadStream(__dirname + `/cache/avt.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/avt.png`), event.messageID);
  }
  else {            
    var ThreadInfo = await api.getThreadInfo(event.threadID);
    var all = ThreadInfo.userInfo;
            let data = [];
      if(args[0] == "boy"){
            for (let u of all) {
        if (u.gender == "MALE") {
                if (u != event.senderID) data.push(u.id)   
                }
            }}  
     
      else if(args[0] == "girl"){
            for (let u of all) {
                if (u.gender == "FEMALE") {
                if (u != event.senderID) data.push(u.id)  
                }
            }}
            console.log(data)
                     
            if (data.length == 0) return api.sendMessage("⚡️Rất tiếc! Không tìm thấy nửa đời của bạn :(", event.threadID, event.messageID);
            let e = data[Math.floor(Math.random() * data.length)]
            let a = (Math.random() * 50)+50;
            var n = (await Users.getData(e)).name;
            const url = api.getCurrentUserID(e);
            let getAvatar = (await axios.get(`https://graph.facebook.com/${e}/picture?height=1500&width=1500&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/avt.png", Buffer.from(getAvatar, "utf-8") );
            api.sendMessage({ body: `⚡️Tìm Kiếm Nửa Kia Của Bạn\n⚡️Tên: ${n}\n⚡️Mối Quan Hệ: Độc Thân (có thể)\n⚡️Độ Phù Hợp: ${a.toFixed(2)}%\n⚡️ID: ${e}\n⚡️Profile: fb.me/${url}`,
                  attachment: fs.createReadStream(__dirname + `/cache/avt.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/avt.png`), event.messageID);}

}
else if (args[0] == "gif") {
	if (!args[1]) return api.sendMessage("Không tìm thấy tag bạn nhập", threadID, messageID);
	return request(`https://api.tenor.com/v1/random?key=73YIAOY3ACT1&q=${args[1]}&limit=1`, (err, response, body) => {
		if (err) throw err;
		var string = JSON.parse(body);
		var stringURL = string.results[0].media[0].tinygif.url;
		request(stringURL).pipe(fs.createWriteStream(__dirname + `/cache/randompic.gif`)).on("close", () => api.sendMessage({ attachment: fs.createReadStream(__dirname + "/cache/randompic.gif") }, threadID, () => fs.unlinkSync(__dirname + "/cache/randompic.gif"), messageID));
	});
}
else if (args[0] == "qtv") { var threadInfo = await api.getThreadInfo(event.threadID);
    let qtv = threadInfo.adminIDs.length;
    var listad = '';
    var qtv2 = threadInfo.adminIDs;
    dem = 1;
    for (let i = 0; i < qtv2.length; i++) {
        const info = (await api.getUserInfo(qtv2[i].id));
        const name = info[qtv2[i].id].name;
        listad += '' + `${dem++}` + '. ' + name + '\n';
    }

    api.sendMessage(
        `Danh sách ${qtv} quản trị viên gồm:\n${listad}`,event.threadID,event.messageID
    );

}
else if (args[0] == "listadm") {
	  const listAdmin = ADMINBOT || config.ADMINBOT || [];
            var msg = [];

            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                    const name = userName.get(idAdmin) || await Users.getNameUser(idAdmin);
                    msg.push(`- ${name}(https://facebook.com/${idAdmin})`);
                }
            }

            return api.sendMessage(`[Admin] Danh sách toàn bộ người điều hành bot: \n\n${msg.join("\n")}`, threadID, messageID);
        }
	else if (args[0] == "reset") {	
		const time = process.uptime();

	return api.sendMessage(`⏳ Em đang khởi động lại...\n${time}`, threadID, () => process.exit(1));
	}
else if (args[0] == "steal") {
	var alluser = global.data.allUserID
    let victim = alluser[Math.floor(Math.random() * alluser.length)];
    let nameVictim = (await Users.getData(victim)).name
    if (victim == global.data.botID && event.senderID == victim) return api.sendMessage('Rất tiếc, bạn không thể ăn cắp từ người này. Vui lòng thử lại.', event.threadID, event.messageID);
    var route = Math.floor(Math.random() * 2);
    if (route > 1 || route == 0) {
    const moneydb = (await Currencies.getData(victim)).money;
       var money = Math.floor(Math.random() * 1000) + 1;
        if (moneydb <= 0 || moneydb == undefined) return api.sendMessage(`Bạn vừa ăn cắp ${nameVictim} là một người nghèo. Vì vậy, bạn không có gì`, event.threadID, event.messageID);
        else if (moneydb >= money) return api.sendMessage(`Bạn vừa lấy trộm ${money} đô từ ${nameVictim} trong nhóm này`, event.threadID, async () => {
            await Currencies.increaseMoney(victim, parseInt("-"+money))
            await Currencies.increaseMoney(event.senderID, parseInt(money))
        }, event.messageID);
        else if (moneydb < money) return api.sendMessage(`Bạn vừa ăn cắp tất cả ${moneydb} số dư của ${nameVictim} trong nhóm này`, event.threadID, async () => {
            await Currencies.increaseMoney(victim, parseInt("-"+money))
            await Currencies.increaseMoney(event.senderID, parseInt(money))
        }, event.messageID);
    }
    else if (route == 1) {
        var name = (await Users.getData(event.senderID)).name
        var moneyuser = (await Currencies.getData(event.senderID)).money
            if (moneyuser <= 0) return api.sendMessage("Bạn không có tiền, HÃY LÀM VIỆC ĐỂ CÓ ĐƯỢC MỘT SỐ TIỀN LÀM VỐN.", event.threadID, event.messageID);
            else if (moneyuser > 0) return api.sendMessage(`Bạn đã bị bắt và mất ${moneyuser} đô.`, event.threadID, () => api.sendMessage({ body: `Xin chúc mừng  ${nameVictim}! Bạn đã bắt được ${name} và nhận được ${Math.floor(moneyuser / 2)} đô làm phần thưởng!`, mentions: [{ tag: nameVictim, id: victim }, { tag: name, id: event.senderID }] }, event.threadID, async () => {
                await Currencies.increaseMoney(event.senderID, parseInt("-"+ moneyuser)) 
                //await Currencies.increaseMoney(victim, parseInt(Math.floor(moneyuser / 2))) 
            }), event.messageID);
        
    }}
	else if (args.join() == "") { return api.sendMessage(`𝘽𝙖̣𝙣 𝙘𝙤́ 𝙩𝙝𝙚̂̉ 𝙙𝙪̀𝙣𝙜:\n1. ${global.config.PREFIX}box emoji [icon]\n2. ${global.config.PREFIX}box name [tên box cần đổi]\n3. ${global.config.PREFIX}box image [rep một ảnh bất kì cần đặt thành ảnh box]\n4.${global.config.PREFIX}box admin add/remove [reply/tag] => nó sẽ đưa/xoá qtv người được tag\n5. ${global.config.PREFIX}box id => Lấy ID nhóm\n6. ${global.config.PREFIX}box info => Toàn bộ thông tin của nhóm!\n7.${global.config.PREFIX}time: xem thời gian\n9.${global.config.PREFIX}Ca dao: xem ca dao\n10.${global.config.PREFIX}upt: uptime thôi\n11.${global.config.PREFIX}petpet: uk pet\n12.${global.config.PREFIX}imgur: up ảnh lên imgur\n12.${global.config.PREFIX}checknude: checknude\n13.${global.config.PREFIX}noel: noel thôi\n14.${global.config.PREFIX}work: just work \n15.${global.config.PREFIX}cave: đi làm đĩ\n16.${global.config.PREFIX}adminOnly: adminOnly\n17.${global.config.PREFIX}Car: xem ảnh xe\n18.${global.config.PREFIX}rdclor: random màu cho mess\n19.${global.config.PREFIX}tds: sem su tê đê éc\n20.${global.config.PREFIX}setdatabox: uk\n21.${global.config.PREFIX}setdatauser: uk\n22.${global.config.PREFIX}ghép: just ghép\n23.${global.config.PREFIX}pairing: kiếm nữa kia của b\n24.${global.config.PREFIX}gif: tìm gif\n25.${global.config.PREFIX}qtv: sem danh sách qtv\n26.${global.config.PREFIX}listqtv: sem danh sách admin\n28.${global.config.PREFIX}reset: khoi dong lai bot\n29.${global.config.PREFIX}steal: an trom thoi`, event.threadID, event.messageID);
  }
}