const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
var prefix = "k&"
var adminprefix = 'kx&'

client.on('ready',  () => {
    console.log('تم تشغيل ');
	console.log('By : .iiKaix ');
     console.log('K-Bot Team , ');
    console.log(`Logged in as * [ " ${client.user.username} " ] servers! [ " ${client.guilds.size} " ]`);
    console.log(`Logged in as * [ " ${client.user.username} " ] Users! [ " ${client.users.size} " ]`);
    console.log(`Logged in as * [ " ${client.user.username} " ] channels! [ " ${client.channels.size} " ]`);
  });


//contact

client.on("message", message => {
if(message.content.startsWith(prefix + `contact`)){
if(message.author.bot || message.channel.type == 'dm') return;
let args = message.content.split(" ").slice(1);
let msg = args.join('');
let dev = client.users.get("298907908903665665"); //Your id
if(!args) return message.reply("**__يجب كتابة الرسالة__**");
dev.send(`• | User: **${message.author.tag}**\n\n• | Message: **${msg}**`).then(() =>{
message.channel.send(`** تــم إرسآآل رسالتك بنجاح :white_check_mark: **`)
}).catch(console.error);
}
});


//roleuserbot

client.on('guildCreate', guild => {
  let support = client.guilds.get('555764045530136597') // حط هنا ايدي سيرفر السبورت
  if(support === undefined) return
  let role = support.roles.find(r => r.name == '- UserBot.') // بدلها بأسم الرتبة يلي تبيها للمستخدمين
  let member = support.members.get(guild.owner.user.id) 
  if(member) {
    member.addRole(role)
  } else {
    console.log(`هذا العضو ليس من المضيفين البوت لسيرفره.`)
  }
})

//user


client.on('message', message => {
  if(message.content === prefix + "user"){
    var embed = new Discord.RichEmbed()
    .setTitle(message.author.tag, message.author.avatarURL)
    .addField(`User`, message.author.username)
    .addField(`Discrim`,`#`+ message.author.discriminator)
    .addField(`Name Color Role`, message.member.colorRole)
    .addField(`Game`,message.author.presence.game ||"Idel.")
    .addField(`Status`,message.author.presence.status)
    message.channel.send(embed);
  }
});

//k&role


client.on('message', msg => {
  if(msg.author.bot) return
  if(msg.content.startsWith(prefix + 'role')) {
  let params = msg.content.slice(prefix.length).trim().split(/ +/g);
  if(!params[0]) return msg.channel.send(`**syntax: ${prefix}role <all/humans/bots/@user> <name role/@role>`);
if(params[0] === 'all') {
 if(!params[1]) return msg.channel.send(`**منشن الرتبة او اكتب اسمها \n syntax: ${prefix}role all <@role / name role>**`)
     let role = msg.mentions.roles.first() || msg.guild.roles.find(r =>  r.name.toLowerCase().startsWith(params[1].toLowerCase()))
   if(!role) return msg.channel.send(`**لم استطع ايجاد هذه الرتبة**`)
 msg.guild.members.forEach(m => {
if(m.roles.some(r => r.id == role.id)) return
     m.addRole(role)
 })
 msg.channel.send(`**تم إعطاك الكل رتبة e @${role.name}**`);
} else if(params[0] === 'bots') {
 if(!params[1]) return msg.channel.send(`**منشن الرتبة او اكتب اسمها \n syntax: ${prefix}role bots <@role / name role>**`)
     let role = msg.mentions.roles.first() || msg.guild.roles.find(r =>  r.name.toLowerCase().startsWith(params[1].toLowerCase()))
   if(!role) return msg.channel.send(`**لم استطع ايجاد هذه الرتبة**`)
 let bots = msg.guild.members.filter(m => m.user.bot)
 bots.forEach(bot => {
   if(bot.roles.some(r => r.id == role.id)) return
   bot.addRole(role)
 })
 msg.channel.send(`**تم ، إعطاك كل البوتات رتبة  @${role.name}**`);
} else if(params[0] === 'humans') {
 if(!params[1]) return msg.channel.send(`**منشن الرتبة او اكتب اسمها \n syntax: ${prefix}role humans <@role / name role>**`)
     let role = msg.mentions.roles.first() || msg.guild.roles.find(r =>  r.name.toLowerCase().startsWith(params[1].toLowerCase()))
   if(!role) return msg.channel.send(`**لم استطع ايجاد هذه الرتبة**`)
   let humans = msg.guild.members.filter(m => !m.user.bot)
   humans.forEach(h => {
     if(h.roles.some(r => r.id == role.id)) return
     h.addRole(role)
   })
   msg.channel.send(`**تـم ، لقد تم إعطاء الأعضاء  @${role.name}**`);
}else {
     if(!params[1]) return msg.channel.send(`**منشن الرتبة او اكتب اسمها \n syntax: ${prefix}role @user <@role / name role>**`)
     let role = msg.mentions.roles.first() || msg.guild.roles.find(r =>  r.name.toLowerCase().startsWith(params[1].toLowerCase()))
     if(!role) return msg.channel.send(`**لم استطع ايجاد هذه الرتبة**`)
     let userID = params[0].slice(2 , -1)
     let user = msg.guild.members.get(userID)
     if(!user) return
     user.addRole(role)
     msg.channel.send(`**تـم إعطآء  ${user} @${role.name}**`)
 
   }
 
 
 }
 
 
})

//ticket
client.on("message", (message) => {
   if (message.content.startsWith("k&new")) {     
        const reason = message.content.split(" ").slice(1).join(" ");     
        if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`You already have a ticket open.`);    
        message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Support Team");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });    
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: **تم إنشاء تذكرتك ، #${c.name}.**`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(`مرحباّ ${message.author.username}!`, `يرجى محاولة شرح سبب فتح هذه التذكرة بأكبر قدر ممكن من التفاصيل. سيكون فريق الدعم لدينا قريبا للمساعدة.`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error);
    }
 
 
  if (message.content.startsWith("k&close")) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
 
        message.channel.send(`هل أنت متأكد؟ بعد التأكيد ، لا يمكنك عكس هذا الإجراء!\n للتأكيد ، اكتب\`k&close\`. سيؤدي ذلك إلى مهلة زمنية في غضون 10 ثوانٍ وإلغائها`)
            .then((m) => {
                message.channel.awaitMessages(response => response.content === 'k&close', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })   
                    .then((collected) => {
                        message.channel.delete();
                    })    
                    .catch(() => {
                        m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                            m2.delete();
                        }, 3000);
                    });
            });
    }
 
});


//nonshr
client.on('message', message => {
    if(message.content.includes('discord.gg')){
                                            if(!message.channel.guild) return message.reply('** advertising me on DM ? 🤔   **');
        if (!message.member.hasPermissions(['ADMINISTRATOR'])){
        message.delete()
    return message.reply(`**ممنوع نشر الروابط :angry: !**`)
    }
}
});

//joinorleaveserverbot

client.on('guildCreate', guild => {
   
  client.channels.get("518350655056904202")
const embed = new Discord.RichEmbed()
   .setAuthor(`! K-Bot , ء Joined a Server ✅`)
   .setDescription(`**
Server name: __${guild.name}__
Server id: __${guild.id}__
Server owner: __${guild.owner}__
Member Count: __${guild.memberCount}__
Servers Counter : __${client.guilds.size}__**`)
         .setColor("#f3ae10")
         .addField("New Server!")
         .setFooter('! K-Bot , ء' , client.user.avatarURL)
           client.channels.get("564799205105991701").send({embed}); //Sup
}
 
);

