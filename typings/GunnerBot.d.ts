/// <reference path="../typings/tsd.d.ts" />
declare module GunnerBot {
    module Utilities {
        function log(...message: any[]): void;
    }
}
declare var net: any;
declare module GunnerBot {
    module IRC {
        class IRC {
            socket: any;
            listeners: Array<any>;
            constructor();
            connect(server: string, port: number, channel: string, nick: string): void;
            join(channel: string): void;
            addListener(query: RegExp, callback: any, OnlyExecuteOnce: boolean): void;
            handle(message: string): void;
            send(message: string): void;
            say(channel: string, message: string): void;
        }
    }
}
declare var utilities: typeof GunnerBot.Utilities;
declare var ircModule: typeof GunnerBot.IRC;
declare var irc: GunnerBot.IRC.IRC;
declare module Xannathor {
}
