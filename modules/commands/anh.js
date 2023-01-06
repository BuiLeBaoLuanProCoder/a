module.exports.config = {
    name: "ảnh",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "Thiệu Trung Kiên",//tổng hợp api của JRT, ManhG,...
    description: "Xem tất cả các ảnh trên bot",
    commandCategory: "random-img",
    usages: "ảnh",
    cooldowns: 0
  };
  module.exports.run = async function ({ event, api , args, Users}){
    const fs = require("fs");
    let name1 = await Users.getNameUser(event.senderID)
    var name = ["Sexy😋", "Gái nga😋", "Ganyu😋", "Twitter😋", "LGBT😋", "Loli😋", "Blackpink😋", "Tát😋", "Wallpaper ⛔ (hư òi)", "Trai😋", "Jack😋", "Nude😋", "Instagram😋", "Kiss😋", "Ngực😋", "Meme😋", "Hentai😋", "Gái😋", "Mông😋", "Cosplay😋", "Kurumi😋", "Liên quân😋", "Lucy😋", "Sagiri😋", "Chitanda😋", "Rem😋", "Anime😋", "Naughty😋", "Wibu😋", "Beo😋", "Ausand ⛔ (hư òi)", "Shiba😋", "Khánh Huyền😋", "Ngọc Trinh😋", "Linh Ngọc Đàm😋", "Jimmy😋", "Lê Bống😋", "Sex😋", "Độ Mixi😋", "Cặp đôi😋", "Streamer Hanna😋", "Nobra😋", "Gái Sexy😋", "Gái Xinh😋", "Trai đẹp😋", "Background 4K😋", "Anime Hot😋", "Gái Japan😋", "Gái China😋", "Hololive😋", "Hot Twitter😋", "Hot Instagram😋", "Gái VSBG😋", "Ảnh Phan Trần Anh Tâm😋", "Ảnh Sex 18+😋", "Japan😋", "VSBG Hot😋"]
    var b = name.length;
    var page = 1;
    page = parseInt(args[0]) || 1;
    page < -1 ? page = 1 : "";
    var limit = 10;
    var numPage = Math.ceil(b / limit);
    var msg = `[🍑] 𝘾𝙝𝙤̣𝙣 𝙣𝙝𝙖𝙣𝙝 𝙡𝙚̂𝙣 𝙣𝙜𝙪̛𝙤̛̀𝙞 𝙮𝙚̂𝙪 𝙢𝙖̀𝙮 𝙩𝙝𝙖̂́𝙮 𝙜𝙞𝙤̛̀ [🍑]\n ⛔𝟭 𝙨𝙤̂́ 𝙡𝙚̣̂𝙣𝙝 𝙣𝙝𝙖̂̀𝙢 𝙡𝙪́𝙘 𝙙𝙪̀𝙣𝙜 𝙙𝙪̛𝙤̛̣𝙘 𝙣𝙝𝙖̂̀𝙢 𝙡𝙪́𝙘 𝙠𝙝𝙤̂𝙣𝙜 ⛔\n\n`;
    var x = 1;
    for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
        if (i >= b) break;
        msg += `[➡️] ${i+1} [⬅️] → ${name[i]}\n\n`;
    }
    msg += `[⚜〰️] Trang (${page}/${numPage})\n[😗] 𝘿𝙪̀𝙣𝙜 ${global.config.PREFIX}${this.config.name} <𝙨𝙤̂́ 𝙩𝙧𝙖𝙣𝙜>\n\n[⚜️] 𝙓𝙞𝙣 𝙢𝙤̛̀𝙞 ${name1} 𝙧𝙚𝙥𝙡𝙮 (𝙥𝙝𝙖̉𝙣 𝙝𝙤̂̀𝙞 𝙙𝙚̀ 𝙫𝙤̂ 𝙩𝙞𝙣 𝙣𝙝𝙖̆́𝙣 𝙩𝙖𝙤 𝙧𝙤̂̀𝙞 𝙘𝙝𝙤̣𝙣 𝙩𝙧𝙖̉ 𝙡𝙤̛̀𝙞) 𝙩𝙞𝙣 𝙣𝙝𝙖̆́𝙣 𝙩𝙝𝙚𝙤 𝙨𝙤̂́ 𝙩𝙝𝙪̛́ 𝙩𝙪̛̣ 𝙙𝙚̂̉ 𝙘𝙝𝙤̣𝙣 𝙖̉𝙣𝙝😚!!!\n 😎𝙣𝙝𝙪̛̃𝙣𝙜 𝙡𝙚̣̂𝙣𝙝 𝙜𝙖́𝙞 𝙠𝙝𝙖́𝙘 /𝙙𝙪,/𝙜𝙞𝙧𝙡,/𝙜𝙖𝙞,/𝙜𝙖𝙞𝟮,/𝙢𝙤̂𝙣𝙜😎
  
  ⛔𝟭 𝙨𝙤̂́ 𝙡𝙚̣̂𝙣𝙝 𝙣𝙝𝙖̂̀𝙢 𝙡𝙪́𝙘 𝙙𝙪̀𝙣𝙜 𝙙𝙪̛𝙤̛̣𝙘 𝙣𝙝𝙖̂̀𝙢 𝙡𝙪́𝙘 𝙠𝙝𝙤̂𝙣𝙜 ⛔`;
    return api.sendMessage(msg, event.threadID, (error, info) =>
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
  module.exports.handleReply = async function ({ event, api , args, handleReply, Users}){
    const axios = require("axios");
    
             if(event.body == "1"){
         var url = "https://jrt-api.j-jrt-official.repl.co/gaisexy"
}
         else if(event.body == "2"){
         var url = "https://jrt-api.j-jrt-official.repl.co/gainga"
}
         else if(event.body == "3"){
         var url = "https://jrt-api.j-jrt-official.repl.co/ganyu"
}
          else if(event.body == "4"){
          var url = "https://jrt-api.j-jrt-official.repl.co/twitter"
}
          else if(event.body == "5"){
          var url = "https://jrt-api.j-jrt-official.repl.co/lgbt"
}
         else if(event.body == "6"){
          var url = "https://jrt-api.j-jrt-official.repl.co/loli"
}
         else if(event.body == "7"){
          var url = "https://jrt-api.j-jrt-official.repl.co/blackpink"
}
         else if(event.body == "8"){
          var url = "https://jrt-api.j-jrt-official.repl.co/slap"
}
         else if(event.body == "9"){
         var url = "https://jrt-api.j-jrt-official.repl.co/wallpaper"
}
         else if(event.body == "10"){
         var url = "https://jrt-api.j-jrt-official.repl.co/trai"
}
         else if(event.body == "11"){
         var url = "https://jrt-api.j-jrt-official.repl.co/jack"
}
        else if(event.body == "12"){
          var  url = "https://jrt-api.j-jrt-official.repl.co/nude"
}
         else if(event.body == "13"){
          var  url = "https://jrt-api.j-jrt-official.repl.co/instagram"
}
         else if(event.body == "14"){
         var url = "https://jrt-api.j-jrt-official.repl.co/kiss"
}
         else if(event.body == "15"){
         var url = "https://jrt-api.j-jrt-official.repl.co/gaivuto"
}
         else if(event.body == "16"){
          var url = "https://jrt-api.j-jrt-official.repl.co/meme"
}
         else if(event.body == "17"){
           var url = "https://apikanekiflop.tk/hentai"
}
         else if(event.body == "18"){
          var url = "https://jrt-api.j-jrt-official.repl.co/gai"
}
         else if(event.body == "19"){
           var url = "https://jrt-api.j-jrt-official.repl.co/gaiditbu"
}
         else if(event.body == "20"){
          var url = "https://jrt-api.j-jrt-official.repl.co/cosplay"
}
        else if(event.body == "21"){
          var url = "https://api-jrt.j-jrt-official.repl.co/kurumi.php"
}
       else if(event.body == "22"){
          var url = "https://api-jrt.j-jrt-official.repl.co/lienquan.php"
}
       else if(event.body == "23"){
          var url = "https://api-jrt.j-jrt-official.repl.co/lucy.php"
}
       else if(event.body == "24"){
          var url = "https://api-jrt.j-jrt-official.repl.co/sagiri.php"
}
       else if(event.body == "25"){
          var url = "https://api-jrt.j-jrt-official.repl.co/chitanda.php"
}
       else if(event.body == "26"){
           var url = "https://api-jrt.j-jrt-official.repl.co/rem.php"
}
       else if(event.body == "27"){
         var  url = "https://api-jrt.j-jrt-official.repl.co/loli.php"
}
       else if(event.body == "28"){
           var url = "https://api-jrt.j-jrt-official.repl.co/naughty.php "
}
       else if(event.body == "29"){
           var url = "https://wibu.demngayyeu.repl.co/"
}
       else if(event.body == "30"){
         var url = "https://beo.demngayyeu.repl.co/"
}
       else if(event.body == "31"){
         var url = "https://ausand.demngayyeu.repl.co/"
}
       else if(event.body == "32"){
          var url = "https://shiba.demngayyeu.repl.co/"
}
       else if(event.body == "33"){
        var url = "https://khanhhuyen.demngayyeu.repl.co/"
}
       else if(event.body == "34"){
         var url = "https://ngoctrinh.demngayyeu.repl.co/"
}
       else if(event.body == "35"){
         var url = "https://linhngocdam.demngayyeu.repl.co/"
}
       else if(event.body == "36"){
         var url = "https://jimmy.demngayyeu.repl.co/"
}
       else if(event.body == "37"){
        var url = "https://lebong.demngayyeu.repl.co/"
}
       else if(event.body == "38"){
        var url = "https://api-jrt.j-jrt-official.repl.co/nude.php"
}
        else if(event.body == "39"){
        var url = "https://jrt-api.j-jrt-official.repl.co/domixi"
}
        else if(event.body == "40"){
        var url = "https://jrt-api.j-jrt-official.repl.co/capdoi"
}
        else if(event.body == "41"){
        var url = "https://jrt-api.j-jrt-official.repl.co/hanna"
}
        else if(event.body == "42"){
        var url = "https://api-jrt.j-jrt-official.repl.co/nobra.php"
}
        else if(event.body == "43"){
        var url = "https://api-jrt.j-jrt-official.repl.co/sexy.php"
}
        else if(event.body == "44"){
        var url = "https://rdapi.000webhostapp.com/"
}
        else if(event.body == "45"){
        var url = "https://api-jrt.j-jrt-official.repl.co/trai.php"
}
        else if(event.body == "46"){
        var url = "https://api-jrt.j-jrt-official.repl.co/background.php"
}
        else if(event.body == "47"){
        var url = "https://jrt-api.j-jrt-official.repl.co/anime"
}
        else if(event.body == "48"){
        var url = "https://api-jrt.j-jrt-official.repl.co/japan.php"
}
        else if(event.body == "49"){
        var url = "https://api-jrt.j-jrt-official.repl.co/china.php"
}
    else if(event.body == "50"){
        var url = "https://api-jrt.j-jrt-official.repl.co/hololive.php"
}
    else if(event.body == "51"){
        var url = "https://api-jrt.j-jrt-official.repl.co/twitter.php"
}
    else if(event.body == "52"){
        var url = "https://api-jrt.j-jrt-official.repl.co/instagram.php"
}
    else if(event.body == "53"){
        var url = "https://api-jrt.j-jrt-official.repl.co/vsbg.php"
}
    else if(event.body == "54"){
        var url = "https://jrt-api.j-jrt-official.repl.co/ptat"
}
    else if(event.body == "55"){
        var url = "https://jrt-api.j-jrt-official.repl.co/sex"
}
    else if(event.body == "56"){
        var url = "https://jrt-api.j-jrt-official.repl.co/japan"
}
    else if(event.body == "57"){
        var url = "https://jrt-api.j-jrt-official.repl.co/vsbg"
}
    switch(handleReply.type){
    case "choose":{
    api.unsendMessage(handleReply.messageID);
    const res = await axios.get(url);
    const fs = require ("fs");
   // let name = await Users.getNameUser(event.senderID)
    const data = res.data.data;
    const download = (await axios.get(data, {
        responseType: "stream"
    })).data;
    return api.sendMessage({body: `[😋] Cho thịnh võ xin 5 chục [😋]\n[❤️] Ảnh của bạn đây!!!`, attachment : download}, event.threadID, event.messageID)
}
    }
}