client.on('guildDelete', guild => {
  client.channels.get("518350655056904202")
const embed = new Discord.RichEmbed()
   .setAuthor(`! K-Bot , ء left a server ❎`)
   .setDescription(`**
Server name: __${guild.name}__
Server id: __${guild.id}__
Server owner: __${guild.owner}__
Members Count: __${guild.memberCount}__
Servers Counter : __${client.guilds.size}__**`)
         .setColor("#f3ae10")
         .setFooter('! K-Bot , ء' , client.user.avatarURL)
           client.channels.get("564799205105991701").send({embed});
}
 
);

//kick
client.on('message', message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("❌ ``No Permissions``");
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
  if (message.mentions.users.size < 1) return message.reply("**https://prnt.sc/ls9xfd**");
  if(!reason) return message.reply ("**https://prnt.sc/ls9yzf**");
  if (!message.guild.member(user)
  .kickable) return message.reply("**هدا المستخدم عنده رتبه قويه**");

  message.guild.member(user).kick();

  const kickembed = new Discord.RichEmbed()
  .setAuthor(`KICKED!`, user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
  .addField("**Kicked By:**", '**[ ' + `${message.author.tag}` + ' ]**')
  .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
  message.channel.send({
    embed : kickembed
  })
}
});



//banliste

  client.on('message', message => {
     if(message.content.startsWith(prefix +"bans")) {
        message.guild.fetchBans()
        .then(bans => message.channel.send(`عدد المبندين **${bans.size}** شخص`))
  .catch(console.error);
}
});

//bcmtawr

client.on('message', message => {
if(message.author.bot) return;
if(message.channel.type === 'dm') return;
    if(message.content.startsWith(prefix + 'bc')) {
     let filter = m => m.author.id === message.author.id;
 
 let recembed = new Discord.RichEmbed()
 .setTitle(`${client.user.username}`)
 .setDescription(`
 -=-=-=-=-=-=-=-=-=-=
 🎖 Broadcast sends to a specific role without embed
 
 🏅 Broadcast sends to a specific role with embed
 
 📭 Broadcast sends for all members with embed
 
 📧 Broadcast sends for all members without embed
 
 🔵 Broadcast sends for online members only without embed
 
 🔷 Broadcast sends for online members only with embed
 
 ❌ To Cancel the process
 -=-=-=-=-=-=-=-=-=-=
 `)
 
 message.channel.sendEmbed(recembed).then(msg => {
     msg.react('🎖')
     .then(() => msg.react('🏅'))
     .then(() => msg.react('📭'))
     .then(() =>  msg.react('📧'))
     .then(() => msg.react('🔵'))
     .then(() => msg.react('🔷'))
     .then(() => msg.react('❌'))
 
 
             let embedmsgFilter = (reaction, user) => reaction.emoji.name === '📭' && user.id === message.author.id;
 
             let normalmsgFilter = (reaction, user) => reaction.emoji.name === '📧' && user.id === message.author.id;
 
             let cancelFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
 
             let onlyroleFilter = (reaction, user) => reaction.emoji.name === '🎖' && user.id === message.author.id;8
 
             let onlineonlyFilter = (reaction, user) => reaction.emoji.name === '🔵' && user.id === message.author.id;8
 
             let embedonlineonlyFilter = (reaction, user) => reaction.emoji.name === '🔷' && user.id === message.author.id;8
 
             let embedonlyroleFilter = (reaction, user) => reaction.emoji.name === '🏅' && user.id === message.author.id;8
 
             let embedmsg = msg.createReactionCollector(embedmsgFilter, { time: 0 });
 
             let normalmsg = msg.createReactionCollector(normalmsgFilter, { time: 0 });
     
             let onlyrole = msg.createReactionCollector(onlyroleFilter, { time: 0 });
 
             let embedonlyrole = msg.createReactionCollector(embedonlyroleFilter, { time: 0 });
 
             let onlineonly = msg.createReactionCollector(onlineonlyFilter, { time: 0 });
                 
             let embedonlineonly = msg.createReactionCollector(embedonlineonlyFilter, { time: 0 });
 
             let cancel = msg.createReactionCollector(cancelFilter, { time: 0 });
 
 embedonlineonly.on('collect', r => {
 
    let msge;
    message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
   
           message.channel.awaitMessages(filter, {
             max: 1,
             time: 90000,
             errors: ['time']
           })
           .then(collected => {
               collected.first().delete();
               msge = collected.first().content;
               msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
                 message.channel.awaitMessages(filter, {
                   max: 1,
                   time: 90000,
                   errors: ['time']
                 })
                 .then(collected => {
                   if(collected.first().content === 'yes') {
   message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
   
   
   message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {
    var bc = new Discord.RichEmbed()
           .setColor('RANDOM')
           .setTitle(`:mega: New Broadcast`)
           .addField('🔰Server🔰', message.guild.name)
           .addField('🚩Sender🚩', message.author.username)
           .addField('📜Message📜', `${msge}`)
           .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
           .setFooter(client.user.username, client.user.avatarURL);
           m.send({ embed: bc })
           m.send(`${m}`)
           
       })
   }})
   if(collected.first().content === 'no') {
   message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
   message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {
    var bc = new Discord.RichEmbed()
           .setColor('RANDOM')
           .setTitle(`:mega: New Broadcast`)
           .addField('🔰Server🔰', message.guild.name)
           .addField('🚩Sender🚩', message.author.username)
           .addField('📜Message📜', `${msge}`)
           .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
           .setFooter(client.user.username, client.user.avatarURL);
           m.send({ embed: bc })
           
       })
   }
                 
   })
               })
           })
       })
 
       
 onlineonly.on('collect', r => {
    let msge;
    message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
 
        message.channel.awaitMessages(filter, {
          max: 1,
          time: 90000,
          errors: ['time']
        })
        .then(collected => {
            collected.first().delete();
            msge = collected.first().content;
            msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 90000,
                errors: ['time']
              })
              .then(collected => {
 
                if(collected.first().content === 'yes') {
message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
               
 
message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {
    m.send(`${msge}`)
m.send(`${m}`)      
       
    })
}
if(collected.first().content === 'no') {
message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {
    m.send(`${msge}`)
               
    })}
})
})
        })
    })
})
 
 embedmsg.on('collect', r => {
     let msge;
  message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
 
         message.channel.awaitMessages(filter, {
           max: 1,
           time: 90000,
           errors: ['time']
         })
         .then(collected => {
             collected.first().delete();
             msge = collected.first().content;
             msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
               message.channel.awaitMessages(filter, {
                 max: 1,
                 time: 90000,
                 errors: ['time']
               })
               .then(collected => {
                 if(collected.first().content === 'yes') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
 
 
     message.guild.members.forEach(m => {
         var bc = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`:mega: New Broadcast`)
         .addField('🔰Server🔰', message.guild.name)
         .addField('🚩Sender🚩', message.author.username)
         .addField('📜Message📜', `${msge}`)
         .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
         .setFooter(client.user.username, client.user.avatarURL);
         m.send({ embed: bc })
         m.send(`${m}`)
         
     })
 }})
 if(collected.first().content === 'no') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
     message.guild.members.forEach(m => {
         var bc = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`:mega: New Broadcast`)
         .addField('🔰Server🔰', message.guild.name)
         .addField('🚩Sender🚩', message.author.username)
         .addField('📜Message📜', `${msge}`)
         .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
         .setFooter(client.user.username, client.user.avatarURL);
         m.send({ embed: bc })
         
     })
 }
               
 })
             })
         })
     })
 
 
   
 
 
 
 normalmsg.on('collect', r => {
     let msge;
     message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
 
         message.channel.awaitMessages(filter, {
           max: 1,
           time: 90000,
           errors: ['time']
         })
         .then(collected => {
             collected.first().delete();
             msge = collected.first().content;
             msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
               message.channel.awaitMessages(filter, {
                 max: 1,
                 time: 90000,
                 errors: ['time']
               })
               .then(collected => {
 
                 if(collected.first().content === 'yes') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
                 
 
     message.guild.members.forEach(m => {
 m.send(`${msge}`)
 m.send(`${m}`)      
         
     })
 }
 if(collected.first().content === 'no') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
     message.guild.members.forEach(m => {
         m.send(`${msge}`)
                 
     })}
 })
 })
         })
     })
 })
 
 onlyrole.on('collect', r => {
     let msge;
     let role;
     message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
 
         message.channel.awaitMessages(filter, {
           max: 1,
           time: 90000,
           errors: ['time']
         })
 
         .then(collected => {
             collected.first().delete();
             msge = collected.first().content;
                 msg.edit('✅ **| Now Please Write The Role Name**').then(msg => {
                 message.channel.awaitMessages(filter, {
                     max: 1,
                     time: 90000,
                     errors: ['time']
                   })
         
         .then(collected => {
             collected.first().delete();
             role = collected.first().content;
                 let rolecheak = message.guild.roles.find('name', `${role}`)
             msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
               message.channel.awaitMessages(filter, {
                 max: 1,
                 time: 90000,
                 errors: ['time']
               })
               .then(collected => {
 
                 if(collected.first().content === 'yes') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
                 
 
             message.guild.members.filter(m => m.roles.get(rolecheak.id)).forEach(m => {
 
 m.send(`${msge}`)
 m.send(`${m}`)      
         
     })
 }
 if(collected.first().content === 'no') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
         message.guild.members.filter(m => m.roles.get(rolecheak.id)).forEach(m => {
 
         m.send(`${msge}`)
                 
     })}
 })
 })
         })
     })
 })
 })
 });
 
 
 
 embedonlyrole.on('collect', r => {
     let msge;
     let role;
     message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
 
         message.channel.awaitMessages(filter, {
           max: 1,
           time: 90000,
           errors: ['time']
         })
 
         .then(collected => {
             collected.first().delete();
             msge = collected.first().content;
                 msg.edit('✅ **| Now Please Write The Role Name**').then(msg => {
                 message.channel.awaitMessages(filter, {
                     max: 1,
                     time: 90000,
                     errors: ['time']
                   })
         
         .then(collected => {
             collected.first().delete();
             role = collected.first().content;
                 let rolecheak = message.guild.roles.find('name', `${role}`)
             msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
               message.channel.awaitMessages(filter, {
                 max: 1,
                 time: 90000,
                 errors: ['time']
               })
               .then(collected => {
 
                 if(collected.first().content === 'yes') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
                 
 
                     message.guild.members.filter(m => m.roles.get(rolecheak.id)).forEach(m => {
                         var bc = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`:mega: New Broadcast`)
         .addField('🔰Server🔰', message.guild.name)
         .addField('🚩Sender🚩', message.author.username)
         .addField('📜Message📜', `${msge}`)
         .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
         .setFooter(client.user.username, client.user.avatarURL);
         m.send({ embed: bc })
 m.send(`${m}`)      
         
     })
 }
 if(collected.first().content === 'no') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
 message.guild.members.filter(m => m.roles.get(rolecheak.id)).forEach(m => {
         var bc = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`:mega: New Broadcast`)
         .addField('🔰Server🔰', message.guild.name)
         .addField('🚩Sender🚩', message.author.username)
         .addField('📜Message📜', `${msge}`)
         .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
         .setFooter(client.user.username, client.user.avatarURL);
         m.send({ embed: bc })
         
                 
     })}
 })
 })
         })
     })
 })
 })
 })
     cancel.on('collect', r => {
         let cancelembed = new Discord.RichEmbed()
         .setTitle('Successfully Canceled :x:')
      message.channel.sendEmbed(cancelembed)
         embedmsg.stop();
         normalmsg.stop();
         onlyrole.stop();
         embedonlyrole.stop();
         embedonlineonly.stop()
         onlineonly.stop()
         cancel.stop();
     })
 })
    }});


