let admins = new Set(CONFIG.admins);

let auth = new Map();
var fdb;

var commentsRef;
var notifsRef;

var commands;

(async function () {
	console.log("Running Server...");
	var room = WLInit({
		token: window.WLTOKEN,
		roomName: "WebLiero Z [Beta]",
		maxPlayers: 12,	
		public: CONFIG.public
	});

	room.setSettings({
		scoreLimit: 10,
		timeLimit: 10,
		gameMode: "dm",
		levelPool: "rng",
		respawnDelay: 3,
		bonusDrops: "health",
		teamsLocked: false,
	});
	window.WLROOM = room;

	room.onRoomLink = (link) => console.log(link);
	room.onCaptcha = () => console.log("Invalid token");
})();