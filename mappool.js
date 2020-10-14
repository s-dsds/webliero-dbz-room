let mypool = new Map();
let mypoolnames = new Set();

let alreadychosen =  new Set();

function addMap(name, data, palette = null) {
    if (!mypoolnames.has(name)) {
        mypoolnames.add(name);
    }
    mypool.set(name, {
        name: name,
        data:_base64ToArrayBuffer(data),
        palette: (palette != null && palette!='')?palette:'default'
    });
}

function newrandommapindex() {	
    var n;
	do {
		n = Math.floor(Math.random() * mypoolnames.size);
	} while (alreadychosen.has(n));	
    alreadychosen.add(n);
    if (alreadychosen.size>=(mypoolnames.size)) {
		alreadychosen.clear();
	}
	return n;
}

function getRandomMapName() {
   return mypoolnames.getByIdx(newrandommapindex());
}

function loadRandomMap() {
    console.log(newrandommapindex());    
    loadMap(getRandomMapName());	
}

function loadMap(name) {
    if (mypool.has(name)) {
        currState = GAME_RUNNING_STATE;
        window.WLROOM.loadPNGLevel(name, mypool.get(name));
    } else {
        notifyAdmins("trying to load invalid map name "+name);
        notifyAdmins("available maps: "+JSON.stringify(mypoolnames));
    }
}

function loadSplash() {
    currState = SPLASH_STATE;
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

Set.prototype.getByIdx = function(idx){
    if(typeof idx !== 'number') throw new TypeError(`Argument idx must be a Number. Got [${idx}]`);
  
    let i = 0;
    for( let iter = this.keys(), curs = iter.next(); !curs.done; curs = iter.next(), i++ )
      if(idx === i) return curs.value;
  
    throw new RangeError(`Index [${idx}] is out of range [0-${i-1}]`);
  }
  