//id

 client.on("message", msg => {
           var prefix = "k&";
  if(msg.content.startsWith (prefix + "id")) {
    if(!msg.channel.guild) return msg.reply('**:x: اسف لكن هذا الامر للسيرفرات فقط **');         
      const embed = new Discord.RichEmbed();
  embed.addField(":cloud_tornado:  الاسم", `**[ ${msg.author.username}#${msg.author.discriminator} ]**`, true)
          .addField(":id:  الايدي", `**[ ${msg.author.id} ]**`, true)
          .setColor("RANDOM")
          .setFooter(msg.author.username , msg.author.avatarURL)
          .setThumbnail(`${msg.author.avatarURL}`)
          .setTimestamp()
          .setURL(`${msg.author.avatarURL}`)
          .addField(':spy:  الحالة', `**[ ${msg.author.presence.status.toUpperCase()} ]**`, true)
          .addField(':satellite_orbital:   يلعب', `**[ ${msg.author.presence.game === null ? "No Game" : msg.author.presence.game.name} ]**`, true)
          .addField(':military_medal:  الرتب', `**[ ${msg.member.roles.filter(r => r.name).size} ]**`, true)
          .addField(':robot:  هل هو بوت', `**[ ${msg.author.bot.toString().toUpperCase()} ]**`, true);
      msg.channel.send({embed: embed})
  }
});

//voice-online

let vojson = JSON.parse(fs.readFileSync('vojson.json', 'utf8'))
client.on('message', message => {
    if(message.content.startsWith(prefix + "setvo")) {
let channel = message.content.split(" ").slice(1).join(" ")
let channelfind = message.guild.channels.find('name', `${channel}`)
if(!channel) return message.channel.send('المرجو كتابة إسم الروم الصوتي بدون أخطاء مثل: k&setvo <Channel name>')
if(!channelfind) return message.channel.send('المرجو كتابة إسم الروم الصوتي بدون أخطاء مثل : k&setvo <Channel name>')
vojson[message.guild.id] = {
stats: 'enable',
chid: channelfind.id,
guild: message.guild.id
 
}
channelfind.setName(`VoiceOnline: ${message.guild.members.filter(m => m.voiceChannel).size}`)
message.channel.send('**تم تشغيل الخاصية " فويس اونلاين " بنجاح**')
}
    if(message.content.startsWith(prefix + "offvo")) {
      message.guild.channels.find('id', `${vojson[message.guild.id].chid}`).delete()
    vojson[message.guild.id] = {
        stats: 'disable',
        chid: 'undefined',
        guild: message.guild.id
        }
        message.channel.send('**تـم تعطيل خاصية " فويس اونلاين " بنجاح **')
 
}
fs.writeFile("./vojson.json", JSON.stringify(vojson), (err) => {
    if (err) console.error(err)
  })
})
 
