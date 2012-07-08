require_relative 'logger'
while (line = gets.chomp)
	if /(R)(o)ll (\d+)d(\d+) ?\+? ?(\d*)/i.match(line)
		begin
			total = 0
			for i in 1..Integer($3)
				total = total + Random.new.rand(1..Integer($4))
			end
			if(!$5.empty?)
				total = total + (Integer($5)*Integer($3))
			end
			puts("I rolled: #{total}")
		rescue Exception => e
				puts e.message
				puts e.backtrace.inspect
				puts $3
				puts $4
		end
	end
end