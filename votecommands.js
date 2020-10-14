var currentVote = null;

var voteCommands = {
    yes: function (p) 
    {   
        if (currentVote!=null) {
            currentVote.addYes(p);
            announce("your vote has been taken into account");
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
    loadmap: function(p, mapname)
    {
        console.log(arguments);
        loadMap(mapname[0]);
    }
};