require_relative 'logger'
require 'thread'
require 'socket'

class IRC < TCPSocket
	alias :super_send :send;
	def initialize (server, port, nick, chan)
		super(server, port)
		sleep(1)
		Logger.log "Connecting..."
		send "NICK #{nick}"
		send "USER #{nick} 8 *:Node.js IRC bot"
		sleep(3)
		send "JOIN #{chan}"
	end
	def send (message)
		super "#{message}\r\n", 0
		Logger.log "SENT - #{message}"
	end
	def say (channel, message)
		super_send "PRIVMSG #{channel} :#{message}\r\n", 0
		Logger.log "SENT(#{channel}) - #{message}"
	end
end

SERVER = "irc.desertbus.org"
PORT = 6667
NICK = "RubyGunner"
CHAN = "#desertbus"

@iBot = IRC.new(SERVER, PORT, NICK, CHAN)
def botRead
	Logger.log "In Thread"
	while (line = @iBot.gets)
		Logger.log "RECV - " + line
		if /^PING :(.+)$/i.match(line)
			@iBot.send ("PONG :" + $1)
		end
	end
end
def botWrite
	while (line = gets.chomp)
		if /^QUIT/.match(line)
			break
		end
		@iBot.say("#DesertBus", "#{line}")
	end
end
t1 = Thread.new{botRead}
botWrite
Thread.kill(t1)
@iBot.close
