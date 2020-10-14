var currentVote = null;

var voteCommands = {
    yes: function (p) 
    {   
        if (currentVote!=null) {
            currentVote.addYes(p);
            announce("your vote has been taken into account", p);
            return;
        }
    },
    no: function (p) 
    {   
        if (currentVote!=null) {
            currentVote.addNo(p);
            return;
        }
    },
    map: function(p, mapname)
    {
        console.log(mapname);
        //loadMap(mapname[0]);
    },
    help: function(p, commandName)
    {        
        if (name==null || name=='') {
            announce("general commands: '!help' '!map'", p);
            if (currentVote!=null) {
                announce("votes possible: '!yes' '!no'", p);
            }
            if (p.admin) {
                announce("admin commands: '!map'", p);
            }
        } else {
            const name = commandName[0][0]=="!"?commandName[0].substr("!"):commandName[0];
            const existCommands = commandHelp[name];
            if (existCommands!=null) {
                existCommands(p);
            } else {
                announce("unrecognised command '"+name+"'", p);
            }
            
        }
        
    }
};