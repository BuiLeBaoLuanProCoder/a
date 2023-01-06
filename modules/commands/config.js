module.exports.config = {
    name: "config",
    version: "1.0.3",
    hasPermssion: 0,
    credits: "Thiệu Trung Kiên",
    description: "Command Prompt",
    commandCategory: "other",
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
};
module.exports.languages = {
	"vi": {
		"returnResult": "Đây là kết quả phù hợp: \n",
		"returnNull": "Không tìm thấy kết quả dựa vào tìm kiếm của bạn!",
	},
	"en":{
		"returnResult": "This is your result: \n",
		"returnNull": "There is no result with your input!",
	}
}
module.exports.handleEvent = async function({ api, event, args, Users,Threads }) {
  const moment = require("moment-timezone");
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
  var idad = global.config.ADMINBOT;
  var seconds = moment.tz("Asia/Ho_Chi_Minh").format("ss");
  var restart = `12:00:${seconds}`;
  if(timeNow == restart && seconds < 6){
  for( let ad of idad) {
  setTimeout(() =>
          api.sendMessage(`〉Bây giờ là: ${timeNow}\n[❗] Bot sẽ tiến hành khởi động lại !`,ad, () =>process.exit(1)), 1000);
    }
  }
  }   
module.exports.run = async function({
    api,
    event,
    getText,
    args
}) {
	if(!args[0]){
		return api.sendMessage("🛠 | Đây là toàn bộ cài đặt của bot | 🛠\n=== Quản Lý Cài Đặt ===\n[1] Prefix.\n[2] Tên bot.\n[3] Danh sách Admin.\n[4] Ngôn ngữ.\n[5] Tự khởi động lại.\n=== Quản Lý Hoạt Động ===\n[6] Kiểm tra cập nhật.\n[7] Lấy danh sách người dùng bị cấm.\n[8] Lấy danh sách nhóm bị cấm.\n[9] Gửi thông báo tới tất cả các nhóm.\n[10]. Tìm kiếm UID thông qua tên người dùng\n-> Để chọn, hãy reply tin nhắn này với số <-", event.threadID, (error, info) =>
        {
          global.client.handleReply.push(
          {
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "choose"
          });
        }, event.messageID);
	}
}
module.exports.handleReply = async function(
{
  api,
  event,
  client,
  handleReply,
  Currencies,
  Users,
  Threads
})
{
    const { userName } = global.data;
    const { writeFileSync, readFileSync } = global.nodemodule["fs-extra"];
	const h = [];
		l = 1;
	switch(handleReply.type){
    case "choose": {
		switch(event.body){
			case "1": {
				return api.sendMessage("Prefix của bot là : " + global.config.PREFIX, event.threadID, event.messageID)
			} break;
			case "2":{
				return api.sendMessage("Tên của bot là : " + global.config.BOTNAME, event.threadID, event.messageID)
			} break;
			case "3":{
           const listAdmin = ADMINBOT || config.ADMINBOT || [];
            var msg = [];

            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                    const name = userName.get(idAdmin) || await Users.getNameUser(idAdmin);
                    msg.push(`${name} - ${idAdmin}`);
                }
            }

            return api.sendMessage(`[Admin] Danh sách toàn bộ người điều hành bot: \n\n${msg.join("\n")}`, event.threadID, event.messageID);
			} break;
			case "4":{
			if(global.config.language == "vi"){
				return api.sendMessage("Ngôn ngữ: Tiếng Việt", event.threadID, event.messageID);
			}
			else {
		    if(global.config.language == "en"){
				api.sendMessage("Language : English", event.threadID, event.messageID);
			}
			}
			} break;
			case "5":{
				return api.sendMessage("Bot sẽ khởi động lại vào lúc 12h", event.threadID, event.messageID)
			} break;
			case "6":{
				return api.sendMessage("Hiện tại bot đang ở phiên bản : " + global.config.version, event.threadID, event.messageID)
			} break;
			case "7":{
			const s = global.data.userBanned.keys();
			for (const n of s) {
				const e = global.data.userName.get(n) || await Users.getNameUser(n);
				h.push(`${l++}. ${e} \nUID: ${n}`)
			}
			return api.sendMessage(`Hiện tại đang có ${h.length} người dùng bị ban\n\n${h.join("\n")}\n\n`, event.threadID);
			} break;
			case "8":{
			const a = global.data.threadBanned.keys();
			for (const n of a) {
				nameT = await global.data.threadInfo.get(n).threadName || "Tên không tồn tại";
				h.push(`${l++}. ${nameT}\nTID: ${n}`)
			return api.sendMessage(`Hiện tại đang có ${h.length} nhóm bị ban\n\n${h.join("\n")}\n\n`, event.threadID);
			}
			} break;
			case "9":{
				return api.sendMessage("Reply tin nhắn này để nhập tin nhắn muốn gửi đến các nhóm", event.threadID, (error, info) =>
        		{
          		global.client.handleReply.push(
          		{
            	name: this.config.name,
            	messageID: info.messageID,
            	author: event.senderID,
            	type: "sendnoti"
          		});
        		}, event.messageID);
			} break;
		   case "10": {
		   	return api.sendMessage("Reply tin nhắn này để nhập tên người dùng", event.threadID, (error, info) =>
        		{
          		global.client.handleReply.push(
          		{
            	name: this.config.name,
            	messageID: info.messageID,
            	author: event.senderID,
            	type: "getuid"
          		});
        		}, event.messageID);
		   } break;
		   case "11":{
		   	return api.sendMessage("Reply tin nhắn này để nhập tên box", event.threadID, (error, info) =>
        		{
          		global.client.handleReply.push(
          		{
            	name: this.config.name,
            	messageID: info.messageID,
            	author: event.senderID,
            	type: "gettidbox"
          		});
        		}, event.messageID);
		   }break;
		}
	}break;
	case "sendnoti":{
	var allThread = global.data.allThreadID || [];
	let name1 = await Users.getNameUser(event.senderID);
	var count = 1,
		cantSend = [];
	for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
			api.sendMessage(`Thông báo từ admin ${name1} \n\n` + event.body , idThread, (error, info) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	}
	return api.sendMessage(`Gửi thành công tới : ${count} nhóm\n\nThất bại ${cantSend.length} nhóm`,event.threadID, event.messageID);
} break;
case "getuid": {
 api.getUserID(`${event.body}`, (err, data) => {
 	for(var i in data){
 		msg += `Tên : ${data[i].name}\nUID : ${data[i].userID}\n\n`
 	}
	return api.sendMessage(msg, event.threadID)
   });
} break;
case "gettidbox": {
  try{
			const contentJoin = event.body || "";
			const getThreads =  (await Threads.getAll(['threadID', 'threadInfo'])).filter(item => !!item.threadInfo);
			var matchThreads = [], a = '', b = 0;
			getThreads.forEach(i => {
				if ((i.threadInfo.threadName || "").toLowerCase().includes(contentJoin.toLowerCase())) {
					matchThreads.push({
						name: i.threadInfo.threadName,
						id: i.threadID
					});
				}
			});
			matchThreads.forEach(i => a += `\n${b += 1}. ${i.name} - ${i.id}`);
			(matchThreads.length > 0) ? api.sendMessage(`Kết quả của tìm kiếm : ${a}`, event.threadID) : api.sendMessage(`UNDERFIN`, event.threadID, event.messageID);
  } catch (err){
    return api.sendMessage(err, event.threadID)
  }
}break;
}
}