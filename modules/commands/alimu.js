module.exports.config = {
  name: "alimu",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "tdunguwu",
  description: "",
  commandCategory: "Other",
  usages: "",
    cooldowns: 0,
};
module.exports.run = async function({ api, event, args }) {
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
    let type = args.join(" ");
    if (!type) {
        return api.sendMessage("Thiếu từ khoá", event.threadID);
    }
    const res = await axios.get(`https://api.reiyuura.me/api/anime/wallpaper4?q=${encodeURIComponent(type)}`);
    var data = res.data.result;
    var msg = [];
    let img1 = `${res.data.result[1].image}`;
    let img2 = `${res.data.result[2].image}`;
    let img3 = `${res.data.result[3].image}`;
    let img4 = `${res.data.result[4].image}`;
    let img5 = `${res.data.result[5].image}`;
	let img6 = `${res.data.result[6].image}`;
	let img7 = `${res.data.result[7].image}`;
	let img8 = `${res.data.result[8].image}`;
	let img9 = `${res.data.result[9].image}`;

    let imgs1 = (await axios.get(`${img1}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img1.jpg", Buffer.from(imgs1, "utf-8"));
    let imgs2 = (await axios.get(`${img2}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img2.jpg", Buffer.from(imgs2, "utf-8"));
    let imgs3 = (await axios.get(`${img3}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img3.jpg", Buffer.from(imgs3, "utf-8"));
    let imgs4 = (await axios.get(`${img4}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img4.jpg", Buffer.from(imgs4, "utf-8"));
    let imgs5 = (await axios.get(`${img5}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img5.jpg", Buffer.from(imgs5, "utf-8"));
	let imgs6 = (await axios.get(`${img6}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img6.jpg", Buffer.from(imgs6, "utf-8"));
	let imgs7 = (await axios.get(`${img7}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img7.jpg", Buffer.from(imgs7, "utf-8"));
	let imgs8 = (await axios.get(`${img8}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img8.jpg", Buffer.from(imgs8, "utf-8"));
	let imgs9 = (await axios.get(`${img9}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img9.jpg", Buffer.from(imgs9, "utf-8"));

    var allimage = [];
    allimage.push(fs.createReadStream(__dirname + "/cache/img1.jpg"));
    allimage.push(fs.createReadStream(__dirname + "/cache/img2.jpg"));
    allimage.push(fs.createReadStream(__dirname + "/cache/img3.jpg"));
    allimage.push(fs.createReadStream(__dirname + "/cache/img4.jpg"));
    allimage.push(fs.createReadStream(__dirname + "/cache/img5.jpg"));
	allimage.push(fs.createReadStream(__dirname + "/cache/img6.jpg"));
	allimage.push(fs.createReadStream(__dirname + "/cache/img7.jpg"));
	allimage.push(fs.createReadStream(__dirname + "/cache/img8.jpg"));
	allimage.push(fs.createReadStream(__dirname + "/cache/img9.jpg"));
	
    {
        msg += `ảnh ${type} của bạn đây`
    }
    
    return api.sendMessage({
        body: msg,
        attachment: allimage
    }, event.threadID);
}