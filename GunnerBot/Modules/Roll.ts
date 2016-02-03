module GunnerBot {
    export module Functions.Modules.Roll {
        //Dice Roller
        export function run(commandChar): void {
            irc.addListener('Roll', new RegExp(":(.*)!.* PRIVMSG (.*) :"+commandChar+"Roll (\\d+)d(\\d+)\\s*\\+?\\s*(\\d*)",'i'), function(info) {
                Roll(info);
            }, "Roll some die. Usage: "+commandChar+"Roll xdy + z");
        }
        
        function Roll(info): void {
            Utilities.log('Entered Roller');
            var total = 0;
            if(info[3] > 100 || info[4] > 100 ) { //So people don't break things.
                total = (info[4]/2+0.5)*info[3];
            } else { //Normal operation.
                for (var i = 0; i < info[3]; i++) {
                    total = total + Math.floor(Math.random() * info[4]) + 1;
                }
            }
            if(info[5]) {
                total = total + info[5];
            }
            irc.say(info[2], '' + info[1] + ' rolled: ' + total);
        }
    }
}