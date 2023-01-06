module.exports.config = {
  name: "count", 
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "BerVer", 
  description: "Đếm mọi thứ trong box chat", 
  commandCategory: "group", 
  usages: "count message/admin/member/male/female/gei/allgroup/alluser/boxdata/boxleave", 
  cooldowns: 5
};

module.exports.run = async function ({ api, Threads, Users, event, args, client, __GLOBAL }) {
  const { threadID, messageID, participantIDs } = event;
  var input = args.join();
  var nameMen = [];
  var gendernam = [];
  var gendernu = [];
  var nope = [];
  let threadInfo = await api.getThreadInfo(threadID);
  for (let z in threadInfo.userInfo) {
    var gioitinhone = threadInfo.userInfo[z].gender;
    if (gioitinhone == "MALE") {
      gendernam.push(gioitinhone)
    } else {
      if (gioitinhone == "FEMALE") {
        gendernu.push(gioitinhone)
      } else { nope.push(gioitinhone) }
    }
  }
  ///////////////////////
      var threadList = [];
      var inbox = await api.getThreadList(150, null, ['INBOX']);
      let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);

      for (var groupInfo of list) {
          threadList.push({
              id: groupInfo
          });
      } 
  ///////////////////////

  ///////////////////////
      var listLeave = [];
      var inbox = await api.getThreadList(100, null, ['ARCHIVED']);

      for (var groupInfo of inbox) {
          listLeave.push({
              id: groupInfo
          });
      } 
  ///////////////////////

  var threadData = (await Threads.getData(threadID)).threadInfo;
  var out = (msg) => api.sendMessage(msg, threadID, messageID);
  var boxget = await Threads.getAll(['threadID']);
  var userget = await Users.getAll(['userID']);
  if (input == "") { out(`Bạn chưa nhập thẻ, hãy sử dụng các thẻ sau: message/admin/member/male/female/gei/allgroup/alluser/boxdata/boxleave`) }
  if (input == "message") { out(`Nhóm này có ${threadInfo.messageCount} tin nhắn`) }
  if (input == "admin") { out(`Nhóm mày có ${threadData.adminIDs.length} quản tri viên`) }
  if (input == "member") { out(`Nhóm này có ${participantIDs.length} thành viên`) }
  if (input == "male") { out(`Nhóm này có ${gendernam.length} thành viên là nam`) }
  if (input == "female") { out(`Nhóm này có ${gendernu.length} thành viên là nữ`) }
  if (input == "gei") { out(`Nhóm này có ${nope.length} thành viên là Gei`) }
  if (input == "allgroup") { out(`Tổng có ${threadList.length} nhóm chat sử dụng bot`) }
  if (input == "alluser") { out(`Tổng có ${userget.length} người dùng sử dụng bot`) }
  if (input == "boxdata") { out(`Tổng có ${boxget.length} nhóm chat[data] sử dụng bot`) }
  if (input == "boxleave") { out(`Tổng có ${listLeave.length} nhóm đã rời`) }
}