client.on('voiceStateUpdate', (oldMember , newMember) => {
            if(!vojson[oldMember.guild.id]) vojson[oldMember.guild.id] = {
                stats: 'disable',
                chid: 'undefined',
                guild: 'undefined'
            }
                    if (vojson[oldMember.guild.id].stats === 'enable') {
                        let ch = vojson[oldMember.guild.id].chid
                        let channel = oldMember.guild.channels.get(ch)
                        let guildid = vojson[oldMember.guild.id].guild
                        channel.setName(`VoiceOnline: ${oldMember.guild.members.filter(m => m.voiceChannel).size}`)
                    };
                    if (vojson[oldMember.guild.id].stats === 'disable') {
                    return;
                    }
        });

//skin MC

client.on('message', message => {
  const aa = message.content.split(" ").slice(1).join(" ");
  if(message.content.startsWith(prefix + "skin")){
    if(!aa) return message.reply(`:x:  -  **${prefix}skin <name>**`);
    var ss = new Discord.RichEmbed()
    .setTitle(`${aa}'s Skin!`)
    .setURL(`https://minotar.net/armor/body/${aa}/100.png`)
    .setThumbnail(`https://minotar.net/avatar/${aa}`)
    .setImage(`https://minotar.net/armor/body/${aa}/100.png`)
    .setFooter(`Requested By : ${message.author.tag}`, message.author.avatarURL)
    message.channel.send(ss);
  }
});

 const Sra7a = [ //saraha
    'صراحه  |  صوتك حلوة؟',
    'صراحه  |  التقيت الناس مع وجوهين؟',
    'صراحه  |  شيء وكنت تحقق اللسان؟',
    'صراحه  |  أنا شخص ضعيف عندما؟',
    'صراحه  |  هل ترغب في إظهار حبك ومرفق لشخص أو رؤية هذا الضعف؟',
    'صراحه  |  يدل على أن الكذب مرات تكون ضرورية شي؟',
    'صراحه  |  أشعر بالوحدة على الرغم من أنني تحيط بك كثيرا؟',
    'صراحه  |  كيفية الكشف عن من يكمن عليك؟',
    'صراحه  |  إذا حاول شخص ما أن يكرهه أن يقترب منك ويهتم بك تعطيه فرصة؟',
    'صراحه  |  أشجع شيء حلو في حياتك؟',
    'صراحه  |  طريقة جيدة يقنع حتى لو كانت الفكرة خاطئة" توافق؟',
    'صراحه  |  كيف تتصرف مع من يسيئون فهمك ويأخذ على ذهنه ثم ينتظر أن يرفض؟',
    'صراحه  |  التغيير العادي عندما يكون الشخص الذي يحبه؟',
    'صراحه  |  المواقف الصعبة تضعف لك ولا ترفع؟',
    'صراحه  |  نظرة و يفسد الصداقة؟',
    'صراحه  |  ‏‏إذا أحد قالك كلام سيء بالغالب وش تكون ردة فعلك؟',
    'صراحه  |  شخص معك بالحلوه والمُره؟',
    'صراحه  |  ‏هل تحب إظهار حبك وتعلقك بالشخص أم ترى ذلك ضعف؟',
    'صراحه  |  تأخذ بكلام اللي ينصحك ولا تسوي اللي تبي؟',
    'صراحه  |  وش تتمنى الناس تعرف عليك؟',
    'صراحه  |  ابيع المجرة عشان؟',
    'صراحه  |  أحيانا احس ان الناس ، كمل؟',
    'صراحه  |  مع مين ودك تنام اليوم؟',
    'صراحه  |  صدفة العمر الحلوة هي اني؟',
    'صراحه  |  الكُره العظيم دايم يجي بعد حُب قوي " تتفق؟',
    'صراحه  |  صفة تحبها في نفسك؟',
    'صراحه  |  ‏الفقر فقر العقول ليس الجيوب " ، تتفق؟',
    'صراحه  |  تصلي صلواتك الخمس كلها؟',
    'صراحه  |  ‏تجامل أحد على راحتك؟',
    'صراحه  |  اشجع شيء سويتة بحياتك؟',
    'صراحه  |  وش ناوي تسوي اليوم؟',
    'صراحه  |  وش شعورك لما تشوف المطر؟',
    'صراحه  |  غيرتك هاديه ولا تسوي مشاكل؟',
    'صراحه  |  ما اكثر شي ندمن عليه؟',
    'صراحه  |  اي الدول تتمنى ان تزورها؟',
    'صراحه  |  متى اخر مره بكيت؟',
    'صراحه  |  تقيم حظك ؟ من عشره؟',
    'صراحه  |  هل تعتقد ان حظك سيئ؟',
    'صراحه  |  شـخــص تتمنــي الإنتقــام منـــه؟',
    'صراحه  |  كلمة تود سماعها كل يوم؟',
    'صراحه  |  **هل تُتقن عملك أم تشعر بالممل؟',
    'صراحه  |  هل قمت بانتحال أحد الشخصيات لتكذب على من حولك؟',
    'صراحه  |  متى آخر مرة قمت بعمل مُشكلة كبيرة وتسببت في خسائر؟',
    'صراحه  |  ما هو اسوأ خبر سمعته بحياتك؟',
    '‏صراحه | هل جرحت شخص تحبه من قبل ؟',
    'صراحه  |  ما هي العادة التي تُحب أن تبتعد عنها؟',
    '‏صراحه | هل تحب عائلتك ام تكرههم؟',
    '‏صراحه  |  من هو الشخص الذي يأتي في قلبك بعد الله – سبحانه وتعالى- ورسوله الكريم – صلى الله عليه وسلم؟',
    '‏صراحه  |  هل خجلت من نفسك من قبل؟',
    '‏صراحه  |  ما هو ا الحلم  الذي لم تستطيع ان تحققه؟',
    '‏صراحه  |  ما هو الشخص الذي تحلم به كل ليلة؟',
    '‏صراحه  |  هل تعرضت إلى موقف مُحرج جعلك تكره صاحبهُ؟',
     '‏صراحه  |  هل قمت بالبكاء أمام من تُحب؟',
    '‏صراحه  |  ماذا تختار حبيبك أم صديقك؟',
    '‏صراحه  | هل حياتك سعيدة أم حزينة؟',
    'صراحه  |  ما هي أجمل سنة عشتها بحياتك؟',
    '‏صراحه  |  ما هو عمرك الحقيقي؟',
    '‏صراحه  |  ما اكثر شي ندمن عليه؟',
]
  client.on('message', message => {//saraahaaah
if (message.content.startsWith('k&sarahah')) {
    if(!message.channel.guild) return message.reply('** هذا الامر فقط للسيرفرات **');
 var Rocket= new Discord.RichEmbed()
 .setTitle("لعبة صراحة ..")
 .setColor('RANDOM')
 .setDescription(`${Sra7a[Math.floor(Math.random() * Sra7a.length)]}`)
 .setImage("https://cdn.discordapp.com/attachments/371269161470525444/384103927060234242/125.png")
         
        .setTimestamp()

  message.channel.sendEmbed(Rocket);
  message.react("??")
}
});


  
  client.on('message', message => {//roles
    if (message.content === "k&roles") {
        var roles = message.guild.roles.map(roles => `${roles.name}, `).join(' ')
        const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField('Roles:',`**[${roles}]**`)
        message.channel.sendEmbed(embed);
    }
});
client.on('message', message => {//rooms
    if (message.content === "k&rooms") {
        var channels = message.guild.channels.map(channels => `${channels.name}, `).join(' ')
        const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField('rooms:',`**[${channels}]**`)
        message.channel.sendEmbed(embed);
    }
});


  //welcome in DM
  client.on("guildMemberAdd", member => {
    member.createDM().then(function (channel) {
    return channel.send(`:rose:  ولكم نورت السيرفر ي حلو ,:rose: 
  :crown:اسم العضو  ${member}:crown:  
  انت العضو رقم ${member.guild.memberCount} `) 
  }).catch(console.error)
  })


