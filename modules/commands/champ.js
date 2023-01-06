module.exports.config = {
	name: "champlol",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "xem thong so champ uwu",
	commandCategory: "Other",
	usages: "",
	cooldowns: 5,
	dependencies: {"axios" : ""}

	
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
	const { threadID, messageID, senderID, body } = event;
	var ag = args.join(" ").split(" - ");
var text1 = ag[0],
    text2 = ag[1];
if (args[0] == "list") {
axios.get(`https://www.taoanhdep.tk/lol/list`).then(res => {
      var count = res.data.count ;
      var data = res.data.champ_names
      var page = 1;
      page = parseInt(args[1]) || 1;
      page < -1 ? page = 1 : "";
      var limit = 15;
      var numPage = Math.ceil(count/limit);
      var msg = ``;
      for(var i = limit*(page - 1); i < limit*(page-1) + limit; i++){
         if(i >= count) break;
        msg += `[ ${i+1} ] - ${data[i]}\n`;
      }
      msg += `» Trang ${page} / ${numPage}\n» Tổng Tướng ${count}  «\nDùng ${global.config.PREFIX}${this.config.name} list <số trang>`;
      return api.sendMessage(msg, threadID,messageID);
    });
  }
  else if (args[0] == "info") {

const res = await axios.get(`https://api-ttk.herokuapp.com/lmht?name=${text2}`);
if (!text2) return api.sendMessage("địt mẹ chưa nhập nội dung để coi kìa", event.threadID, event.messageID);
var name = res.data.name;
var hp = res.data.hp;
var hpg = res.data.hp_gain_per_lvl;
var hpr = res.data.hp_regen;
var hppr = res.data.hp_regen_gain_per_lvl;
var mana = res.data.mana;
var mng = res.data.mana_gain_per_lvl;
var mnr = res.data.mana_regen;
var mnrl = res.data.mana_regen_gain_per_lvl;
var dame = res.data.attack_damage;
var adg = res.data.attack_damage_gain_per_lvl;
var atsp = res.data.attack_speed;
var atspa = res.data.attack_speed_gain_per_lvl;
var am = res.data.armor;
var amg = res.data.armor_gain_per_lvl;
var ma = res.data.magic_resist;
var mar = res.data.magic_resist_gain_per_lvl;
var mov = res.data.movement_speed;
var range = res.data.range;
var abl = res.data.ability_power;
var abi = res.data.ability_haste;
var crit = res.data.crit;
return api.sendMessage(`===== ${text2} =====
\nMáu: ${hp} \n
Máu tăng mỗi LV: ${hpg}  \n
Tốc độ hồi máu: ${hpr} \n
Tốc độ hồi máu tăng mỗi  LV: ${hppr} \n
Mana: ${mana} \n
Mana tăng mỗi LV: ${mng} \n
Tốc độ hồi Mana: ${mnr}  \n
Tốc độ hồi Mana mỗi tăng mỗi LV: ${mnrl} \n
Sát thương: ${dame} \n
Sát thương tăng mỗi LV: ${adg} \n
Tốc độ đánh: ${atsp} \n
Tốc độ đánh tăng mỗi LV: ${atspa} \n
Giáp: ${am} \n
Giáp tăng mỗi LV: ${amg} \n
Giáp phép thuật: ${ma} \n
Giáp phép thuật tăng mỗi LV: ${mar} \n
Tốc chạy: ${mov} \n
Tầm đánh: ${range} \n
Ability Power: ${abl} \n
Ability Haste ${abi} \n
Chí mạng: ${crit}`, event.threadID, event.messageID)
	} 
}