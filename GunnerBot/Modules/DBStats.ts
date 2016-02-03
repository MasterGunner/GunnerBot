module GunnerBot {
    export module Functions.Modules.DBStats {
        //Return some stats for a DB Driver, using this spreadsheet: 
        //https://docs.google.com/spreadsheets/d/1Jqx9QS5_OxoYzYxu2GpEDDEkQs57mFpV4E2DB7KmyfY
        export function run(commandChar): void {
            irc.addListener('DBStats', new RegExp(" PRIVMSG (.*) :"+commandChar+"DBStats ?$",'i'), function(info) {
                DBStats(info);
            });
        }
        
        function DBStats(info): void {
            return;
        }
    }
}