module GunnerBot {
    export module Functions.Modules.Help {
        export function run(commandChar): void {
            irc.addListener('Functions', new RegExp(" PRIVMSG (.*) :"+commandChar+"(Functions|Modules|Commands) ?$",'i'), function(info) {
                var commands:string[] = irc.listeners.map(x => x[0]);
                var hiddenCommands:string[] = ['PingPong', 'OnDisconnect'];
                commands = commands.filter(function(x) { return hiddenCommands.indexOf(x) < 0});
                
                irc.say(info[1], 'Available Commands Are: '+ commands.join(', '));
            });
            
            irc.addListener('Help', new RegExp(" PRIVMSG (.*) :"+commandChar+"Help (.*)$",'i'), function(info) {
                var commands:string[] = irc.listeners.map(x => x[0].toLowerCase()); //Retrieve array of Command names for searching.
                var command:any[] = irc.listeners[commands.indexOf(info[2].toLowerCase())]; //Find the location of the matching Command in the listeners array.
                
                if (command !== undefined) {
                    irc.say(info[1], command[3]); //Return the help message of the located command.
                } else {
                    irc.say(info[1], "No help message found for provided command.");
                }
            }, "...");
        }
    }
}