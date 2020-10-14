let palettes = new Map();

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