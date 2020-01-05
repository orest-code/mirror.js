const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const { Client, RichEmbed } = require('discord.js');
const fs = require("fs");
const newUsers = [];
const ms = require("ms");


client.login(process.env.TOKEN);


client.on("ready", () => {
  console.log(
    "Bot: MIRROR " +
      `${client.users.size}` +
      " users, in " +
      `${client.channels.size}` +
      " channels of " +
      `${client.guilds.size}` +
      " guilds."
  );

  //bot status
  client.user.setStatus("online");
  client.user.setPresence({
    game: {
      name: "m!help",
      type: "STREAMING",
      url:
        "https://www.youtube.com/channel/UCjjsEnIg5cDkw35UCD35bUA?view_as=subscriber"
    }
  });
});


//bot mention
client.on('message', message => {
  if (message.content === '<@632570913858125824>') {
    message.channel.send('**Чтобы посмотреть список коммадн напишите  ``m!help``**');
  }
});



//commands
client.on("message", async message => {
  
  if(message.author.bot) return;
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  //help command
    if(command ==="help") {
          const embed = new RichEmbed() 
      .setTitle('Список комманд:')
      .setColor(0x8b00ff)
      .setDescription('**m!avatar [пользователь] \nm!say [сообщение] \nm!kick [пользователь] [причина] \nm!ban [пользователь] [причина] \nm!clear [2/100] \nm!ping \nm!vk \nm!telegram**');
    message.channel.send(embed);
  }
  //say command
    if(command === "say") {
    if(!message.member.roles.some(r=>["∞", "Owner"].includes(r.name)) )
      return message.channel.send("Извините, у вас нет разрешения для использования этой комманды!");
      
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});  
    message.channel.send(sayMessage);
  }
  
  
  //avatar command
    if(command === "avatar") {
       let user = message.mentions.users.first();
    if(!user) user = message.author;
    let color = message.member.displayHexColor;
    if (color == '#A020F0') color = message.member.hoistRole.hexColor;
    const embed = new Discord.RichEmbed()
                   .setImage(user.avatarURL)
                   .setColor(0x8b00ff)
    message.channel.send({embed});
  }

  
  //ping command
    if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`**Pong! ${m.createdTimestamp - message.createdTimestamp}ms**`);
  }
  
  
  //social network
    if(command === "vk") {
    message.channel.send('**Наша группа ВКонтакте - https://m.vk.com/mirrords**');
  }
    if(command === "telegram") {
    message.channel.send('**Наша группа Телеграмм - https://t.me/mirrords**')
  }
  
  
  //kick command
    if(command === "kick") {
    if(!message.member.roles.some(r=>["∞", "Owner", "Co-Owner", "Administrator", "Manager", "Moderator", "Junior Moderator"].includes(r.name)) )
      return message.channel.send("Извините, у вас нет разрешения для использование этой комманды!");
    
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.channel.send("Пожалуйста, укажите кого вы хотите кикнуть!");
    if(!member.kickable) 
      return message.channel.send("У вас недостаточно прав чтобы кикнуть этого пользователя!");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Причина не указана.";
    
    await member.kick(reason)
      .catch(error => message.channel.send(`Извините ${message.author} Я не могу кинуть из-за : ${error}`));
    message.channel.send(`${member.user.tag} был кикнут ${message.author.tag} по причине: ${reason}`);

  }
  
  
  //ban command
  if(command === "ban") {
    if(!message.member.roles.some(r=>["∞", "Owner", "Co-Owner" ,"Administrator", "Manager", "Moderator"].includes(r.name)) )
      return message.channel.send("Извините, у вас нет разрешения для использование этой комманды!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.channel.send("Пожалуйста, укажите кого вы хотите забанить!");
    if(!member.bannable) 
      return message.channel.send("У вас недостаточно прав чтобы забанить этого пользователя!");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Причина не указана.";
    
    await member.ban(reason)
      .catch(error => message.channel.send(`Извините ${message.author} я не мог забанить из-за : ${error}`));
    message.channel.send(`${member.user.tag} был забанен ${message.author.tag} по причине: ${reason}`);
  }
  
  //clear command
    if(command === "clear") {
      
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.channel.send("Пожалуйста, укажите сколько сообщений вы хотите удалить!");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.channel.send(`Couldn't delete messages because of: ${error}`));
  }
});
