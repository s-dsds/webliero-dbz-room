var adminCommands = {
    map: function (p, mapname) 
    {   
        const name = mapname[0];
        
        if (name=="random") {
            loadRandomMap();
            return;
        }
        /*
            if (mapname[0]=="db") {
                loadRandomMap();
                return;
            } 
            if (mapname[0]=="pool") {
                loadRandomMap();
                return;
            }
            if (mapname[0]=="rng") {
                loadRandomMap();
                return;
            }
            if (mapname[0]=="rngdb") {
                loadRandomMap();
                return;
            }              
            
        */
    
       const variation = (mapname.length>1)?mapname[1]:'';
       loadMap(name, variation);
    },
    pal: function (p, modname)
    {

    },
    next: function (p, params)
    {
        executeOnNext.add({"params":params, "player":p});
        announce("your command has been queued to be launched after the end of current match");
    }
};

