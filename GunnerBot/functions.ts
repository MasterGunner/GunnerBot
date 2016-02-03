/// <reference path="../typings/tsd.d.ts" />
/// <reference path="Modules/_Modules.ts" />

module GunnerBot {
	export module Functions {
        //Load modules
        var modules = GunnerBot.Functions.Modules;
        
        //Command Character
        var commandChar:string = ';';
        
        export function RegisterListeners(): void {
            /*
             * ADMINISTRATIVE LISTENERS
             */
            
            //Register listener for joining designated channel
            //this.addListener(/:MistressGunner!.* PRIVMSG (.*) :;Join (.*)/i, function(info) {
            irc.addListener('JoinChannel', new RegExp(" PRIVMSG (.*) :"+commandChar+"Join (.*)",'i'), function(info) {
                irc.join(info[2]);
            }, "Make GunnerBot join a new channel. Usage: "+commandChar+"Join #Channel");
            
            //Leave designated channel
            irc.addListener('LeaveChannel', new RegExp(" PRIVMSG (.*) :"+commandChar+"Leave ?$",'i'), function(info) {
                irc.leave(info[1]);
            }, "Make GunnerBot leave the channel. Usage: "+commandChar+"Leave");
            
            //Echo whatever was said in the same channel the command was given on
            irc.addListener('Echo', new RegExp(" PRIVMSG (.*) :"+commandChar+"Echo (.*)",'i'), function(info) {
                irc.say(info[1], info[2]);
            }, "Echo the provided text. Usage: "+commandChar+"Echo DerpDerpDerp");
            
            //Leave designated channel
            irc.addListener('LeaveChannel', new RegExp(" PRIVMSG (.*) :"+commandChar+"Source ?$",'i'), function(info) {
                irc.say(info[1], "Don't judge me! https://github.com/MasterGunner/GunnerBot.git");
            });
            
            /*
             * GENERAL FUNCTIONS
             */
            
            //Help command.
            modules.Help.run(commandChar);
            
            //Respond to specific cues.
            modules.Responses.run(commandChar);
            
            //Create a Markov-Chained Desert Bus log.
            modules.DBX.run(commandChar);
            
            //Roll command.
            modules.Roll.run(commandChar);
            
        }
    }
}