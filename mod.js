function loadMod(mod) {
    console.log("loading mod");
    window.WLROOM.loadMod(mod);
}

function makeModZip(basemod, sprites) {
    console.log("building zip");
    var mdzip = new JSZip();
    mdzip.file('mod.json5',basemod);

    mdzip.file('sprites.wlsprt', sprites, {binary:true});
    return mdzip.generate({type:"arraybuffer"});
}