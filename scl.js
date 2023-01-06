 
 ​module​.​exports​.​config​ ​=​ ​{ 
 ​        ​name​: ​"soundcloud"​, 
 ​        ​version​: ​"1.0.0"​, 
 ​        ​hasPermssion​: ​0​, 
 ​        ​credits​: ​"Thiệu Trung Kiên"​, 
 ​        ​description​: ​"Tải nhạc soundcloud", 
 ​        ​commandCategory​: ​"media"​, 
 ​        ​usages​: ​"[url]"​, 
 ​        ​cooldowns​: ​10​, 
 ​        ​dependencies​: ​{ 
 ​                ​"axios"​: ​""​, 
 ​                ​"fs-extra"​: ​"" 
 ​        ​} 
 ​         
 ​}​; 
 ​module​.​exports​.​run​ ​=​ ​async​ ​function​(​{​ api​,​ event​,​ args​,​}​)​ ​{ 
 ​  ​const​ ​axios​ ​=​ ​global​.​nodemodule​[​"axios"​]​; 
 ​  ​const​ ​fs​ ​=​ ​global​.​nodemodule​[​"fs-extra"​]​; 
 ​  ​if​ ​(​!​args​.​join​(​""​)​ ​!=​ ​" "​ ​)​{​ ​return​ ​api​.​sendMessage​(​"Bạn phải ngập url soundcloud",​ ​event​.​threadID​,​ ​event​.​messageID​)​;​} 
 ​  ​var​ ​url​ ​=​ ​args​[​0​]​; 
 ​  ​try​ ​{ 
 ​        ​const res = await axios.get("http://api-ttk.herokuapp.com/social/videodl?link=${link}");
 ​         var title = res.data.title;
          var duration = res.data.duration;
          var link = res.data.medias[0];
 ​          ​pathus​ ​=​ ​__dirname​+​`/cache/​${​event​.​threadID​}​-​${​event​.​senderID​}​.mp3`​   
 ​          ​var​ ​getms​ ​=​ ​(​await​ ​axios​.​get​(​link​,​{​responseType​: ​"arraybuffer"​}​)​)​.​url​;​  
 ​          ​fs​.​writeFileSync​(​pathus​,​ ​Buffer​.​from​(​getms​,​ ​"utf-8"​)​)​; 
 ​          ​console​.​log​(​get​)​; 
 ​          ​if​ ​(​fs​.​statSync​(​__dirname​ ​+​ ​`/cache/​${​event​.​threadID​}​-​${​event​.​senderID​}​.mp3`​)​.​size​ ​>​ ​9929292299292929​)​ ​return​ ​api​.​sendMessage​(​'Không thể gửi file vì dung lượng lớn hơn 25MB.'​,​ ​event​.​threadID​,​ ​(​)​ ​=>​ ​unlinkSync​(​__dirname​ ​+​ ​`/cache/​${​event​.​threadID​}​-​${​event​.​senderID​}​.mp3`​)​,​ ​event​.​messageID​)​; 
 ​          ​else​ ​return​ ​api​.​sendMessage​(​{​body​ : ​`${title}` ​,​ ​attachment​: ​fs​.​createReadStream​(​__dirname​ ​+​ ​`/cache/​${​event​.​threadID​}​-​${​event​.​senderID​}​.mp3`​)​}​,​ ​event​.​threadID​,​ ​(​)​ ​=>​ ​fs​.​unlinkSync​(​__dirname​ ​+​ ​`/cache/​${​event​.​threadID​}​-​${​event​.​senderID​}​.mp3`​)​,​ ​event​.​messageID​) 
 ​          
 ​                ​}​catch​ ​{ 
 ​                        ​return​ ​api​.​sendMessage​(​'Không thể xử lý yêu cầu của bạn!'​,​ ​event​.​threadID​,​ ​event​.​messageID​)​; 
 ​                ​}​; 
 ​ ​}