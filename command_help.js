var commandHelp = {
    yes: function (p) {

    },
    no: function (p) {

    },
    map: function (p) {
        if (p.admin) {
            announce("usage: `!map name.png`", p);
            announce("ex: `!map lookout.png`   `!map lookout_ext.png fish`", p);
        }
    },
    mod: function (p) {

    },
};
