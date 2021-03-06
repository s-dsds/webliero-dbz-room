initFirebase();
loadSplash(); 

window.WLROOM.onPlayerJoin = (player) => {
	if (admins.has(player.auth) ) {
		window.WLROOM.setPlayerAdmin(player.id, true);
	}
	auth.set(player.id, player.auth);
	writeLogins(player);

	announce("Welcome to the WebLiero Z room!", player, 2550000, "bold");
	announce("please join us on discord if you're not there yet! "+CONFIG.discord_invite, player, 2550000, "italic");
	if (player.auth){		
		auth.set(player.id, player.auth);
	}
}

window.WLROOM.onPlayerLeave = function(player) {  
	writeLogins(player, "logout");
	auth.delete(player.id);
	if (!hasActivePlayers()) {
	   loadSplash();
	}
}


window.WLROOM.onPlayerChat = function (p, m) {
	console.log(p.name+" "+m);
	if (m[0] == "!") {
		let splitted=m.substr(1).split(' ');
		if ((p.admin && command(adminCommands, p, splitted)) 
				||	(command(voteCommands, p, splitted))) {
			return false;
		}
	}
	writeLog(p,m);
}


window.WLROOM.onGameEnd = function() {		
    if (!hasActivePlayers()) {
		loadSplash();
		return;
	}
	flushScoreLogs();
}

window.WLROOM.onPlayerKilled = function(killed, killer) {
	addKill(killed, killer);
}

window.WLROOM.onGameStart = function() {
	startScoreLogs();
}

window.WLROOM.onGameEnd2 = function() {		
    if (hasActivePlayers()) {
	   loadRandomMap();
	   return;
    }
	loadSplash();
}

window.WLROOM.onPlayerTeamChange = function() {
	var act = hasActivePlayers();
	console.log(JSON.stringify(arguments));
	console.log(act);
	console.log(currState);
	console.log(currState==SPLASH_STATE);
    if (currState==SPLASH_STATE && act) {
        loadRandomMap();
    }
}

function announce(msg, player, color, style) {
	window.WLROOM.sendAnnouncement(msg, player.id, color!=null?color:parseInt("0xb2f1d3"), style !=null?style:"", 1);
}
function notifyAdmins(msg, logNotif = false) {
	getAdmins().forEach((a) => { window.WLROOM.sendAnnouncement(msg, a.id); });
	if (logNotif) {
		notifsRef.push({msg:msg, time:Date.now(), formatted:(new Date(Date.now()).toLocaleString())});
	}
}

function getAdmins() {
	return window.WLROOM.getPlayerList().filter((p) => p.admin);
}


function command(commands, p, commandText) {
	console.log(`Command: ${commandText.join(" ")}`);
	const command = commands[commandText[0]];
	if (command == null) {
		console.log(`Unrecognized command: ${commandText[0]}`, p.id);
		return false;
	} else {
		try {
			command(p, commandText.splice(1));
		}
		catch (e) {
			if (e instanceof Error) {
				console.log(e);
				notifyAdmins(`Error: ${e.message}`);
			}
			else {
				notifyAdmins(`Unknown Error!`);
			}
		}
	}
	return true;
}

function moveAllPlayersToSpectator() {
    for (let p of window.WLROOM.getPlayerList()) {
        window.WLROOM.setPlayerTeam(p.id, 0);
    }
}

function hasActivePlayers() {
	return getActivePlayers().length != 0;
}

function getActivePlayers() {
	return window.WLROOM.getPlayerList().filter(p => p.team !=0);
}