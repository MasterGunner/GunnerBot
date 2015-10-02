#!/usr/bin/env ruby
=begin
	Functions and listeners for an IRC bot.
=end
require_relative 'logger'
class Functions
	@@commands = [";Source", ";Echo", ";PM", ";Roll", ";RollEach", ";Flirt", ";Takei", ";ledger"]
	@@flirtList = []
	@@kitteh = ""
	def Functions.listeners (iBot, line)
		begin
			#Ping/Pong response
			if /^PING :(.+)$/.match(line)
				iBot.send ("PONG :" + $1)
			
			#####Public Commands#####
			
			#List available commands
			elsif / PRIVMSG (.*) :;Help/i.match(line)
				Logger.log "RECV - " + line
				iBot.say($1, "Available Commands: #{@@commands}")
			#Link to bot source code
			elsif / PRIVMSG (.*) :;Source/i.match(line)
				Logger.log "RECV - " + line
				iBot.say($1, "https://github.com/MasterGunner/GunnerBot")
			#Send message to designated channel
			elsif / PRIVMSG .* :;PM (.*) (.*)/i.match(line)
				Logger.log "RECV - " + line
				iBot.say($1, "#{$2}")
			#Echo message back into channel
			elsif / PRIVMSG (.*) :;Echo (.*)/i.match(line)
				Logger.log "RECV - " + line
				iBot.say($1, "#{$2}")
			#Dice Roller
			elsif /:(.*)!.* PRIVMSG (.*) :;Roll(Each)? (\d+)d(\d+) ?\+? ?(\d*)/i.match(line)
				if (Integer($4) > 0 && Integer($4) < 1001 && Integer($5) > 0 && Integer($5) < 1001)
					Logger.log "RECV - " + line
					total = 0
					rolls = []
					Integer($4).times do
						total = total + dieRoll($5, $6)
						rolls << dieRoll($5, $6)
					end
					if $3.nil?
						iBot.say($2, "#{$1} rolled: #{total}")
					else
						iBot.say($2, "#{$1} rolled: #{rolls}")
					end
				else
					iBot.say($2, "#{1.chr}ACTION Slaps #{$1}#{1.chr}")
				end
			#Pet Kitteh
			elsif /:BlehBot!.* PRIVMSG .* :#{1.chr}ACTION POINTS AT (.*)/i.match(line) && !@@kitteh.empty?
				Logger.log "RECV - " + line
				@@kitteh = $1
			elsif /:BlehBot!.* PRIVMSG (.*) :(CRITICAL )?KITTEH$/i.match(line.chomp!) && !@@kitteh.empty?
				Logger.log "RECV - " + line
				iBot.say($1, "#{1.chr}ACTION pets #{@@kitteh}#{1.chr}")
			#Flirt
			elsif / PRIVMSG (.*) :;Flirt$/i.match(line)
				Logger.log "RECV - " + line
				iBot.say($1, "#{@@flirtList[Random.new.rand(1..@@flirtList.size) - 1]}")
			#Add to FlirtList
			elsif / PRIVMSG (.*) :;Flirt add (.+)/i.match(line)
				Logger.log "RECV - " + line
				File.new("flirt.txt", "a").syswrite("#{$1}\r\n")
				readList
				iBot.say($1, "Flirtation accepted.")
			#Oh My...
			elsif / PRIVMSG (.*) :;Takei/i.match(line)
				Logger.log "RECV - " + line
				iBot.say($1, "Oh My...")
			elsif / PRIVMSG (.*) :;ledger/i.match(line)
				Logger.log "RECV - " + line
				iBot.say($1, "https://docs.google.com/spreadsheet/ccc?key=0AlrZ426Ebyg1dEZHdUJ4REFuMEt3UTFiS1VqWVU4eWc")
			
			#####Administrative Commands#####
			
			#Join designated channel
			elsif /:MistressGunner!.* PRIVMSG .* :;Join (.*)/i.match(line)
				Logger.log "RECV - " + line
				iBot.send("JOIN #{$1}")
			#Leave channel
			elsif /:MistressGunner!.* PRIVMSG (.*) :;Part/i.match(line)
				Logger.log "RECV - " + line
				iBot.send("PART #{$1}")
			#Rejoin on disconnect
			elsif /^ERROR :Closing Link:/.match(line)
				sleep(5)
				iBot = IRC.new(SERVER, PORT, NICK, CHAN)
			end
		rescue Exception => e
		Logger.log e.message
		Logger.log e.backtrace.inspect
		end
	end
	
	def Functions.dieRoll(sides, mod)
		total = Random.new.rand(1..Integer(sides))
		if(!mod.empty?)
			total = total + Integer(mod)
		end
		return total
	end
	
	def Functions.readList
		IO.foreach("flirt.txt") do |line|
			line.chomp!
			if /^ACTION/.match(line)
				line = "#{1.chr}ACTION #{line}#{1.chr}"
			end
			@@flirtList << line
		end
	end
end
