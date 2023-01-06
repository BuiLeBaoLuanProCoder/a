module.exports.config = {
	name: "reactpost",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "",
	description: "Reaction bài viết bằng id",
	commandCategory: "others",
	usages: "[postID] <reaction type>: (unlike/like/love/heart/haha/wow/sad/angry)",
	cooldowns: 1
};


module.exports.run = async ({ api, event, args }) => {
  const allType = "unlike/like/love/heart/haha/wow/sad/angry".split("/");
  const postID = args[0];
  const type = args[1];
  if (!postID || !type) return global.utils.throwError(this.config.name, event.threadID, event.messageID);
  if (!allType.includes(type)) return api.sendMessage(`Kiểu reaction không hợp lệ, vui lòng chọn 1 trong những kiểu sau: ${allType.join("/")}`, event.threadID, event.messageID);
  api.setPostReaction(Number(postID), type, (err, data) => {
    if (err) return api.sendMessage("Đã xảy ra lỗi, vui lòng kiểm tra postID và thử lại sau", event.threadID, event.messageID);
    api.sendMessage(`Đã thả cảm xúc ${type} cho bài viết mang id ${postID}`, event.threadID, event.messageID);
  });
};