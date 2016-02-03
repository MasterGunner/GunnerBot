module GunnerBot {
    export module Functions.Modules.Responses {
        //Dice Roller
        export function run(commandChar): void {
            irc.addListener('Responses', new RegExp(":(.*)!.* PRIVMSG (.*) :([^\s]+) ?$",'i'), function(info) {
                switch(info[3].toLowerCase()) {
                    case "Marp":
                        Marp(info[2], info[1]);
                        break;
                }
            });
        }
        
        function Marp(channel, user) {
            var result:number = Math.floor(Math.random() * 20) + 1;
            switch(true) {
                case (result == 1): 
                    irc.say(channel, user + " HAS TINNITUS!");
                    break;
                case (result < 10):
                    irc.say(channel, user + " /might/ have tinnitus.");
                    break;
                default:
                    irc.say(channel, user + " does NOT have tinnitus.");
            }
        }
    }
}