require 'socket'

class IRC
		@@s = nil
	def initialize (server, port, nick, chan)
		@@server = server
		@port = port
		@nick = nick
		@chan = chan
	end
	def connect
		puts "Connecting..."
		@@s = TCPSocket.open(@@server, @port)
		sleep(1)
		send "NICK #{@nick}"
		send "USER #{@nick} 8 *:Node.js IRC bot"
		sleep(3)
		send "JOIN #{@chan}"
	end
	def close
		@@s.close
	end
	def read
		return @@s.gets.chomp
	end
	def send (message)
		@@s.send "#{message}\r\n", 0
		puts "SENT - #{message}"
	end
	def say (channel, message)
		@@s.send "PRIVMSG #{channel} :#{data}\r\n"
		puts "SENT(#{channel}) - #{data}"
	end
end

SERVER = "irc.desertbus.org"
PORT = 6667
NICK = "RubyGunner"
CHAN = "#desertbus"

iBot = IRC.new(SERVER, PORT, NICK, CHAN)
iBot.connect
while (line = iBot.read)
	puts "RECV - " + line
	if /^PING :(.+)$/i.match(line)
		iBot.send ("PONG :" + $1)
	end
end
iBot.close