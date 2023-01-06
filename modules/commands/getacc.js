module.exports.config = {
    name: "getatk",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "",
    description: "",
    commandCategory: "Nhóm",
    usages: "",
    cooldowns: 5
}


module.exports.run = async function  ({ event, api, args, permssionm, Users })  {
try{
  var js = await api.getAccessToken()
    console.log(api.getAccessToken())
    //JSON.stringify(js,null,"\t")
  return api.sendMessage(js, event.threadID, event.messageID)
} catch (e){
    console.log(e)
        console.log(api.getAccessToken())
}
}
/*try{
  var js = await api.getAccessToken()
    console.log(api.getAccessToken())
    //JSON.stringify(js,null,"\t")
  return api.sendMessage(js, event.threadID, event.messageID)
} catch (e){)
    console.log(e)
        console.log(api.getAccessToken())
}
*/