const coinsdown = 5000
module.exports.config = {
	name: "shopimage",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "",
	commandCategory: "image",
    cooldowns: 5
};
module.exports.run = async function ({ api, args, event, Currencies, Users }) {
  const axios = require("axios");
    const fs = require("fs-extra");
   const { threadID, messageID, senderID } = event;
    let balance = (await Currencies.getData(senderID)).money;
    if (balance <= 5000) return api.sendMessage('Nghèo mà đòi ngắm gái =))',threadID,messageID);
     await Currencies.decreaseMoney(event.senderID, parseInt(coinsdown));
    
    
    if (!args[0]) {
     var msg = {body: `[ REPLY ]\n=========================\n1: Mông\n2: Vú\n3: Gái\n4: nobra\n5: sexy\n6: nude\n7:cosplay\n8: vitamin\n9: trai\n10: Lê Bống\n11: TW\n12: naughty\n13: caidloli\n14: japcosplay\n15: ausand\n16: Linh Ngọc Đàm\n17: hanaUwU\n=========================`}
        
        return api.sendMessage(msg, event.threadID, (error, info) => {
        
            global.client.handleReply.push({
                type: "choosee",
                name: this.config.name,
                author: event.senderID,
                messageID: info.messageID
            })
        })
    }
}
 module.exports.handleReply = async function ({
    args, event, Users, api, handleReply, Currencies
}) {
   const axios = require("axios");
    const fs = require("fs-extra");
    const request = require("request");
  const { threadID, messageID } = event;
    var { author } = handleReply;
    if (event.senderID != author) return api.sendMessage("cút mẹ mày đi", event.threadID, event.messageID); 
    switch (handleReply.type) {
    case "choosee": {
        switch (event.body) {
        case "1": {
           api.unsendMessage(handleReply.messageID); 
            var reply = {
    body: "",
    attachment: (await global.nodemodule["axios"]({
      url: (await global.nodemodule["axios"]('https://www.phamvandienofficial.xyz/images/mong')).data.image, 
      method: "GET",
      responseType: "stream"
    })).data

  }
  return api.sendMessage(reply, threadID, messageID);
}
case "2": {
           api.unsendMessage(handleReply.messageID); 
            var reply = {
    body: "",
    attachment: (await global.nodemodule["axios"]({
      url: (await global.nodemodule["axios"]('https://www.phamvandienofficial.xyz/images/vu')).data.image, 
      method: "GET",
      responseType: "stream"
    })).data

  }
  return api.sendMessage(reply, threadID, messageID);
}
case "3": {
           api.unsendMessage(handleReply.messageID); 
            var reply = {
    body: "",
    attachment: (await global.nodemodule["axios"]({
      url: (await global.nodemodule["axios"]('https://www.phamvandienofficial.xyz/images/girl')).data.image, 
      method: "GET",
      responseType: "stream"
    })).data

  }
  return api.sendMessage(reply, threadID, messageID);
}
case "4": {
           api.unsendMessage(handleReply.messageID); 
            var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/nobra.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/nobra.jpg"),event.messageID);
return request(encodeURI(`http://api.leanhtruong.net/api/image?api_key=leanhtruong_MLvEHCMFhsALN9EmrTxB&image=nobra`)).pipe(fs.createWriteStream(__dirname+'/cache/nobra.jpg')).on('close',() => callback()); 

  }
  case "5": {
           api.unsendMessage(handleReply.messageID); 
            var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/sexy.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/sexy.jpg"),event.messageID);
return request(encodeURI(`http://api.leanhtruong.net/api/image?api_key=leanhtruong_MLvEHCMFhsALN9EmrTxB&image=sexy`)).pipe(fs.createWriteStream(__dirname+'/cache/sexy.jpg')).on('close',() => callback()); 

  }
  case "6": {
           api.unsendMessage(handleReply.messageID); 
            var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/nude.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/nude.jpg"),event.messageID);
return request(encodeURI(`http://api.leanhtruong.net/api/image?api_key=leanhtruong_MLvEHCMFhsALN9EmrTxB&image=nude`)).pipe(fs.createWriteStream(__dirname+'/cache/nude.jpg')).on('close',() => callback()); 

  }
  case "7": {
           api.unsendMessage(handleReply.messageID); 
            var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/cosplay.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/cosplay.jpg"),event.messageID);
return request(encodeURI(`http://api.leanhtruong.net/api/image?api_key=leanhtruong_MLvEHCMFhsALN9EmrTxB&image=cosplay`)).pipe(fs.createWriteStream(__dirname+'/cache/cosplay.jpg')).on('close',() => callback()); 
  }
case "8": {
           api.unsendMessage(handleReply.messageID); 
            var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/vitamin.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/vitamin.jpg"),event.messageID);
return request(encodeURI(`http://api.leanhtruong.net/api/image?api_key=leanhtruong_MLvEHCMFhsALN9EmrTxB&image=vitamin`)).pipe(fs.createWriteStream(__dirname+'/cache/vitamin.jpg')).on('close',() => callback()); 

  }
  case "9": {
           api.unsendMessage(handleReply.messageID); 
            var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/boy.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/boy.jpg"),event.messageID);
return request(encodeURI(`http://api.leanhtruong.net/api/image?api_key=leanhtruong_MLvEHCMFhsALN9EmrTxB&image=boy`)).pipe(fs.createWriteStream(__dirname+'/cache/boy.jpg')).on('close',() => callback()); 

  }
  case "10": {
           api.unsendMessage(handleReply.messageID); 
            axios.get('https://imgs-api.herokuapp.com/lebong?apikey=mk002').then(res => {
  let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
  
  let callback = function () {
          api.sendMessage({
            body: ``,
            attachment: fs.createReadStream(__dirname + `/cache/lebong.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/lebong.${ext}`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/lebong.${ext}`)).on("close", callback);
      })    
  }
  case "11": {
           api.unsendMessage(handleReply.messageID); 
           axios.get('https://imgs-api.herokuapp.com/tw?apikey=mk002').then(res => {
  let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
  
  let callback = function () {
          api.sendMessage({
            body: ``,
            attachment: fs.createReadStream(__dirname + `/cache/tw.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/tw.${ext}`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/tw.${ext}`)).on("close", callback);
      })    
  }
  case "12": {
           api.unsendMessage(handleReply.messageID); 
            axios.get('https://imgs-api.herokuapp.com/naughty?apikey=mk002').then(res => {
  let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
  
  let callback = function () {
          api.sendMessage({
            body: ``,
            attachment: fs.createReadStream(__dirname + `/cache/naughty.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/naughty.${ext}`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/naughty.${ext}`)).on("close", callback);
      })    
  }
  case "13": {
           api.unsendMessage(handleReply.messageID); 
           axios.get('https://imgs-api.herokuapp.com/caidloli/?apikey=mk002').then(res => {
  let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
  
  let callback = function () {
          api.sendMessage({
            body: ``,
            attachment: fs.createReadStream(__dirname + `/cache/tw.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/tw.${ext}`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/tw.${ext}`)).on("close", callback);
      })    
  }
  case "14": {
           api.unsendMessage(handleReply.messageID); 
           axios.get('https://imgs-api.herokuapp.com/japcosplay/?apikey=mk002').then(res => {
  let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
  
  let callback = function () {
          api.sendMessage({
            body: ``,
            attachment: fs.createReadStream(__dirname + `/cache/japcosplay.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/japcosplay.${ext}`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/japcosplay.${ext}`)).on("close", callback);
      })    
  }
  case "15": {
           api.unsendMessage(handleReply.messageID); 
           axios.get('https://imgs-api.herokuapp.com/ausand/?apikey=mk002').then(res => {
  let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
  
  let callback = function () {
          api.sendMessage({
            body: ``,
            attachment: fs.createReadStream(__dirname + `/cache/ausand.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/ausand.${ext}`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/ausand.${ext}`)).on("close", callback);
      })    
  }
  case "16": {
           api.unsendMessage(handleReply.messageID); 
           axios.get('https://imgs-api.herokuapp.com/linhngocdam/?apikey=mk002').then(res => {
  let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
  
  let callback = function () {
          api.sendMessage({
            body: ``,
            attachment: fs.createReadStream(__dirname + `/cache/linhngocdam.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/linhngocdam.${ext}`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/linhngocdam.${ext}`)).on("close", callback);
      })    
  }
  case "17": {
           api.unsendMessage(handleReply.messageID); 
           axios.get('https://imgs-api.herokuapp.com/naughty/?apikey=mk002').then(res => {
  let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
  
  let callback = function () {
          api.sendMessage({
            body: ``,
            attachment: fs.createReadStream(__dirname + `/cache/hana.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/hana.${ext}`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/hana.${ext}`)).on("close", callback);
      })    
  }
  break;
					default:
           const choose = parseInt(event.body);
            	if (isNaN(event.body)) return api.sendMessage("Vui lòng nhập 1 con số", event.threadID, event.messageID);
            	if (choose > 17 || choose < 1) return api.sendMessage("Lựa chọn không nằm trong danh sách.", event.threadID, event.messageID);
        }
    }
    }
}
           