module GunnerBot {
    export module Functions.Modules.Emojifi {
        var translate = require('moji-translate');

        export function run(commandChar): void {
            irc.addListener('DBStats', new RegExp(" PRIVMSG (.*) :"+commandChar+"Emojif(?:i|y) (.*) ?$",'i'), function(info) {
                Emojifi(info);
            });
        }
        
        function Emojifi(info): void {
            var emojifiedResponse = translate.translate(info[2], false);
            irc.say(info[1], emojifiedResponse);
        }
    }
}