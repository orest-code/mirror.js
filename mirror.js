const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js'); 
const ms = require("ms");
const fs = require('fs');


client.login(process.env.MIRROR);


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
      name: "/help",
      type: "STREAMING",
      url:
        "https://www.youtube.com/channel/UCjjsEnIg5cDkw35UCD35bUA?view_as=subscriber"
    }
  });
});


//welcome message
client.on("guildMemberAdd", (member) => {
  let guild = member.guild;
  let memberid = member.user.id;
  let facts = [" **Приветик! Я рад вас здесь видеть ❤️**", " **Приветик! Я рад что вы зашли на наш сервер ❤️**", " **Приветик! Надеюсь вам понравится наш сервер ❤️**"];
  let fact = Math.floor(Math.random() * facts.length);
  if (guild.systemChannel) {
    guild.systemChannel.send("<@" + memberid + ">" + facts[fact])
  }
});


//leave message
client.on("guildMemberRemove", (member) => {
  let guild = member.guild; 
  let membertag = member.user.tag;
  let facts = [" **Надеюсь мы ещё увидимся 💔**", " **Покинул сервер 💔**", " **Мы всегда рады если ты захочешь вернуться 💔**"];
  let fact = Math.floor(Math.random() * facts.length);
  if(guild.systemChannel){
    guild.systemChannel.send(membertag + facts[fact]);
  }
});


//nitro booster message
client.on('nitroBoost', (booster) => {
   bot.channels.get('604372242763350057').send(`${booster} пробустил сервер!`)
   booster.addRole(booster.guild.roles.find(a => a.name === '『 Nitro Booster 』'))
})


//discord invites
client.on('message', (message) => { 
  if (message.content.includes('discord.gg/'||'discordapp.com/invite/')) { //if it contains an invite link 
    const arrayOfUsersIds = ['595030276804050945', '472320129514864651'];

    for (let i = 0; i < arrayOfUsersIds.length; i++) {
    if (message.author.id === arrayOfUsersIds[i]) return;
  };
    message.delete() //delete the message 
      .then(message.channel.send("<@" + message.author.id + ">" + " **Пожалуйста, не отправляйте приглашения в чат!**"))
  }
});


//bot mention
client.on('message', message => {
  if (message.content === '<@632570913858125824>') {
   message.channel.send("**Чтобы посмотреть список комманд используйте:  ``/help``**");
  }
}); 


//moderator mention
client.on('message', message => {
  if (message.content === '911') {
   message.channel.send("<@" + message.author.id + ">" + " вызывает " + "<@&618128028748349450>");
  }
}); 


