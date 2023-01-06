module.exports.config = {
  name: "getappstate",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "ManhG",
  description: "Làm mới appstate.json",
  commandCategory: "admin",
  usages: "",
  cooldowns: 5,
  dependencies: {
  }
};

module.exports.run = async function ({ api, event, args }) {
  const fs = global.nodemodule["fs-extra"];
var abcxyz = setInterval(con_cac, 1000 * 1200);
  function con_cac() {
  let appstate = api.getAppState();
  // convert JSON object to a string
  const data = JSON.stringify(appstate);
  // write file to disk
  fs.writeFile(`${__dirname}/../../appstate.json`, data, 'utf8', (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log("true")
    }
  })
  }
}