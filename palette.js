let palettes = new Map();
var currPalette = "default";
var paletteStart = 9;

function invertPal(palette) {
    let invPal = new Map();

    for (let i = 0; i<palette.length; i++) {
        invPal.set(palette[i].join('_'),i);
    }
          
    return invPal;
}

function parseGimpPalette(txt) {
    const regex = /\d+/g;
    let lines = txt.split('\n');
    let parsed = [];
    for (var i = 0, len = lines.length; i < len; i++) {
        let matches = lines[i].match(regex);
        if (matches && matches.length==3) {
            parsed.push(matches);
        }
    }
    return parsed;
}


function addPalette(name, palette) {
    palettes.set(name, palette);
}

function getPalette(name) {
    return palettes.get(name);
}

function loadPalette(name) {
    let sprites = loadPaletteToSprites(base_sprites, name);
    loadMod(makeModZip(base_mod, sprites));
}

function loadPaletteToSprites(sprites, name) {
    let colors = palettes.get(name);
    let a = new Uint8Array(sprites);
        colors.forEach(function (value, i) {

        value.forEach(function (c, j) {
            a[i*3+paletteStart+j]=c;			
           // console.log(i*3+paletteStart+j);			
        });
		
    });
    return a.buffer;
}