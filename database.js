const utils = require('./utils');

let guilds = {};

const load = async (path) => {
	console.log('attempt to load database...');
	let data;
	if (await utils.existsAsync(path)) {
		data = JSON.parse(await utils.readFileAsync(path));
	}
	// если файла database.js не существует, то юзаем стандартные данные
	else {
		data = { guilds: {} }
	}
	guilds = data.guilds;
	console.log('database successfully loaded!');
}

const save = async (path) => {
	console.log('attempt to save database...');
	let data = {
		guilds: guilds
	}
	await utils.writeFileAsync(path, JSON.stringify(data, null, 4));
	console.log('database successfully saved!');
}

const getGuildData = (guild) => {
	if (!guilds[guild.id]) {
		guilds[guild.id] = {
			prefix: '!',
			accounts: {}
		}
	}
	return guilds[guild.id];
} 

module.exports = {
	load: load,
	save: save,
	getGuildData: getGuildData
}
