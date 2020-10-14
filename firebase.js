var fdb;
var commentsRef;

function initFirebase() {
    async function load_scripts(script_urls) {
        function load(script_url) {
            return new Promise(function(resolve, reject) {
                if (load_scripts.loaded.has(script_url)) {
                    resolve();
                } else {
                    var script = document.createElement('script');
                    script.onload = resolve;
                    script.src = script_url
                    document.head.appendChild(script);
                }
            });
        }
        var promises = [];
        for (const script_url of script_urls) {
            promises.push(load(script_url));
        }
        await Promise.all(promises);
        for (const script_url of script_urls) {
            load_scripts.loaded.add(script_url);
        }
    }
    load_scripts.loaded = new Set();

    (async () => {
		await load_scripts([
			'https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js',
			'https://www.gstatic.com/firebasejs/7.20.0/firebase-database.js',
		]);
		
		firebase.initializeApp(CONFIG.firebase);
		fdb = firebase.database();
		commentsRef = fdb.ref('dbz/comments');
		notifsRef = fdb.ref('dbz/notifs');
		console.log('firebase ok');
		//loadExistingUsers();
		//listenForUserEvents();
	})();		
}

/**
function listenForUserEvents() {
	var ur = fdb.ref('dbz/users/');
	ur.on('child_added', addUsersToSubscribed);

	ur.on('child_changed', addUsersToSubscribed);

	ur.on('child_removed', function(childSnapshot) {
	  subscribedPlayers.delete(childSnapshot.key)
	});
}

function addUsersToSubscribed(childSnapshot) {
	var v = childSnapshot.val();
	var k = childSnapshot.key;
	if (subscribedPlayers.has(k)) {
		var ex = subscribedPlayers.get(childSnapshot.key);
		ex.name = v.name;
        ex.position = v.position;
        ex.shortname = v.shortname!=undefined?v.shortname:"";
		subscribedPlayers.set(childSnapshot.key, ex);
	} else {
        subscribedPlayers.set(childSnapshot.key, {
             "name": v.name,
             "position": v.position,
             "shortname": v.shortname!=undefined?v.shortname:"" 
            }); 
	}
}

function loadExistingUsers() {
    fdb.ref('dbz/users/').orderByChild('position').once('value', function(snapshot) {
        snapshot.forEach(addUsersToSubscribed);
      });
      ;
}

function writeUser(auth, name) {
  fdb.ref('dbz/users/' + auth).set({
    name: name,
	position: subscribedPlayers.size-1
  });
}

function deleteUser(auth) {
  fdb.ref('dbz/users/' + auth).remove();
}
 */

function writeLog(p, msg) {
 //  commentsRef.push({name: p.name, auth:auth.get(p.id), msg:msg, time:Date.now(), formatted:(new Date(Date.now()).toLocaleString())});
}
