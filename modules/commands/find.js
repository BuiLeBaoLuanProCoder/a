module.exports.config = {
    name: "finduid",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Hanaku UwU",
    description: "tim id fb cua moi thu UvU",
    commandCategory: "Other",
    usages: "[id | link]",
    cooldowns: 5
};
module.exports.run = async function ({ api, event, args, utils  })  {
  const request = require('request')
const a = args.join(" ") || event.senderID;
  const { threadID, messageID } = event;
  if(!a.startsWith("https://")){
    var link = "https://facebook.com/" + a 
  } else {
    var link = a
  }
   var idfacebook = null;
    var post = link.match(/(.*)\/posts\/([0-9]{8,})/);
    var photo = link.match(/(.*)\/photo.php\?fbid=([0-9]{8,})/);
    var photo2 = link.match(/(.*)\/photo\/\?fbid=([0-9]{8,})/);
    var photo3 = link.match(/(.*)\/photo\?fbid=([0-9]{8,})/);
    var video = link.match(/(.*)\/video.php\?v=([0-9]{8,})/);
    var story = link.match(/(.*)\/story.php\?story_fbid=([0-9]{8,})/);
    var permalink = link.match(/(.*)\/permalink.php\?story_fbid=([0-9]{8,})/);
    var number = link.match(/(.*)\/([0-9]{8,})/);
    var comment = link.match(/(.*)comment_id=([0-9]{8,})/);
    var media = link.match(/(.*)media\/set\/\?set=a\.([0-9]{8,})/);
    var watch = link.match(/(.*)\/watch\/\?v=([0-9]{8,})/);
    if (comment) {
        idfacebook = comment[2]
    } else if (photo) {
        idfacebook = photo[2]
    } else if (photo2) {
        idfacebook = photo2[2]
    } else if (photo3) {} else if (video) {
        idfacebook = video[2]
    } else if (story) {
        idfacebook = story[2]
    } else if (permalink) {
        idfacebook = permalink[2]
    } else if (number) {
        idfacebook = number[2]
    } else if (media) {
        idfacebook = media[2]
    } else if (watch) {
        idfacebook = watch[2]
    } else if (post) {
        idfacebook += '_' + post[2]
    };
    if (idfacebook == null) {
        var username = link
        const options = {
            method: 'POST',
            url: 'https://id.traodoisub.com/api.php',
            headers: {
                'referer': 'https://id.traodoisub.com/?link=' + username,
            },
            form: {
                link: username
            }
        };
        request(options, function(error, response, body) {
            try {
                const data = JSON.parse(body)
                return api.sendMessage(`${data.id}`,threadID, messageID)
            } catch (e) {
                console.log('UID' + e)
            }
        });
    } else return api.sendMessage(`${idfacebook}`,threadID, messageID)
}