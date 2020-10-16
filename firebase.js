var fdb;
var commentsRef;
var notifsRef;
var modsRef;

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
    modsRef = fdb.ref('dbz/mods');
		console.log('firebase ok');
		loadExistingMods();
		listenForModsEvents();
	})();		
}


function listenForModsEvents() {
	modsRef.on('child_added', addNewMod);
}

function addNewMod(childSnapshot) {
	var v = childSnapshot.val();
	var k = childSnapshot.key;

  addMod(k,v.json);
  currMod = k;
  console.log("mod version `"+k+"`has been added to memory");
  notifyAdmins("mod version `"+k+"`has been added to memory");
}

function loadExistingMods() {
    modsRef.orderByKey().once('value', function(snapshot) {
        snapshot.forEach(addNewMod);
      });
      
}


function writeLog(p, msg) {
   commentsRef.push({name: p.name, auth:auth.get(p.id), msg:msg, time:Date.now(), formatted:(new Date(Date.now()).toLocaleString())});
}
