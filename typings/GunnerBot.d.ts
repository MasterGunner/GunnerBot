/// <reference path="../typings/tsd.d.ts" />
declare var fs: any;
declare module GunnerBot {
    module Utilities {
        var logFile: string;
        function log(...message: any[]): void;
    }
}
declare module GunnerBot {
    module Functions.Modules.DBStats {
        function run(commandChar: any): void;
    }
}
declare module GunnerBot {
    module Functions.Modules.Help {
        function run(commandChar: any): void;
    }
}
declare module GunnerBot {
    module Functions.Modules.Responses {
        function run(commandChar: any): void;
    }
}
declare module GunnerBot {
    module Functions.Modules.Roll {
        function run(commandChar: any): void;
    }
}
declare module GunnerBot {
    module Functions.Modules.Emojifi {
        function run(commandChar: any): void;
    }
}
declare module GunnerBot {
    module Functions {
        function RegisterListeners(): void;
    }
}
declare var net: any;
declare module GunnerBot {
    module IRC {
        class IRC {
            socket: any;
            listeners: Array<any>;
            constructor();
            startupConfig(): void;
            connect(server: string, port: number, channels: string[], nick: string): void;
            join(channel: string): void;
            leave(channel: string): void;
            addListener(name: string, query: RegExp, callback: any, helpText?: string): void;
            removeListener(name: string): void;
            handle(message: string): void;
            send(message: string): void;
            say(channel: string, message: string): void;
        }
    }
}
declare var utilities: typeof GunnerBot.Utilities;
declare var ircModule: typeof GunnerBot.IRC;
declare var irc: GunnerBot.IRC.IRC;
declare var args: string[];
declare var server: string;
declare var channels: string[];
