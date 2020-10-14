function loadMod(mod) {
    window.WLROOM.loadMod(mod);
}

function makeModZip(basemod, sprites) {
    var mdzip = new JSZip();
    mdzip.file('mod.json5',basemod);

    mdzip.file('sprites.wlsprt', sprites, {binary:true});
    return mdzip.generate({type:"arraybuffer"});
}