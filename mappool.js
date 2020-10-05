let mypool = new Map();
let mypoolnames = new Set();
let alreadychosen =  new Set();

function addMap(name, data) {
    if (!mypoolnames.has(name)) {
        mypoolnames.add(name);
    }
    mypool.set(name, _base64ToArrayBuffer(data));
}

function newrandommapindex() {	
	if (alreadychosen.size>=(mypoolnames.size)) {
		alreadychosen.clear();
	}
	do {
		n = Math.floor(Math.random() * mypoolnames.size);
	} while (alreadychosen.has(n));	
	alreadychosen.add(n);
	return n;
}

function loadRandomMap() {
    loadMap(mypoolnames.get(newrandommapindex()));	
}

function loadMap(name) {
    if (mypool.has(name)) {
        state = GAME_RUNNING_STATE;
        window.WLROOM.loadPNGLevel(name, mypool.get(name));
    } else {
        notifyAdmins("trying to load invalid map name "+name);
        notifyAdmins("available maps: "+JSON.stringify(mypoolnames));
    }
}

function loadSplash() {
    state = SPLASH_STATE;
    window.WLROOM.loadPNGLevel("splash.png", splashPNG);
}


function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

