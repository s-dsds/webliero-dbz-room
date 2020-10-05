initFirebase();
loadSplash(); 

window.WLROOM.onPlayerJoin = (player) => {
	if ( admins.has(player.auth) ) {
		window.WLROOM.setPlayerAdmin(player.id, true);
	}
	window.WLROOM.sendAnnouncement("Welcome to the DragonBall Z room!", player.id, 2550000, "bold", 1);
	window.WLROOM.sendAnnouncement("please join us on discord if you're not there yet! "+CONFIG.discord_invite, player.id, 2550000, "italic", 1);
	if (player.auth){		
		auth.set(player.id, player.auth);
	}
}

window.WLROOM.onPlayerLeave = function(player) {  
	auth.delete(player.id);
	if (!hasActivePlayers()) {
	   loadSplash();
	}
}


window.WLROOM.onPlayerChat = function (p, m) {
	console.log(p.name+" "+m);
	if (p.admin && adminCommand(p, m)) {
		return false;
	}
	writeLog(p,m);
}


window.WLROOM.onGameEnd = function() {		
    if (!hasActivePlayers()) {
        loadSplash();
    }
}

window.WLROOM.onGameEnd2 = function() {		
    if (hasActivePlayers()) {
       loadRandomMap();
    } else {
        loadSplash();
    }
}

window.WLROOM.onPlayerTeamChange = function() {
    var act = hasActivePlayers();
    if (state==SPLASH_STATE && act) {
        loadRandomMap();
    }
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


function adminCommand(p, m) {
	return false;
	return true;
}

function moveAllPlayersToSpectator() {
    for (let p of room.getPlayerList()) {
        window.WLROOM.setPlayerTeam(p.id, 0);
    }
}

function hasActivePlayers() {
	let activePlayers = window.WLROOM.getPlayerList().filter(p => p.team == 1);
	return activePlayers.length != 0;
}