//منع إرسال التوكن
client.on("message", message => {
    if (message.content.match(/([A-Z0-9]|-|_){24}\.([A-Z0-9]|-|_){6}\.([A-Z0-9]|-|_){27}|mfa\.([A-Z0-9]|-|_){84}/gi)) {
        if(!message.guild.members.get(client.user.id).hasPermission('MANAGE_MESSAGES')) return message.channel.send('**I need Permission \`MANAGE_MESSAGE\`To delete Tokens**')
        message.delete();
        message.reply(`ليش ترسل التوكن ، مخك ويــن ؟`);
        return;
    }
    if(message.channel.type === "dm"){
    if (message.content.match(/([A-Z0-9]|-|_){24}\.([A-Z0-9]|-|_){6}\.([A-Z0-9]|-|_){27}|mfa\.([A-Z0-9]|-|_){84}/gi)) {
  
        message.reply(`ليش ترسل التوكن ، مخك ويــن ؟`);
        return;
    }
}
});

//clear
client.on('message', message => {  
    if (message.author.bot) return;
if (message.content.startsWith(prefix + 'clear')) { 
    if(!message.channel.guild) return message.reply('⛔ | This Command For Servers Only!'); 
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('⛔ | You dont have **MANAGE_MESSAGES** Permission!');
        if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return message.channel.send('⛔ | I dont have **MANAGE_MESSAGES** Permission!');
 let args = message.content.split(" ").slice(1)
    let messagecount = parseInt(args);
    if (args > 99) return message.reply("**🛑 || يجب ان يكون عدد المسح أقل من 500 .**").then(messages => messages.delete(5000))
    if(!messagecount) args = '500';
    message.channel.fetchMessages({limit: messagecount + 1}).then(messages => message.channel.bulkDelete(messages));
    message.channel.send(`\`${args}\` : __عدد الرسائل التي تم مسحها __ `).then(messages => messages.delete(5000));
  }
  });
  
    //mute
	
client.on('message', async message =>{
  if (message.author.boss) return;
	var prefix = "k&";

if (!message.content.startsWith(prefix)) return;
	let command = message.content.split(" ")[0];
	 command = command.slice(prefix.length);
	let args = message.content.split(" ").slice(1);
	if (command == "mute") {
		if (!message.channel.guild) return;
		if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply(":x: أنت لا تمتلك خاصية `MANAGE_MESSAGES`").then(msg => msg.delete(5000));
		if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("لازم تعطي البوت خاصية `MANAGE_MESSAGES`:x:").then(msg => msg.delete(5000));;
		let user = message.mentions.users.first();
		let muteRole = message.guild.roles.find("name", "Muted");
		if (!muteRole) return message.reply("**عليك أن تنشئ رتبة جديدة بإسم `Muted`**").then(msg => {msg.delete(5000)});
		if (message.mentions.users.size < 1) return message.reply('**:x: تمتلك المنشن مرة واحدة **').then(msg => {msg.delete(5000)});
		let reason = message.content.split(" ").slice(2).join(" ");
		message.guild.member(user).addRole(muteRole);
		const muteembed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setAuthor(`Muted!`, user.displayAvatarURL)
		.setThumbnail(user.displayAvatarURL)
		.addField("**:busts_in_silhouette:  User**",  '**[ ' + `${user.tag}` + ' ]**',true)
		.addField("**:hammer:  By**", '**[ ' + `${message.author.tag}` + ' ]**',true)
		.addField("**:book:  Reason**", '**[ ' + `${reason}` + ' ]**',true)
		.addField("User", user, true)
		message.channel.send({embed : muteembed});
		var muteembeddm = new Discord.RichEmbed()
		.setAuthor(`Muted!`, user.displayAvatarURL)
		.setDescription(`      
${user}لقد تم عقابك بالميوت الكتابي
${message.author.tag} من قبل
[ ${reason} ] : السبب
لو لم تقم بأي مخالفة ، فـقم بذهاب إلى الإدارة
`)
		.setFooter(`Server : ${message.guild.name}`)
		.setColor("RANDOM")
	user.send( muteembeddm);
  }
if(command === `unmute`) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage(":x: أنت لا تمتلك خاصية`MANAGE_MESSAGES`").then(m => m.delete(5000));
if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("لازم تعطي البوت خاصية `MANAGE_MESSAGES`").then(msg => msg.delete(6000))

  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toMute) return message.channel.sendMessage(":x: تمتلك المنشن مرة واحدة ")

  let role = message.guild.roles.find (r => r.name === "Muted");
  
  if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage(":x: هذا العضو ليس لديه ميوت ")

  await toMute.removeRole(role)
  message.channel.sendMessage(":white_check_mark: نجاح ! تم الفك عنه الميوت  ") 

  return;

  }

});

//رياكشن مع الايموجي
let emojiss = require("node-emoji");//npm i node-emoji
client.on("message", msg=>{
if(msg.content.startsWith(`${prefix}setrole`)){
if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.reply("you don't have permission").then(s => {s.delete(1600);})
msg.reply("منشن الروم الي تبي فيه التفعيل").then(msgs=>{
  const filter = response => response.author.id === msg.author.id;
  msg.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
  .then( collected =>{
    msg.delete();
    let idC = msg.guild.channels.find(c=>c.id == collected.first().mentions.channels.first().id)
    if(!idC) return msgs.edit("لم اجد الروم");
     idC = idC.id;
     msgs.edit(`${msg.author}, ادخل الايموجي الذي تريدة للتفعيل`)
const filter = response => response.author.id === msg.author.id;
msg.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
.then( collected =>{
if(!emojiss.hasEmoji(collected.first().mentions._content)) return msgs.edit("ادخل ايموجي صحيح !");
newemoji = collected.first().mentions._content;
msg.delete();
msgs.edit(`${msg.author}, منشن للرتبة الذي تريدها`)
const filter = response => response.author.id === msg.author.id;
msg.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
.then( collected =>{
let roleW = collected.first().mentions.roles.first()
if(!roleW) {
  let embed = new Discord.RichEmbed()
  .setColor("#42f4f4")
  .setTitle(`:x: - منشن الرتبة `);
  msg.reply(embed).then( z => z.delete(3000)); return
};
let role = msg.guild.roles.find(`name`, roleW.name);
if(!role) {
  let embed = new Discord.RichEmbed()
  .setColor("#42f4f4")
  .setTitle(`:x: - Could't find \`${roleW.name}\` role.`);
msg.reply(embed).then( msgs => msgs.delete(3000));
return
}
roleNew = role;
msgs.edit(`${msg.author}, ادخل النص الذي تريدة`)
const filter = response => response.author.id === msg.author.id;
msg.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
.then( collected =>{
stringNew = collected.first().mentions._content;
let channel = msg.guild.channels.get(idC);
if(!channel) {
  let embed = new Discord.RichEmbed()
  .setColor("#42f4f4")
  .setTitle(`:x: - Could't find \`${idC}\` Channel.`);
msg.reply(embed).then( msgs => msgs.delete(3000));
return
}
channel.bulkDelete(100)
channel.send(`@here || @everyone
:arrow_down::white_check_mark::arrow_down:
 
${stringNew}
`).then( msgA =>{
msgA.react(newemoji).then(()=>{
  const Ac = (reaction, user) => reaction.emoji.name === newemoji && !user.bot;
  const Acc = msgA.createReactionCollector(Ac, {time: 120000});
  Acc.on("collect", r=>{
  let member = msg.guild.members.get(r.users.last().id);
  if(!member) return;
  r.remove(member.user);
if(member.roles.find(r=>r.name == roleNew.name)) return;
    member.addRole(roleNew);
  channel.send(`${member.user}, تم تفعيلك`).then(z => z.delete(1500));
})})})
}).catch(e => {console.log(e.message)});  
}).catch(e => {console.log(e.message)});
}).catch(e => {console.log(e.message)});
}).catch(e => {console.log(e.message)});
})
///
}});

