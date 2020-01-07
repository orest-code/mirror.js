
module.exports.run = async (bot, message, args, database) => {
	if (args[0]) {
		database.getGuildData(msg.guild).prefix = args[0];
		await message.channel.send(`Новый префикс для команд: '${args[0]}'`);
	}
}
