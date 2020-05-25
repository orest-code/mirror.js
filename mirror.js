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
      type: "WATCHING",
      url:
        "https://www.youtube.com/channel/UCjjsEnIg5cDkw35UCD35bUA?view_as=subscriber"
    }
  });
});


//welcome message
client.on("guildMemberAdd", (member) => {
  let guild = member.guild;
  let membertag = member.user.tag;
  let joinmsg = new Discord.RichEmbed()
      .setColor("#00FFFF")
      .setTitle(membertag + " Joined the server!")
  if (guild.systemChannel) {
    guild.systemChannel.send(joinmsg);
  }
});


//leave message
client.on("guildMemberRemove", (member) => {
  let guild = member.guild; 
  let membertag = member.user.tag;
  let leftmsg = new Discord.RichEmbed()
      .setColor("#fe2e2e")
      .setTitle(membertag + " Left the server!")
  if(guild.systemChannel){
    guild.systemChannel.send(leftmsg);
  }
});


//discord invites
client.on('message', (message) => { 
  if (message.content.includes('discord.gg/'||'discordapp.com/invite/')) { //if it contains an invite link 
    const arrayOfUsersIds = ['595030276804050945', '472320129514864651', '632570913858125824'];

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
   message.channel.send("**Usage:  ``/help``**");
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
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setDescription('Command list:')
      .setColor("#00FFFF")
      .addField("Server info", "/server")
      .addField("Server icon", "/icon")
      .addField("Avatar", "/avatar [member]")
      .addField("Clear", "/clear [number]")
      .addField("Say", "/say [message]")
      .addField("Say embed", "/embed [message]")
      .addField("Random number", "/ramdom")
      .addField("Ping", "/ping")
      .setTimestamp()
    return message.channel.send(help);
  } 


 //mirror
   if(command === "mirror") {
    message.channel.send("**MIRROR »** https://discord.gg/mVygkhv");
  }

  //server info
    if(command === "server") {
    let server = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setColor("#00FFFF")
      .addField("Name", message.guild.name)
      .addField("Owner", message.guild.owner.user.tag)
      .addField("Region", message.guild.region)
      .addField("Members", message.guild.members.size)
      .addField("Channels", message.guild.channels.size)
      .addField("Roles", message.guild.roles.size)
      .setThumbnail(message.guild.iconURL)
      .setTimestamp()
    return message.channel.send(server);
}


 //rules
   if(command === "rules") {
    message.channel.send("**Русские правила:** ``/rulesru``\n**English rules:** ``/rulesen``");
  }


  //server rules ru
    if(command === "rulesru") {
    let server = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setDescription("**Правила сервера RU:**\n1. Запрещено оскорблять участников сервера.\n2. Запрещено спам, флуд в чате.\n3. Запрещено пиар других каналов, серверов.\n4. Запрещено материться в чате.\n5. Запрещено кричать, дуть в микрофон.\n6. Запрещено скидывать в текстовые каналы картинки с порнографией.\n7. Запрещено ставить оскорбительные, неадекватные ники.\n8. Запрещено выдавать себя за другого человека.\n9. Запрещено выдавать себя за администрацию.\n10. Запрещено оскорбительные родных.\n\n**Правила для Администрации:**\n1. Не злоупотреблять своими возможностями.\n2. Ведите себя адекватно.\n3. Помогайте участникам сервера.\n4. Не нарушайте правила сервера.")
      .setColor("#00FFFF")
    return message.channel.send(server);
}


  //server rules en
  if (command === "rulesen") {
   let rulesen = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setDescription("**Server rules EN:**\n1. Forbidden to insult server participants.\n2. Forbidden spam in chat.\n3. Forbidden to advertise other servers, channels.\n4. Forbidden to swear in chat.\n5. Forbidden to scream, blow into the microphone.\n6. Forbidden to pictures with pornography into text channels.\n7. Forbidden to put abusive, incorrect nicknames.\n8. Forbidden to impersonate another person.\n9. Forbidden to impersonate administration.\n10. Forbidden to insult relatives.\n\n**Rules for Administration:**\n1. Do not abuse your abilities.\n2. Behave appropriately.\n3. You must help server members.")
    .setColor("#00FFFF")
   return message.channel.send(rulesen);
  }


 //mirror ip
   if(command === "mirror-ip") {
    const ip = new RichEmbed()  
       .setColor("#00FFFF") 
       .setTitle("Ip: mirror.my-srv.net\nPort: 12068") 
    message.channel.send(ip);
  }


  //random number command
    if(command === "random") {
    const lol = args.join(" ");
    var random = Math.floor(Math.random() *100)+1;
    message.channel.send(random + " " + lol);
  }


  //say command
    if(command === "say") {
    if(!message.member.hasPermission("ADMINISTRATOR")){
    return message.channel.send("You do not have permission to use this command!").catch(console.error);
    }
      
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});  
    message.channel.send(sayMessage);
  }


  //embed command
    if(command === "embed") {
    if(!message.member.hasPermission("ADMINISTRATOR")){
    return message.channel.send("You do not have permission to use this command!").catch(console.error);
    }
    const embedMessage = args.join(" ");  
    const embed = new RichEmbed()  
       .setColor("#00FFFF") 
       .setTitle(embedMessage) 
    message.delete().catch(O_o=>{});
    message.channel.send(embed) 
  } 


 //server icon
   if(command === "icon") {
    const embed = new Discord.RichEmbed()
                   .setImage(message.guild.iconURL)
                   .setColor("#00FFFF")
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
                   .setColor("#00FFFF")
    message.channel.send({embed});
  }

  
  //ping command
    if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`**Pong! ${m.createdTimestamp - message.createdTimestamp}ms**`);
  }
  

  //clear command
    if(command === "clear") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
    return message.channel.send("You do not have permission to use this command!").catch(console.error);
    }
      
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 1000)
      return message.channel.send("Пожалуйста укажите сколько вы хотите удалить сообщений!");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.channel.send(`Не удалось удалить сообщения из-за: ${error}`))
    message.channel.send("**You cleared " + deleteCount + " messages**").then(function(message) {
     message.delete(5000);
   });
  }
});
