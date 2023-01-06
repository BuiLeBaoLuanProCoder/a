module.exports.config = {
    name: "xsmb",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Thùy",
    description: "Xem thông tin xổ số miền bắc hôm nay",
    commandCategory: "general",
    usages: "xsmb",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, client }) {
    var xsmb = {};
    const axios = require("axios");
    const cheerio = require("cheerio");
    var { data } = await axios.get("https://xosodaiphat.com/xsmb-xo-so-mien-bac.html");    
    var $ = cheerio.load(data);
    var checktime = $('div.col-xs-12 div.block').eq(0);    
    xsmb['date'] = ($('#MbListLink > a').eq(2).text()).replace("XSMB ", "");
    var test = $('tbody tr').each(e => {
        var db = "#mb_prize_DB_item_",
            nhat = "#mb_prize_1_item_",
            nhi = "#mb_prize_2_item_",
            ba = "#mb_prize_3_item_",
            bon = "#mb_prize_4_item_",
            nam = "#mb_prize_5_item_",
            sau = "#mb_prize_6_item_",
            bay = "#mb_prize_7_item_"
        var num = e == 1 ? 1 : e == 2 ? 1 : e == 3 ? 2 : e == 4 ? 6 : e == 5 ? 4 : e == 6 ? 6 : e == 7 ? 3 : e == 8 ? 4 : '';
        var bien = e == 1 ? db : e == 2 ? nhat : e == 3 ? nhi : e == 4 ? ba : e == 5 ? bon : e == 6 ? nam : e == 7 ? sau : e == 8 ? bay : '';
        var name = e == 1 ? '0' : e == 2 ? '1' : e == 3 ? '2' : e == 4 ? '3' : e == 5 ? '4' : e == 6 ? '5' : e == 7 ? '6' : e == 8 ? '7' : '';

        for (var a = 0; a < num; a++) {
            if (name != '' && bien != '') {
                if (!xsmb.hasOwnProperty(name))xsmb[name] = [];
                var name = e == 1 ? '0' : e == 2 ? '1' : e == 3 ? '2' : e == 4 ? '3' : e == 5 ? '4' : e == 6 ? '5' : e == 7 ? '6' : e == 8 ? '7' : '';
                var data = $('tbody tr ' + bien + a.toString()).text();                      
                xsmb[name].push(data);
            }
        }
    })
    var msg = "Kết quả xổ số miền bắc " + xsmb['date'] + ":\n\n"
    for (var e of Object.keys(xsmb)) {
        if (e != 'date') msg += `${e == 0 ? "Đặc biệt: " : e == 1 ? "Giải nhất: " : e == 2 ? "Giải nhì: " : e == 3 ? "Giải ba: " : e == 4 ? "Giải bốn: " : e == 5 ? "Giải năm: " : e == 6 ? "Giải sáu: " : "Giải bảy: "}${xsmb[e].join(" - ")}\n`
    }
    return api.sendMessage(msg, event.threadID, event.messageID);
}