//commands
client.on("message", async message => {  
  if(message.author.bot) return; 
  if(message.content.indexOf(process.env.PREFIX) !== 0) return; 
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  //help command
    if(command === "help") {
    let help = new Discord.RichEmbed()
      .setAuthor('MIRROR', 'https://cdn.discordapp.com/avatars/632570913858125824/1aa2c052174d4f332855a9440c994bc2.png', 'https://discord.gg/Rnb9SSU')
      .setDescription('Список всех доступных комманд бота:')
      .setColor("#8b00ff")
      .addField("Информация о сервере", "/server")
      .addField("Аватар учасника", "/avatar [учасник]")
      .addField("Иконка сервера", "/icon")
      .addField("Выгнать", "/kick [учасник] [причина]")
      .addField("Заблокировать", "/ban [учасник] [причина]")
      .addField("Повторить", "/say [сообщение]")
      .addField("Повторить с embed", "/embed [сообщение]")
      .addField("Случайное число", "/ramdom")
      .addField("Бесплатная роль", "/free")
      .addField("Пинг", "/ping")
      .setTimestamp()
    return message.channel.send(help);
  } 


  //server info
    if(command === "server") {
    let server = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setColor("#8b00ff")
      .addField("Название", message.guild.name)
      .addField("Владелец", message.guild.owner.user.tag)
      .addField("Регион", message.guild.region)
      .addField("Уровень проверки", message.guild.verificationLevel)
      .addField("Участников", message.guild.members.size)
      .addField("Каналов", message.guild.channels.size)
      .addField("Ролей", message.guild.roles.size)
      .setThumbnail(message.guild.iconURL)
      .setTimestamp()
    return message.channel.send(server);
}


  //server rules
    if(command === "rules") {
    let server = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setDescription("**Правила сервера:**\n1. Запрещено оскорблять участников сервера.\n2. Запрещено спам, флуд в чате.\n3. Запрещено пиар других каналов, серверов.\n4. Запрещено материться в чате.\n5. Запрещено кричать, дуть в микрофон.\n6. Запрещено скидывать в текстовые каналы картинки с порнографией.\n7. Запрещено ставить оскорбительные, неадекватные ники.\n8. Запрещено выдавать себя за другого человека.\n9. Запрещено выдавать себя за администрацию.\n10. Запрещено оскорбительные родных.\n\n**Правила для Администрации:**\n1. Не злоупотреблять своими возможностями.\n2. Ведите себя адекватно.\n3. Помогайте участникам сервера.\n4. Не нарушайте правила сервера.")
      .setColor("#8b00ff")
    return message.channel.send(server);
}


  //free command
   if(command === "free") {
   let frees = ["『 Raspberries 』", "『 Watermelon 』", "『 Banana 』"];
   let free = Math.floor(Math.random() * frees.length);
   var role = message.guild.roles.find(role => role.name === frees[free]);
   message.member.addRole(role); 
   message.delete().catch(O_o=>{}); 
   message.channel.send("**Вы получили роль**  ``" + frees[free] + "``  ✓").then(function(message) {
    message.delete(3000);
  });
  }


  //random number command
    if(command === "random") {
    const lol = args.join(" ");
    var random = Math.floor(Math.random() *100)+1;
    message.channel.send(random +  lol);
  }


  //say command
    if(command === "say") {
    if(!message.member.hasPermission("ADMINISTRATOR")){
    return message.channel.send("У вас нет разрешения на использование этой комманды!").catch(console.error);
    }
      
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});  
    message.channel.send(sayMessage);
  }


  //embed command
    if(command === "embed") {
    if(!message.member.hasPermission("ADMINISTRATOR")){
    return message.channel.send("У вас нет разрешения на использование этой комманды!").catch(console.error);
    }
    const embedMessage = args.join(" ");  
    const embed = new RichEmbed()  
       .setColor("#8b00ff") 
       .setTitle(embedMessage) 
    message.delete().catch(O_o=>{});
    message.channel.send(embed) 
  } 


 //server icon
   if(command === "icon") {
    const embed = new Discord.RichEmbed()
                   .setImage(message.guild.iconURL)
                   .setColor(0x8b00ff)
    message.channel.send(embed);
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

  
  //kick command
    if(command === "kick") {
    if(!message.member.hasPermission("KICK_MEMBERS")){
    return message.channel.send("У вас нет разрешения на использование этой комманды!").catch(console.error);
    }
    
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.channel.send("Укажите пользователя которого хотите выгнать");
    if(!member.kickable) 
      return message.channel.send("Я не могу выгнать этого пользователя!");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Без причины";
    
    await member.kick(reason)
      .catch(error => message.channel.send(`Извините ${message.author} я не могу вызнать из-за: ${error}`));
    message.channel.send(`${member.user.tag} был выгнан <@${message.author.id}> по причине: ${reason}`);
  }
  
  
  //ban command
    if(command === "ban") {
    if(!message.member.hasPermission("BAN_MEMBERS")){
    return message.channel.send("У вас нет разрешения на использование этой комманды!").catch(console.error);
    }
    
    let member = message.mentions.members.first();
    if(!member)
      return message.channel.send("Укажите пользователя которого хотите заблокировать!");
    if(!member.bannable) 
      return message.channel.send("Я не могу заблокировать этого пользователя!");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Без причины";
    
    await member.ban(reason)
      .catch(error => message.channel.send(`Извините ${message.author} я не могу заблокировать из-за: ${error}`));
    message.channel.send(`${member.user.tag} был заблокирован <@${message.author.id}> по причине: ${reason}`);
  }
  

  //clear command
    if(command === "clear") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
    return message.channel.send("У вас нет разрешения на использование этой комманды!").catch(console.error);
    }
      
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 1000)
      return message.channel.send("Пожалуйста укажите сколько вы хотите удалить сообщений!");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.channel.send(`Не удалось удалить сообщения из-за: ${error}`));
  }
});
