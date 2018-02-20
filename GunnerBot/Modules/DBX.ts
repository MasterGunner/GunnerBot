// module GunnerBot {
//     export module Functions.Modules.DBX {
//         //Misc libraries and stuff used for listeners.
//         var MarkovChain = require('markovchain')
//         var fs = require('fs')
//         var DBRecords = new MarkovChain(fs.readFileSync('./DBRecords.txt'))
        
//         //Create a Markov-Chained Desert Bus log.
//         export function run(commandChar): void {
//             irc.addListener('DBX', new RegExp(" PRIVMSG (.*) :"+commandChar+"DBX ?$",'i'), function(info) {
//                 DBX(info);
//             }, "Generate a predicted Desert Bus event. Usage: "+commandChar+"DBX");
//         }
        
//         function DBX(info): void {
//             var output = Math.floor(Math.random()*160) + ':' + ('0' + Math.floor(Math.random()*60)).slice(-2) + " - ";
//             if (Math.floor(Math.random()*100) == 1) {
//                 output += "Johnny's shift ends, Johnny's shift begins."
//             } else {
//                 output += DBRecords.start(function(wordList) { 
//                     var tmpList = Object.keys(wordList); 
//                     return tmpList[~~(Math.random()*tmpList.length)]; 
//                 }).end().process();
//             }
//             irc.say(info[1],output);
//         }
//     }
// }