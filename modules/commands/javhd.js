module.exports.config = {
    name: "javhd",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Shiron",
    description: "Tìm kiếm javhd",
    commandCategory: "javhd",
    usages: "[tên javhd]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "request": "",
        "fs": ""
    }
};
    module.exports.run = async function ({ api, args, event, Threads, Users }) {
 
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
    let type = args.join(" ");
    if (!type) {
        return api.sendMessage("Thiếu từ khoá", event.threadID);
    }
    const res = await axios.get(`https://api-ttk.herokuapp.com/nsfw/javhd?text=${encodeURIComponent(type)}`);
    var result = res.data.result;
    var msg = [];
    let img1 = `${res.data.result[0].thumb}`;
    let img2 = `${res.data.result[1].thumb}`;
    let img3 = `${res.data.result[2].thumb}`;
    let img4 = `${res.data.result[3].thumb}`;
    let img5 = `${res.data.result[4].thumb}`;
    let imgs1 = (await axios.get(`${img1}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img1.png", Buffer.from(imgs1, "utf-8"));
    let imgs2 = (await axios.get(`${img2}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img2.png", Buffer.from(imgs2, "utf-8"));
    let imgs3 = (await axios.get(`${img3}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img3.png", Buffer.from(imgs3, "utf-8"));
    let imgs4 = (await axios.get(`${img4}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img4.png", Buffer.from(imgs4, "utf-8"));
    let imgs5 = (await axios.get(`${img5}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img5.png", Buffer.from(imgs5, "utf-8"));
    var allimage = [];
    allimage.push(fs.createReadStream(__dirname + "/cache/img1.png"));
    allimage.push(fs.createReadStream(__dirname + "/cache/img2.png"));
    allimage.push(fs.createReadStream(__dirname + "/cache/img3.png"));
    allimage.push(fs.createReadStream(__dirname + "/cache/img4.png"));
    allimage.push(fs.createReadStream(__dirname + "/cache/img5.png"));
    for (let stt in result) {
        var title = result[stt].title;
        var url = result[stt].url;
        var quality = result[stt].quality;
        msg += `Tiêu đề : ${title}\nLink sếch : ${url}\nChất lượng : ${quality}\n\n`
    }
    console.log(msg)
    return api.sendMessage({
        body: msg,
        attachment: allimage
    }, event.threadID);
}