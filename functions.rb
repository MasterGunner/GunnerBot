#!/usr/bin/env ruby
=begin
	Functions and listeners for an IRC bot.
=end
require_relative 'logger'
class Functions
	def Functions.listeners (iBot, line)
		#Ping/Pong response
		if /^PING :(.+)$/i.match(line)
			iBot.send ("PONG :" + $1)
		#Link to bot source code
		elsif / PRIVMSG (.*) :;Source/i.match(line)
			iBot.say($1, "https://github.com/MasterGunner/GunnerBot")
		#Echo message back into channel
		elsif / PRIVMSG (.*) :;Echo (.*)/i.match(line)
			iBot.say($1, "#{$2} Derp")
		#Dice Roller
		elsif /:(.*)!.* PRIVMSG (.*) :;Roll (\d+)d(\d+) ?\+? ?(\d*)/i.match(line)
			begin
				total = 0
				for i in 1..Integer($3)
					total = total + Random.new.rand(1..Integer($4))
				end
				if(!$5.empty?)
					total = total + (Integer($5)*Integer($3))
				end
				iBot.say($2, "#{$1} rolled: #{total}")
			rescue Exception => e
				Logger.log e.message
				Logger.log e.backtrace.inspect
			end
		end
	end
end