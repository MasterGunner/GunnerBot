require_relative 'functions'

def dieRoll(sides, mod)
	total = Random.new.rand(1..Integer(sides))
	if(!mod.empty?)
		total = total + Integer(mod)
	end
	return total
end

while (line = ":MG!MG PRIVMSG #test :" + gets.chomp)
	if /:(.*)!.* PRIVMSG (.*) :;Roll(Each)? (\d+)d(\d+) ?\+? ?(\d*)/i.match(line)
		if (Integer($5) > 0 && Integer($5) < 1001 && Integer($4) > 0 && Integer($4) < 1001)
			Logger.log "RECV - " + line
			total = 0
			rolls = []
			if $3.nil?
				for i in 1..Integer($4)
					total = total + dieRoll($5, $6)
				end
				puts("#{$1} rolled: #{total}")
			else
				for i in 1..Integer($4)
					rolls << dieRoll($5, $6)
				end
				puts("#{$1} rolled: #{rolls}")
			end
		else
			puts("#{1.chr}ACTION Slaps #{$1}#{1.chr}")
		end
	end
end