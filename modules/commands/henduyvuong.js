// thêm thêm 1 số ở line 49 và 135 để fix lỗi nhé
// ví dụ như bạn để limit là 5 thì để fix lỗi bạn để là 6 nhé
const nhentai = new (require('nhentai-api')).API;
const fs = require('fs-extra');
const axios = require('axios');

module.exports.config = {
  name: "doctruyen",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "DuyVuongUwU code riêng cho Yuuki (Lê Đức Thuận)",
  description: "Xem nhentai ngay trên messenger của bạn!",
  commandCategory: "nsfw",
  usages: "<code nhentai> <page or all>\nNoprefix: nhentai <number pages>",
  cooldowns: 0
};

module.exports.onLoad = async function() {
  if (!fs.existsSync(__dirname + '/cache/nhentai.json')) {
    fs.writeFileSync(__dirname + '/cache/nhentai.json', JSON.stringify([], null, 4));
  }
}
module.exports.handleEvent = async function({ api, event }) {
  try {
    const { threadID, messageID, body, senderID } = event;
    const dataNhentai = require('./cache/nhentai.json');
    var s = /read/m;
    if (s.test(body.toLowerCase())) {
      if (!dataNhentai.some(item => item.senderID == senderID)) return;
      else {
        let dataUser = dataNhentai.find(item => item.senderID == senderID);
        let backupData = dataNhentai.find(item => item.senderID == senderID);
        if (backupData.messageID.length > 0) {
          for (var x of backupData.messageID) {
            api.unsendMessage(x);
          }
        }
        let argsRe = body.split(' ')
        if (argsRe[1] == 'continue') argsRe[1] = dataUser.pagesRead + 1;
        if (isNaN(argsRe[1])) return api.sendMessage('Nội dung thứ nhất không phải là 1 con số hợp lệ.', threadID, messageID);
        if (parseInt(argsRe[1]) < 0 || parseInt(argsRe[1]) == 0) return api.sendMessage('Số trang cần read không được bé hoặc bằng 0', threadID, messageID);
        if (parseInt(argsRe[1]) > dataUser.totalPages) return api.sendMessage('Số trang cần xem vượt quá ' + dataUser.totalPages + ' trang.', threadID, messageID);
        const responseAPI = await nhentai.getBook(dataUser.code);
        var pageRead = 1, objectImage = [];
        dataUser.messageID = [];
        pageRead = parseInt(argsRe[1]) || 1;
        pageRead < -1 ? pageRead = 1 : "";
        var limitPage = 6;
        var numPage = Math.ceil(responseAPI.pages.length / limitPage);
        for (var o = limitPage * (pageRead - 1); o < limitPage * (pageRead - 1) + limitPage; o++) {
          if (o >= responseAPI.pages.length) break;
          var urlImage = await nhentai.getImageURL(responseAPI.pages[o]);
          var downloadAxios = (await axios.get(urlImage, { responseType: 'arraybuffer' })).data;
          fs.writeFileSync(__dirname + '/cache/nhentai_' + o + '.jpg', Buffer.from(downloadAxios));
          api.sendMessage({
            attachment: fs.createReadStream(__dirname + '/cache/nhentai_' + o + '.jpg')
          }, threadID, (error, info) => {
            try {
              dataUser.messageID.push(info.messageID);
            }
            catch(e) {};
          });
          objectImage.push(__dirname + '/cache/nhentai_' + o + '.jpg');
        }
        for (var unlinkUrl of objectImage) {
          try {
            fs.unlinkSync(unlinkUrl)
          }
          catch (e) { };
        }
        dataUser.pagesRead = parseInt(argsRe[1]);
        dataNhentai.splice(dataNhentai.findIndex(item => item.senderID == senderID), 1);
        dataNhentai.push(dataUser);
        fs.writeFileSync(__dirname + '/cache/nhentai.json', JSON.stringify(dataNhentai, null, 4));
      }
    }
  }
  catch (e) { };
}
module.exports.run = async function({ api, event, args }) {
  try {
    const { threadID, messageID, senderID } = event;
    const objectIconRead = ['📒', '📕', '📗', '📘', '📙', '📓', '📔', '📒'];
    const randomIconRead = objectIconRead[Math.floor(Math.random() * objectIconRead.length)]
    const dataNhentai = require('./cache/nhentai.json');
    if (args.length == 0) {
      return api.sendMessage('Code lý tưởng dành cho người anh em là: ' + (Math.floor(Math.random() * 99999)), threadID, messageID);
    }
    if (args[0] == 'delete' || args[0] == 'del' || args[0] == 'remove') {
      if (!dataNhentai.some(item => item.senderID == senderID)) return api.sendMessage('Bạn chưa đọc truyện nào.', threadID, messageID);
      else {
        var backupData = dataNhentai.find(item => item.senderID == senderID);
        dataNhentai.splice(dataNhentai.findIndex(item => item.senderID == senderID), 1);
        fs.writeFileSync(__dirname + '/cache/nhentai.json', JSON.stringify(dataNhentai, null, 4));
        return api.sendMessage('Đã xóa bộ truyện bạn đang đọc: "' + backupData.title + '".', threadID, messageID);
      }
    }
    if (args[0] == 'page') {
      if (!dataNhentai.some(item => item.senderID == senderID)) return api.sendMessage('Bạn chưa đọc truyện nào.', threadID, messageID);
      else {
        let dataUser = dataNhentai.find(item => item.senderID == senderID)
        return api.sendMessage('[📄] Bạn đã xem xong trang ' + dataUser.pagesRead + (dataUser.pagesRead == dataUser.totalPages ? '\n[📖] Hoàn thành bộ truyện.' : '\n[📖] Còn ' + (dataUser.totalPages - dataUser.pagesRead) + ' trang chưa xem xong.'), threadID, messageID)
      }
    }
    if (args[0] == 'info') {
      const responseAPI = await nhentai.getBook(parseInt(args[1]));
      const exp = 'jpg'
      const imgUrl = await nhentai.getImageURL(responseAPI.cover)
     /*
      const downloadAxios = (await axios.get('https://external-content.duckduckgo.com/iu/?u=' + imgUrl, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(__dirname + '/cache/nhentai.' + exp, Buffer.from(downloadAxios));
      */
      let imag = (await axios.get('https://external-content.duckduckgo.com/iu/?u=' + imgUrl, {
        responseType: "stream"
      })).data;
      if (!args[1]) return api.sendMessage('Thiếu dữ liệu thông tin để sử dụng lệnh.', threadID, messageID);
      if (isNaN(args[1])) return api.sendMessage('nội dung thứ nhất phải là 1 con số hợp lệ và là code trong nhentai.', threadID, messageID);
      const title = responseAPI.title.pretty;
      var tagList = [],
        artistList = [],
        characterList = [];
      responseAPI.tags.forEach(item => (item.type == "tag") ? tagList.push(item.name) : (item.type == "artist") ? artistList.push(item.name) : (item.type == "character") ? characterList.push(item.name) : '');
      var tags = tagList.join(', ');
      var artists = artistList.join(', ');
      var characters = characterList.join(', ');
      if (characters == '') characters = 'Original';
      return api.sendMessage({
        body: `» Name: ${title}\n» Author: ${artists}\n» Characters: ${characters}\n» Tags: ${tags}\n» Link: https://nhentai.net/g/${args[1]}`,
        attachment: imag
    },event.threadID)}
    if (isNaN(args[0])) return api.sendMessage('nội dung thứ nhất phải là 1 con số hợp lệ và là code trong nhentai.', threadID, messageID);
    if (dataNhentai.some(item => item.senderID == senderID)) {
      let dataUser = dataNhentai.find(item => item.senderID == senderID);
      return api.sendMessage('Bạn hiện đang đọc truyện: "' + dataUser.title + '" không thể đọc truyện khác!\n\n[?] nếu muốn đọc truyện khác vui lòng dùng nhentai delete.', threadID, messageID);
    }
    const responseAPI = await nhentai.getBook(parseInt(args[0]));
    const exp = 'jpg'
    const downloadAxios = (await axios.get(await nhentai.getImageURL(responseAPI.cover), { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(__dirname + '/cache/nhentai.' + exp, Buffer.from(downloadAxios));
    var limitPage = 6;
    var numPage = Math.ceil(responseAPI.pages.length / limitPage);
    let msg = {
      body: '[' + randomIconRead + '] Đang đọc: "' + responseAPI.title.pretty + '" (📄' + numPage + ' Trang)\n\n[+] Dùng "read <number pages>" để đọc trang đó (lưu ý lệnh này là noprefix)',
      attachment: fs.createReadStream(__dirname + '/cache/nhentai.' + exp)
    };
    api.sendMessage(msg, threadID, () => {
      dataNhentai.push({
        messageID: [],
        senderID: senderID,
        code: parseInt(args[0]),
        title: responseAPI.title.pretty,
        pagesRead: 0,
        totalPages: parseInt(numPage)
      })
      fs.writeFileSync(__dirname + '/cache/nhentai.json', JSON.stringify(dataNhentai, null, 4));
      fs.unlinkSync(__dirname + '/cache/nhentai.' + exp)
    }, messageID);
  }
  catch (e) {
    console.log(e)
  }
}