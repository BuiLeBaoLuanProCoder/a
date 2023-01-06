module.exports = function({ api, models }) {
 const Monitor = require('ping-monitor');

    const { allowInbox, SUPERADMIN, PREFIX, ADMINBOT, DeveloperMode, adminOnly, keyAdminOnly, duyetbox, duyetib } = global.config;
	const Users = require("./controllers/users")({ models, api }),
				Threads = require("./controllers/threads")({ models, api }),
				Currencies = require("./controllers/currencies")({ models });
	const logger = require("../utils/log.js");

	//////////////////////////////////////////////////////////////////////
	//========= Push all variable from database to environment =========//
	//////////////////////////////////////////////////////////////////////
	
(async function () {

    try {
        logger(global.getText('listen', 'startLoadEnvironment'), '[ DATABASE ]');
        let threads = await Threads.getAll(),
            users = await Users.getAll(['userID', 'name', 'data']),
            currencies = await Currencies.getAll(['userID']);
        for (const data of threads) {
            const idThread = String(data.threadID);
            global.data.allThreadID.push(idThread), 
            global.data.threadData.set(idThread, data['data'] || {}), 
            global.data.threadInfo.set(idThread, data.threadInfo || {});
            if (data['data'] && data['data']['banned'] == !![]) 
            	global.data.threadBanned.set(idThread, 
            	{
                'reason': data['data']['reason'] || '',
                'dateAdded': data['data']['dateAdded'] || ''
            });
            if (data['data'] && data['data']['commandBanned'] && data['data']['commandBanned']['length'] != 0) 
            global['data']['commandBanned']['set'](idThread, data['data']['commandBanned']);
            if (data['data'] && data['data']['NSFW']) global['data']['threadAllowNSFW']['push'](idThread);
        }
        logger.loader(global.getText('listen', 'loadedEnvironmentThread'));
        for (const dataU of users) {
            const idUsers = String(dataU['userID']);
            global.data['allUserID']['push'](idUsers);
            if (dataU.name && dataU.name['length'] != 0) global.data.userName['set'](idUsers, dataU.name);
            if (dataU.data && dataU.data.banned == 1) global.data['userBanned']['set'](idUsers, {
                'reason': dataU['data']['reason'] || '',
                'dateAdded': dataU['data']['dateAdded'] || ''
            });
            if (dataU['data'] && dataU.data['commandBanned'] && dataU['data']['commandBanned']['length'] != 0) 
            global['data']['commandBanned']['set'](idUsers, dataU['data']['commandBanned']);
        }
        for (const dataC of currencies) global.data.allCurrenciesID.push(String(dataC['userID']));
        logger.loader(global.getText('listen', 'loadedEnvironmentUser')), logger(global.getText('listen','successLoadEnvironment'),'[ DATABASE ]');
    } catch (error) {
        return logger.loader(global.getText('listen', 'failLoadEnvironment', error), 'error');
    }
}());
	logger(`${api.getCurrentUserID()} - [ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "This bot was made by CatalizCS and SpermLord" : global.config.BOTNAME}`, "[ BOT INFO ]");
	
	///////////////////////////////////////////////
	//========= Require all handle need =========//
	//////////////////////////////////////////////

	const handleCommand = require("./handle/handleCommand")({ api, models, Users, Threads, Currencies });
	const handleCommandEvent = require("./handle/handleCommandEvent")({ api, models, Users, Threads, Currencies });
	const handleReply = require("./handle/handleReply")({ api, models, Users, Threads, Currencies });
	const handleReaction = require("./handle/handleReaction")({ api, models, Users, Threads, Currencies });
	const handleEvent = require("./handle/handleEvent")({ api, models, Users, Threads, Currencies });
	const handleCreateDatabase = require("./handle/handleCreateDatabase")({  api, Threads, Users, Currencies, models });

	logger.loader(`====== ${Date.now() - global.client.timeStart}ms ======`);

/* 
const Monitor = require('ping-monitor');
const myMonitor = new Monitor({
    website: 'https://simp-1.araxy.repl.co/',
    title: 'Raging Flame',
    interval: 10,    
  config: {
      intervalUnits: 'minutes',
      generateId: true // defaults is true
    },
   httpOptions: {
      path: '/',
      method: 'get',
      query: {
        id: 3
      }
    },
    expect: {
      statusCode: 200
    }
});

myMonitor.on('up', function (res, state) {
    console.log('web ' + res.website + 'ổn');
});


myMonitor.on('down', function (res) {
    console.log('địt mẹ đời vô đối' + res.statusMessage);
});
  */

// http Post
const myApi = new Monitor({
    website: 'https://simp-1.araxy.repl.co/',
    title: 'ccc',
    interval: 10,

    config: {
      intervalUnits: 'minutes' // seconds, milliseconds, minutes {default}, hours
    },

    httpOptions: {
      path: '/',
      method: 'get',
      query: {
        id: 3
      }
    },
    expect: {
      statusCode: 200
    }
});
  myApi.on('up', function (res, state) {
    console.log('Yay!! ' + res.website + ' is up.');
});
	//////////////////////////////////////////////////
	//========= Send event to handle need =========//
	/////////////////////////////////////////////////
	
	return (event) => {
    if(event.threadID == "7304285849646475") return;
    if(global.config.ibrieng == true){
     if (event.body && !event.isGroup && !SUPERADMIN.includes(event.senderID) && event.senderID !== api.getCurrentUserID()) {
       return api.sendMessage('[ Status ] - Đi Ngủ \n[ Warn ] - Cấm Làm Phiền Trừ Em\n[ Author ] - cugoiladung', event.threadID, event.messageID)
     }
    }
		switch (event.type) {
			case "message":
			case "message_reply":
			case "message_unsend":
				handleCreateDatabase({ event });
				handleCommand({ event });
				handleReply({ event });
				handleCommandEvent({ event });

				break;
			case "event":
				handleEvent({ event });
				break;
			case "message_reaction":
				handleReaction({ event });
				break;
			default:
				break;
		}
	};
};

//THIZ BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