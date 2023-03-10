module.exports.config = {
  name: "ghepdoi",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Hungcho",
  description: "Ghep doi ngau nhien có đổi tên",
  commandCategory: "roleplay",
  usages: "ghepdoi",
  cooldowns: 0,
  dependencies: {}
};

module.exports.run = async function({ api, event, Users, Currencies }) {
        const axios = global.nodemodule["axios"];
        const fs = global.nodemodule["fs-extra"];
        var data = await Currencies.getData(event.senderID);
        var money = data.money
        if( money < 696) api.sendMessage("⚡️Bỏ ra đây 696 đô thì mới cho ghép đôi!", event.threadID, event.messageID) //thay số tiền cần trừ vào 0, xóa money = 0
        else {
        var tile = Math.floor(Math.random() * 101);
        

        //let loz = await api.getThreadInfo(event.threadID);
        var emoji = event.participantIDs;
        var id = emoji[Math.floor(Math.random() * emoji.length)];

        var namee = (await Users.getData(event.senderID)).name;
        var name = (await Users.getData(id)).name;

        var arraytag = [];
        arraytag.push({id: event.senderID, tag: namee});
        arraytag.push({id: id, tag: name});
                
        api.changeNickname(`Vợ ${name}`, event.threadID, event.senderID);
        api.changeNickname(`Chồng của ${namee}`, event.threadID, id);
        Currencies.setData(event.senderID, options = {money: money - 696})
  
        let Avatar = (await axios.get( `https://le31.glitch.me/fb/avt?q=${id}`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/1.png", Buffer.from(Avatar, "utf-8") );
        let Avatar2 = (await axios.get( `https://le31.glitch.me/fb/avt?q=${event.senderID}`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/2.png", Buffer.from(Avatar2, "utf-8") );
        var imglove = [];
              imglove.push(fs.createReadStream(__dirname + "/cache/1.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/2.png"));
        var msg = {body: `Ghép đôi thành công!\nTỉ lệ hợp đôi: ${tile}%\n`+namee+" "+"💓"+" "+name, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID);
        
      }
}