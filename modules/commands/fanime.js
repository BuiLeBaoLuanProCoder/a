module.exports.config = {
    name: "fanime",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "",
    commandCategory: "image",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "request": "",
		"axios":""
    }
};
module.exports.run = async ({ api, event,args }) => {  {
    
    const fs = global.nodemodule["fs-extra"];
	const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
	 const { threadID, messageID, senderID, body } = event;
	
 var anime = args.toString().split('|')[0].replace(/,/g,  '  ')
 
if (!anime)
    return api.sendMessage("[anime]", event.threadID, event.messageID);
	const res = await axios.get(`https://api-ttk.herokuapp.com/other/anime?name=${anime}`);
	var tit = res.data.title;
	var url = res.data.url;
	var dsp = res.data.noidung;
	var rk = res.data.xephang;
	var tap = res.data.episodes;
	var hires = res.data.picture;
		return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=vi&dt=t&q=${dsp}`), (err, response, body) => {
        if (err) return api.sendMessage("Đã có lỗi xảy ra!", event.threadID, event.messageID);
        var retrieve = JSON.parse(body);
        var text = '';
        retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
        var fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0]
		
	 var callback = () => api.sendMessage({body:`〘${tit}〙\n»»link: ${url}\n»»nội dung: ${text}\n»»xếp hạng: ${rk} \n»»số tập: ${tap} `,attachment: fs.createReadStream(__dirname + "/cache/anime.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/anime.jpg"),event.messageID);
	 return request(encodeURI(`${hires}`)).pipe(fs.createWriteStream(__dirname+'/cache/anime.jpg')).on('close',() => callback());     
})}}