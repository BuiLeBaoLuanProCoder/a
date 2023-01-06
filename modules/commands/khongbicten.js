module.exports.config = {
  name: "kkk",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ARAXY XD",
  description: "",
  commandCategory: "admin",
  usages: "",
  cooldowns: 2
};
module.exports.run = async({api : y, event: q, args: i}) => {
  const { threadID : e, messageID: r, senderID: f } = q
  const test = require("decode-encode-binary")
  const { base64encode, base64decode } = require('nodejs-base64');
 const codec = require('string-codec')
  
  if(i[0] == "binary" || i[0] == "bin"){
    if(i[1] == "decode" || i[1] == "de"){
      var text = i.slice(2).join(" ");
      var decode = test.decode(text)
      return y.sendMessage(decode, e, r)
    } else if( i[1] == 'encode' || i[1] == 'en'){
        var text = i.slice(2).join(" ");
      var encode = test.encode(text)
      return y.sendMessage(encode, e, r)
    }
  } else if(i[0] == "base64" || i[0] == "b64" || i[0] == "bs64" ){
    if(i[1] == "decode" || i[1] == "de"){
      var text = i.slice(2).join(" ");
      var decode = codec.decoder(text,'base64')
      return y.sendMessage(decode, e, r)
    } else if( i[1] == 'encode' || i[1] == 'en'){
        var text = i.slice(2).join(" ");
      var encode = codec.encoder(text,'base64')
      return y.sendMessage(encode, e, r)
    }
  } else if(i[0] == "caesar" || i[0] == "csr"){
     if(i[1] == "decode" || i[1] == "de"){
      var text = i.slice(2).join(" ");
      var decode = caesar.decrypt(text, -2062)
      return y.sendMessage(decode, e, r)
    } else if( i[1] == 'encode' || i[1] == 'en'){
        var text = i.slice(2).join(" ");
      var encode = caesar.encrypt(text, 2062)
      return y.sendMessage(encode, e, r)
    }
  } else if(i[0] == "rot13" || i[0] == "r13"){
      if(i[1] == "decode" || i[1] == "de"){
      var text = i.slice(2).join(" ");
      var decode = codec.decoder(text,'rot13')
      return y.sendMessage(decode, e, r)
    } else if( i[1] == 'encode' || i[1] == 'en'){
        var text = i.slice(2).join(" ");
      var encode = codec.encoder(text,'rot13')
      return y.sendMessage(encode, e, r)
    }
  }
    else {
    return y.sendMessage('nqu quá kkk', e, r)
  }
}