//mentionforbot
client.on('message', message => {
    if (message.content.startsWith("<@565522886744604672>"))
    
    message.reply("**My Prefix is : __k&__**");
    
      

});
//membersstatus

    client.on('message', message => {
              if (!message.channel.guild) return;
      if(message.content =='k&members')
      var IzRo = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setFooter(message.author.username, message.author.avatarURL)
      .setTitle(':tulip:| Members info')
      .addBlankField(true)
      .addField(':green_book:| الاونلاين ',
      `${message.guild.members.filter(m=>m.presence.status == 'online').size}`)
      .addField(':closed_book:| دي ان دي',`${message.guild.members.filter(m=>m.presence.status == 'dnd').size}`)
      .addField(':orange_book:| خامل',`${message.guild.members.filter(m=>m.presence.status == 'idle').size}`)
      .addField(':notebook:| الاوف لاين ',`${message.guild.members.filter(m=>m.presence.status == 'offline').size}`)
      .addField('عدد اعضاء السيرفر',`${message.guild.memberCount}`)
      message.channel.send(IzRo);
    });

//ban

 
client.on('message', (message) => {
    if (message.content.startsWith('k&ban ')) {
      if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('هذا الخاصية للإدارة فقط');
        var member= message.mentions.members.first();
        member.ban().then((member) => {
         message.channel.send(member.displayName + 'تم تبنيد هذا الشخص من السيرفر');
        }).catch(() => {
            message.channel.send('Error :_:');
        });
    }
});
 
//قرعة من 1 إلى 100
 
client.on('message', message => {
   if (message.content === "k&roll") {
  message.channel.sendMessage(Math.floor(Math.random() * 100));
    }
});
 
//embed
client.on("message", message => {
  var prefix = "k&";
  if(message.content.startsWith(prefix + "embed")) {
    

var color = message.content.split(" ")[1];
  var text = message.content.split(" ").slice(2);
    var tt = text.join(" ")
  if(!color) return message.reply("يجب كتابة لون الامبد الذي تريده");
    if(!tt) return message.reply("يجب كتابة كلام لتكراره");
  let embed = new Discord.RichEmbed()
  .setColor(color)
  .setDescription(tt)
  message.channel.send(embed).catch(Julian =>{console.log('`Error`: ' + Julian);
message.channel.send("`Error`:" + Julian)
    })
  }
  });
  
//معلومات

client.on('message',function(message) {
   if(message.content.startsWith(prefix + "guilds")) {
       message.channel.send(`**Guilds:__ \`\`${client.guilds.size}\`\`__**`);
   } 
});
//========================================================
client.on('message',function(message) {
   if(message.content.startsWith(prefix + "users")) {
       message.channel.send(`**Users:__ \`\`${client.users.size}\`\`__**`);
   } 
});
//=========================================================
client.on('message',function(message) {
   if(message.content.startsWith(prefix + "channels")) {
       message.channel.send(`**channels:__ \`\`${client.channels.size}\`\`__**`);
   } 
});

/*بنق*/

client.on('message', message => {
                                if(!message.channel.guild) return;
                        if (message.content.startsWith(prefix + "ping")) {
                            if(!message.channel.guild) return;
                            var msg = `${Date.now() - message.createdTimestamp}`
                            var api = `${Math.round(client.ping)}`
                            if (message.author.bot) return;
                        let embed = new Discord.RichEmbed()
                        .setAuthor(message.author.username,message.author.avatarURL)
                        .setColor('RANDOM')
                        .addField('**Time Taken:**',msg + " ms :signal_strength: ")
                        .addField('**WebSocket:**',api + " ms :signal_strength: ")
         message.channel.send({embed:embed});
                        }
 });

/*معلونات البوت*/

