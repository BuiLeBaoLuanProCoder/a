module.exports.config = {
  name: "cap",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "who is hakira",
  description: "",
  commandCategory: "echo",
  usages: "",
  cooldowns: 3
};
const fs = require("fs-extra"), appstate = JSON.parse(fs.readFileSync("appstate.json", "utf8"));
function convertAppStateToCookies(){
    var cookies = ''
    appstate.map((cookie) => {
        let cookieString = cookie.key + "=" + cookie.value + "; domain=" + cookie.domain + ";path=" + cookie.path + ";"
        if (cookie.secure) cookieString += "secure;"
        if (cookie.httpOnly) cookieString += "httpOnly;"
        if (cookie.expirationDate) cookieString += "expires=" + new Date(cookie.expirationDate * 1000).toUTCString() + ";"
        cookies += cookieString
    });
    return cookies
}
//console.log(convertAppStateToCookies())
module.exports.handleEvent = async ({ api, event, Threads }) => {
  if(event.body.toLowerCase() == 'cap'){
      try{
  if (event.type == "message_reply") {
      var id = event.messageReply.senderID;
    } else if (Object.keys(event.mentions).length == 1) {
      var id = Object.keys(event.mentions)[0];
    }
  else {
          var id = event.senderID;
    }
        api.sendMessage('doi bo may ti ',event.threadID)
 const { chromium } = require("playwright");
const fs = require('fs-extra');
    const { join } = require("path")
    let pathxx = __dirname + `/cache/${event.senderID}.png`;
    const pathData = require('path').join(__dirname, "cache","cookie.json");
 var dataJson = JSON.parse(fs.readFileSync(pathData, "utf-8"));
    let browser = await chromium.launch({
      headless: false
    });
const context = await browser.newContext({ 
  
  'authority':'facebook.com',
 'userAgent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36',
     'accept-encoding':'gzip, deflate, br',
'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
'cache-control': 'max-age=0',
    'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      'accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
    })
    await context.addCookies(dataJson)
 let page = await context.newPage();
 //await page.addCookies(cookie)
 await page.setViewportSize({ width: 1484, height: 1000 });
 await page.goto("https://www.facebook.com/" + id);
 await page.waitForTimeout(10000);
 await page.screenshot({ path: pathxx });
 await browser.close();
   api.sendMessage({
                   body: `ảnh của bạn đây`,
                   attachment: fs.createReadStream(pathxx)
               }, event.threadID, (() => {
                   fs.unlinkSync(pathxx)
               }))
 } catch(e){
   console.log(e)
 }
 }
}
module.exports.run = async ({ event, api, Currencies, args, Users, permssion }) => {
 const { chromium } = require("playwright");
const fs = require('fs-extra');
 try{
   var id = args[0];
   if(!id || id.includes("@")){
   if (event.type == "message_reply") {
     var id = event.messageReply.senderID
   }
   else if (Object.keys(event.mentions).length == 1) {
     var id = Object.keys(event.mentions)[0];
   } else {
     var id = event.senderID;
   }
   } else {
    var id = id
   }
   const { join } = require("path")
   let pathxx = __dirname + `/cache/${event.senderID}.png`;
   const pathData = require('path').join(__dirname, "cache","cookie.json");
var dataJson = JSON.parse(fs.readFileSync(pathData, "utf-8"));
   let browser = await chromium.launch();
const context = await browser.newContext({ 
 'authority':'facebook.com',
'userAgent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36',
    'accept-encoding':'gzip, deflate, br',
'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
'cache-control': 'max-age=0',
   'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
     'accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
})
    await context.addCookies(dataJson)
 let page = await context.newPage();
 //await page.addCookies(cookie)
 await page.setViewportSize({ width: 1484, height: 1000 });
 await page.goto("https://www.facebook.com/" + id);
 await page.screenshot({ path: pathxx });
 await browser.close();
   api.sendMessage({
                   body: `ảnh của bạn đây`,
                   attachment: fs.createReadStream(pathxx)
               }, event.threadID, (() => {
                   fs.unlinkSync(pathxx)
               }))
 } catch(e){
   console.log(e)
 }
}