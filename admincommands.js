var adminCommands = {
    map: function (p, mapname, next = false) 
    {   
        if (next== false) {
            if (mapname[0]=="random") {
                loadRandomMap();
                return;
            }
            console.log(arguments);
            loadMap(mapname[0]);
            return;
        } else {
            if (mapname=="random") {
                mapname=getRandomMapName();
            }
            announce("the map "+mapname+" has been queued to be played at the end of this match")
            executeOnNext.add(function(){this.map(p, mapname);})
        }
           
    }
};

