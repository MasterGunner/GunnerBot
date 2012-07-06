class Logger
	def Logger.log (message)
		File.new("LOG_#{Time.new.strftime("%Y-%m-%d")}.txt", "a").syswrite("#{Time.new.strftime("%H:%M:%S")}: #{message.chomp}\r\n")
	end
end