client.on('message', message => {
    if (message.content.startsWith("k&bot")) {
    message.channel.send({
        embed: new Discord.RichEmbed()
            .setAuthor(client.user.username,client.user.avatarURL)
            .setThumbnail(client.user.avatarURL)
            .setColor('RANDOM')
            .setTitle('``INFO ! K-Bot`` ')
            .addField('``بنقي``' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
            .addField('``الرام المستعمل``', `[${(process.memoryUsage().rss / 1048576).toFixed()}MB]`, true)
            .addField('``السيرفرات``', [client.guilds.size], true)
            .addField('``الرومات``' , `[ ${client.channels.size} ]` , true)
            .addField('``الأعضاء``' ,`[ ${client.users.size} ]` , true)
            .addField('``إسمي``' , `[ ${client.user.tag} ]` , true)
            .addField('``الأيدي``' , `[ ${client.user.id} ]` , true)
			      .addField('``البرفكس``' , `[ k& ]` , true)
			      .addField('``لغتي``' , `[ Java Script ]` , true)
			      .setFooter('By | iiKaaaaix ,')
    })
}
});


/*سرفر*/

client.on('message', function(msg) {
  if(msg.content.startsWith (prefix  + 'server')) {
    if(!msg.channel.guild) return msg.reply('**:x: اسف لكن هذا الامر للسيرفرات فقط **');         
    const millis = new Date().getTime() - msg.guild.createdAt.getTime();
    const noww = new Date();
    const createdAt = millis / 1000 / 60 / 60 / 24;
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(msg.guild.iconURL)
    .addField(`${msg.guild.name}`,`\`\`منذ ${createdAt.toFixed(0)} يوما \`\``)
    .addField(':earth_africa: ** موقع السيرفر**',`**[ ${msg.guild.region} ]**`,true)
    .addField(':military_medal:** الرتب**',`**[ ${msg.guild.roles.size} ]**`,true)
    .addField(':bust_in_silhouette:** عدد الاعضاء**',`**[ ${msg.guild.memberCount} ]**`,true)
    .addField(':white_check_mark:** عدد الاعضاء الاونلاين**',`**[ ${msg.guild.members.filter(m=>m.presence.status == 'online').size} ]**`,true)
    .addField(':pencil:** الرومات الكتابية**',`**[ ${msg.guild.channels.filter(m => m.type === 'text').size} ]**`,true)
    .addField(':loud_sound:** رومات الصوت**',`**[ ${msg.guild.channels.filter(m => m.type === 'voice').size} ]**`,true)
    .addField(':crown:** صاحب السيرفر**',`**[ ${msg.guild.owner} ]**`,true)
    .addField(':id:** ايدي السيرفر**',`**[ ${msg.guild.id} ]**`,true)
    msg.channel.send({embed:embed});
  }
});
  
 

/*عمل اللوان*/

client.on('message', function(message) {
                  if(!message.channel.guild) return;
    if(message.content ===  (prefix + "color 100")) {
        if(message.member.hasPermission('MANAGE_ROLES')) {
            setInterval(function(){})
            message.channel.send('جاري عمل الالوان |✅')
        }else{
            message.channel.send('ما معاك البرمشن المطلوب  |❌')
            }
    }
});
client.on('message', message=>{
    if (message.content ===  (prefix + "color 100")){
              if(!message.channel.guild) return;
            if (message.member.hasPermission('MANAGE_ROLES')){
                setInterval(function(){})
                  let count = 0;
                  let ecount = 0;
        for(let x = 1; x < 101; x++){
            message.guild.createRole({name:x,
            color: 'RANDOM'})
            }
            }
    }
});  
  //اقتراح
     client.on('message', message =>{
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let prefix = 'k&';

if(cmd === `${prefix}sug`) {
    var suggestMessage = message.content.substring(8)
    let suggestEMBED = new Discord.RichEmbed()
    .setColor(3447003)
    .setTitle("تم إضافة إقتراح جديد !")
    .setDescription(`**${suggestMessage}**`)
    .setFooter(`Suggested By : ${message.author.tag}`);
    message.delete().catch(O_o=>{}) 
    let suggests = message.guild.channels.find(`name`, "sugs");
    if (!suggests) return message.channel.send("لازم تسوي روم بإسم sugs")
    suggests.send(suggestEMBED);
}

});

//say
client.on('message',function(message) {
	let prefix = "k&";
let args = message.content.split(" ").slice(1).join(" ");
if(message.content.startsWith(prefix + "say1")) {
if(!args) return;
message.channel.send(`**# ${args}**`); 
}
});


client.on('message',function(message) {
	let prefix = "k&";
let args = message.content.split(" ").slice(1).join(" ");
if(message.content.startsWith(prefix + "say2")) {
if(!args) return;
message.channel.send(`_# ${args}_`); 
}
});
 
 
client.on('message',function(message) {
	let prefix = "k&";
let args = message.content.split(" ").slice(1).join(" ");
if(message.content.startsWith(prefix + "say3")) {
if(!args) return;
message.channel.send(`~~# ${args}~~`); 
}
});

 
client.on('message',function(message) {
	let prefix = "k&";
let args = message.content.split(" ").slice(1).join(" ");
if(message.content.startsWith(prefix + "say4")) {
if(!args) return;
message.channel.send(`__# ${args}__`); 
}
});

//كت تويت
const cuttweet = [
     'كت تويت ‏| تخيّل لو أنك سترسم شيء وحيد فيصبح حقيقة، ماذا سترسم؟',
     'كت تويت | أكثر شيء يُسكِت الطفل برأيك؟',
     'كت تويت | الحرية لـ ... ؟',
     'كت تويت | قناة الكرتون المفضلة في طفولتك؟',
     'كت تويت ‏| كلمة للصُداع؟',
     'كت تويت ‏| ما الشيء الذي يُفارقك؟',
     'كت تويت | موقف مميز فعلته مع شخص ولا يزال يذكره لك؟',
     'كت تويت ‏| أيهما ينتصر، الكبرياء أم الحب؟',
     'كت تويت | بعد ١٠ سنين ايش بتكون ؟',
     'كت تويت ‏| مِن أغرب وأجمل الأسماء التي مرت عليك؟',
     '‏كت تويت | عمرك شلت مصيبة عن شخص برغبتك ؟',
     'كت تويت | أكثر سؤال وجِّه إليك مؤخرًا؟',
     '‏كت تويت | ما هو الشيء الذي يجعلك تشعر بالخوف؟',
     '‏كت تويت | وش يفسد الصداقة؟',
     '‏كت تويت | شخص لاترفض له طلبا ؟',
     '‏كت تويت | كم مره خسرت شخص تحبه؟.',
     '‏كت تويت | كيف تتعامل مع الاشخاص السلبيين ؟',
     '‏كت تويت | كلمة تشعر بالخجل اذا قيلت لك؟',
     '‏كت تويت | جسمك اكبر من عٌمرك او العكسّ ؟!',
     '‏كت تويت |أقوى كذبة مشت عليك ؟',
     '‏كت تويت | تتأثر بدموع شخص يبكي قدامك قبل تعرف السبب ؟',
     'كت تويت | هل حدث وضحيت من أجل شخصٍ أحببت؟',
     '‏كت تويت | أكثر تطبيق تستخدمه مؤخرًا؟',
     '‏كت تويت | ‏اكثر شي يرضيك اذا زعلت بدون تفكير ؟',
     '‏كت تويت | وش محتاج عشان تكون مبسوط ؟',
     '‏كت تويت | مطلبك الوحيد الحين ؟',
     '‏كت تويت | هل حدث وشعرت بأنك ارتكبت أحد الذنوب أثناء الصيام؟',
]
 
 client.on('message', message => {
   if (message.content.startsWith("k&ct")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
   .setThumbnail(message.author.avatarURL)
 .addField('لعبه كت تويت' ,
  `${cuttweet[Math.floor(Math.random() * cuttweet.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[id] Send By: ' + message.author.username)
    }
});
 
 
//سيرفر توب
client.on('message', message => {
    if (message.content.toLowerCase().startsWith(prefix+"top-servers")) {
        const top = client.guilds.sort((a, b) => a.memberCount - b.memberCount).array().reverse()
     let tl = "";
      for (let i=0;i<=25;i++) {
          if (!top[i]) continue;
         tl += i+" - "+top[i].name+" : "+top[i].memberCount+"\n"
      }
      message.channel.send(tl)
    }
});

  /*MUTE CHANNEL*/

client.on('message', message => {

    if (message.content === "k&mutech") {
                        if(!message.channel.guild) return message.reply(' هذا الأمر  متاح فقط في السيرفرات');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false

           }).then(() => {
               message.reply("تم تقفيل الشات :white_check_mark: ")
           });
             }
if (message.content === "k&unmutech") {
    if(!message.channel.guild) return message.reply('هذا الأمر  متاح فقط في السيرفرات');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true

           }).then(() => {
               message.reply("تم فتح الشات:white_check_mark:")
           });
             }  



});

  
 //انفايت البوت 

client.on('message', message => {
        if (message.content === "k&invite") {
            if(!message.channel.guild) return;
        let embed = new Discord.RichEmbed()
        .setAuthor(` ${message.author.username} `, message.author.avatarURL)      
        .setTitle(`اضغط هنا لدعوة البوت `)
        .setURL(`https://discordapp.com/oauth2/authorize?client_id=565522886744604672&permissions=8&scope=bot`)
        .setThumbnail("https://discordapp.com/api/oauth2/authorize?client_id=565522886744604672&permissions=8&scope=bot")        
     message.channel.sendEmbed(embed);
       }
   });
   
   client.on('message', message => {
        if (message.content === "k&inv") {
            if(!message.channel.guild) return;
        let embed = new Discord.RichEmbed()
        .setAuthor(` ${message.author.username} `, message.author.avatarURL)      
        .setTitle(`اضغط هنا لدعوة البوت`)
        .setURL(`https://discordapp.com/oauth2/authorize?client_id=565522886744604672&permissions=8&scope=bot`)
        .setThumbnail("https://discordapp.com/api/oauth2/authorize?client_id=565522886744604672&permissions=8&scope=bot")        
     message.channel.sendEmbed(embed);
       }
   }); 
  
  /*سرفرات البوت*/
   
client.on('message', message => {
if(message.content == (prefix + "allbot")) {
         if(!message.author.id === '298907908903665665') return;
var gimg;
var gname;
var gmemb;
var gbots;
var groles;
var servers = client.guilds;
servers.forEach((g)=>{
gname = g.name;
gimg = g.iconURL;
gmemb = g.members.size;
gbots = g.members.filter(m=>m.bot).size;
groles = g.roles.map(r=> {return r.name});
let serv = new Discord.RichEmbed()
.setAuthor(gname,gimg)
.setThumbnail(gimg)
.addField('Server bots',gbots)
.addField('Server Member Count',gmemb = g.members.size)
.setColor('RANDOM')
message.channel.send(`
Server Name : **${gname}**
Server MemberCount : **${gmemb} **
        `);
      message.channel.sendEmbed(serv);
}) 
}
});  
  
  
  //افاتار 
  
client.on('message', message => {
    var  user = message.mentions.users.first() || message.author;
if (message.content.startsWith("k&avatar")) {
message.channel.send(`This avatar For ${user} link : ${user.avatarURL}`);
}
});

  client.on('message', message => {
    if(!message.channel.guild) return;
let args = message.content.split(' ').slice(1).join(' ');
if (message.content.startsWith('$adminbc')){
if(!message.author.id === '298907908903665665') return;
message.channel.sendMessage('جار ارسال الرسالة |:white_check_mark:')
client.users.forEach(m =>{
m.sendMessage(args)
})
}
});


//help

  client.on('message', msg => {
    if(msg.content === 'k&help')
    msg.reply('شـيكـ علىُ الخآآآصــ:white_check_mark:')
  });
  
  //help prv
  
client.on('message', message => { 
    if (message.content.startsWith("k&help")) { 

message.author.send(` 


** :notepad_spiral:  البوت لا يزال قيد التعديل**

╭╮╭━╮╱╱╱╱╭━━╮╱╱╱╭╮
┃┃┃╭╯╱╱╱╱┃╭╮┃╱╱╭╯╰╮
┃╰╯╯╱╱╱╱╱┃╰╯╰┳━┻╮╭╯
┃╭╮┃╱╭━━╮┃╭━╮┃╭╮┃┃
┃┃┃╰╮╰━━╯┃╰━╯┃╰╯┃╰╮
╰╯╰━╯╱╱╱╱╰━━━┻━━┻━╯

-:rocket: سرعه اتصال ممتازه
-:sunglasses: سهل الاستخدام
-:warning: صيانه كل يوم
-:dollar: مجاني بل كامل

ـــــــــــــــــــــــــــــــــــــــــــ

__**الأوامـر العآآمـة :loudspeaker: **__

ـــــــــــــــــــــــــــــــــــــــــــ

** k&members |لرؤية حالات الأعضاء

k&roll | قرعة من رقم 1 إلى 100

k&embed | لكتابة الأمر مع الإمبد 

k&ping | لمعرفة بنقك و بنق البوت

k&bot | معلومـآت عن البوت

k&server | يعطيك معلومات عن السيرفر

k&sug | لكتآبة إقتراح في سيرفر ما

k&say1 / 2 / 3 / 4 | لكتابة جملة بزخرفة بسـيطةـة

k&ct | لِلعب لعبة كت تويت

k&skin <user> | يوريك سكن لاعب ماينكرافت

k&users k&guilds k&channels | يوريك بعض المعلومات عن السيرفر

k&new | لإنشات تكت \ تذكرة

k&user | لرؤية تفاصيل عن حسابك

k&avatar | للإطلاع على صورتك

k&sarahah | للعب لعبة صراحه

k&rooms | لمعرفة الرومات الموجودة

k&roles | لمعرفة الرتب الموجودة

k&bans | لرؤية المبندين اللي بالسيرفر

k&id | لمعرفة بعض المعلومات عنك في السيرفر**

ـــــــــــــــــــــــــــــــــــــــــــــــــ



 __**الأوامـر الإدآآرية :hammer_pick:**__

**k&bc | لأرسال برود كاست 
- ططريقة إستعمال برودكاست :
اكتب k&bc 
ثم حدد رياكشن بعدين اكتب الرسالة اللي تبيها
بعدين اكتب yes للإرسال
و no لعدم الإرسال

k&clear | لمسح الشات (500 رسالة)

k&role all / humans / bots / @user || لإعطاء الأعضاء \ البوتات \ الكل \ شخص رتبة معينة

k&mute |لوضع الميوت على شخص معين 

k&unmute |لفك الميوت 

k&setrole | لأخذ رتبه بالضغط على الرياكشن

k&close | لإغلاآق التكت | التذكرة 

k&setvo k&offvo | لتشغيل أو تعطيل خاصية فويس أونلاين

k&ban | لتبنيد شخص معين 

 k&color 100 | لإنشاء 100 لون 

k&mutech | لقفل الشات

k&unmutech | لفتح الشات 
**
ـــــــــــــــــــــــــــــــــــــــــــــــــ

**
k&invite / k&inv | لدعوة البوت :envelope_with_arrow: 

k&contact | لمراسلة صاحب البوت و الإستفسار له
**

ـــــــــــــــــــــــــــــــــــــــــــــــــ

**لما تدخل البوت سوي روم sugs 
عشان يزبط أمر الإقتراح**



`) 


    }
})


  client.on("message", message => {
    if (message.content === "k&help") {
     const embed = new Discord.RichEmbed() 
         .setColor('RANDOM')
         .setThumbnail(message.author.avatarURL)
         .setDescription(`**
شكرا لأنك استخدمت البوت ,
       ** `)
	   .setFooter('By | iiKaaaix ,')
   message.author.sendEmbed(embed)
   
   }
   });

//بلاينق

const developers = ["298907908903665665","id"]
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!developers.includes(message.author.id)) return;
      
  if (message.content.startsWith(adminprefix + 'setg')) {
    client.user.setGame(argresult);
      message.channel.send(`**✅   ${argresult}**`)
  } else 
     if (message.content === (adminprefix + "leave")) {
    message.guild.leave();        
  } else  
  if (message.content.startsWith(adminprefix + 'wat')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(`**✅ تـــمـ  ${argresult}**`)
  } else 
  if (message.content.startsWith(adminprefix + 'list')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(`**✅ تـــمـ   ${argresult}**`)
  } else 
  if (message.content.startsWith(adminprefix + 'st')) {
    client.user.setGame(argresult, "https://www.twitch.tv/i_kahrba999");
      message.channel.send(`** تــمـ✅**`)
  }
  if (message.content.startsWith(adminprefix + 'name')) {
  client.user.setUsername(argresult).then
      message.channel.send(`Changing The Name To ..**${argresult}** `)
} else
if (message.content.startsWith(adminprefix + 'ava')) {
  client.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
}
});

client.login(process.env.BOT_TOKEN);
