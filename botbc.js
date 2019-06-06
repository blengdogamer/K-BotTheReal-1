const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
var prefix = ","
var adminprefix = 'kx&'

client.on('ready',  () => {
    console.log('تم تشغيل ');
	console.log('By : .iiKaix ');
     console.log('K-Bot Team , ');
    console.log(`Logged in as * [ " ${client.user.username} " ] servers! [ " ${client.guilds.size} " ]`);
    console.log(`Logged in as * [ " ${client.user.username} " ] Users! [ " ${client.users.size} " ]`);
    console.log(`Logged in as * [ " ${client.user.username} " ] channels! [ " ${client.channels.size} " ]`);
  });








//roleuserbot

client.on('guildCreate', guild => {
  let support = client.guilds.get('579476178755125261') // حط هنا ايدي سيرفر السبورت
  if(support === undefined) return
  let role = support.roles.find(r => r.name == '- UserBot.') // بدلها بأسم الرتبة يلي تبيها للمستخدمين
  let member = support.members.get(guild.owner.user.id) 
  if(member) {
    member.addRole(role)
  } else {
    console.log(`هذا العضو ليس من المضيفين البوت لسيرفره.`)
  }
})




//ticket
client.on("message", (message) => {
   if (message.content.startsWith(",new")) {     
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
 
 
  if (message.content.startsWith(",close")) {
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
   .setAuthor(`.K-Bot Joined a Server ✅`)
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
   .setAuthor(`.K-Bot left a server ❎`)
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
  .addField("**العضو :**",  '**[ ' + `${user.tag}` + ' ]**')
  .addField("**تم الطرد من قبل :**", '**[ ' + `${message.author.tag}` + ' ]**')
  .addField("**السبب:**", '**[ ' + `${reason}` + ' ]**')
  message.channel.send({
    embed : kickembed
  })
}
});



//voice-online

let vojson = JSON.parse(fs.readFileSync('vojson.json', 'utf8'))
client.on('message', message => {
    if(message.content.startsWith(prefix + "setvo")) {
let channel = message.content.split(" ").slice(1).join(" ")
let channelfind = message.guild.channels.find('name', `${channel}`)
if(!channel) return message.channel.send('المرجو كتابة إسم الروم الصوتي بدون أخطاء مثل: ,setvo <Channel name>')
if(!channelfind) return message.channel.send('المرجو كتابة إسم الروم الصوتي بدون أخطاء مثل : ,setvo <Channel name>')
vojson[message.guild.id] = {
stats: 'enable',
chid: channelfind.id,
guild: message.guild.id
 
}
channelfind.setName(`Voice Online : ${message.guild.members.filter(m => m.voiceChannel).size}`)
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
    message.channel.send(`\`${args}\` **: __عدد الرسائل التي تم مسحها __** `).then(messages => messages.delete(5000));
  }
  });
  
    //mute
	
client.on('message', async message =>{
  if (message.author.boss) return;
	var prefix = ",";

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

    
      



//membersstatus

    client.on('message', message => {
              if (!message.channel.guild) return;
      if(message.content ==',members')
      var IzRo = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setFooter(message.author.username, message.author.avatarURL)
      .setTitle(':tulip:| حالات الأعضاء')
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
    if (message.content.startsWith(',ban ')) {
      if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('هذا الخاصية للإدارة فقط');
        var member= message.mentions.members.first();
        member.ban().then((member) => {
         message.channel.send(member.displayName + 'تم تبنيد هذا الشخص من السيرفر');
        }).catch(() => {
            message.channel.send('Error :_:');
        });
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
    if (message.content.startsWith(",bot")) {
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





//سيرفر توب
client.on('message', message => {
    if (message.content.toLowerCase().startsWith(prefix+"botservers")) {
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

    if (message.content === ",mutech") {
                        if(!message.channel.guild) return message.reply(' هذا الأمر  متاح فقط في السيرفرات');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false

           }).then(() => {
               message.reply("تم تقفيل الشات :white_check_mark: ")
           });
             }
if (message.content === ",unmutech") {
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
        if (message.content === ",invite") {
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
        if (message.content === ",inv") {
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
if (message.content.startsWith(",avatar")) {
message.channel.send(`This avatar For ${user} link : ${user.avatarURL}`);
}
});

  client.on('message', message => {
    if(!message.channel.guild) return;
let args = message.content.split(' ').slice(1).join(' ');
if (message.content.startsWith('K-bc')){
if(!message.author.id === '298907908903665665') return;
message.channel.sendMessage('جار ارسال الرسالة |:white_check_mark:')
client.users.forEach(m =>{
m.sendMessage(args)
})
}
});


//help

  client.on('message', msg => {
    if(msg.content === ',help')
    msg.reply('شـيكـ علىُ الخآآآصــ:white_check_mark:')
  });
  
  //help prv
  
client.on('message', message => {
    if (message.content.startsWith(",help")) {
 
message.author.send(`
 
 
** :notepad_spiral:  البوت المتكاامل **
 
╭╮╭━╮╱╱╱╱╭━━╮╱╱╱╭╮
┃┃┃╭╯╱╱╱╱┃╭╮┃╱╱╭╯╰╮
┃╰╯╯╱╱╱╱╱┃╰╯╰┳━┻╮╭╯
┃╭╮┃╱╭━━╮┃╭━╮┃╭╮┃┃
┃┃┃╰╮╰━━╯┃╰━╯┃╰╯┃╰╮
╰╯╰━╯╱╱╱╱╰━━━┻━━┻━╯
 
ـــــــــــــــــــــــــــــــــــــــــــ
 
__**الأوامـر العآآمـة :loudspeaker: **__
 
ـــــــــــــــــــــــــــــــــــــــــــ
 
**,members |لرؤية حالات الأعضاء

,embed | لكتابة الأمر مع الإمبد
 
,ping | لمعرفة بنقك و بنق البوت
 
,bot | معلومـآت عن البوت
 
,server | يعطيك معلومات عن السيرفر
 
,users \ ,channels | يوريك بعض المعلومات عن السيرفر
 
,avatar | للإطلاع على صورتك
 
,rooms | لمعرفة الرومات الموجودة
 
,roles | لمعرفة الرتب الموجودة

,id | لمعرفة بعض المعلومات عنك**

ـــــــــــــــــــــــــــــــــــــــــــــــــ 
 
 __**الأوامـر الإدآآرية :hammer_pick:**__
 
**
,clear | لمسح الشات (500 رسالة)
 
,mute |لوضع الميوت على شخص معين
 
,unmute |لفك الميوت

,setvo , ,offvo | لتشغيل أو تعطيل خاصية فويس أونلاين
 
,ban | لتبنيد شخص معين
 
,color 100 | لإنشاء 100 لون
 
,mutech | لقفل الشات
 
,unmutech | لفتح الشات
 
 
ـــــــــــــــــــــــــــــــــــــــــــــــــ

 
,invite / ,inv | لدعوة البوت :envelope_with_arrow:

 
ــــــــــــــــــــــــــــــــــــــــــــــــــ
**
 
 
`)
 
 
    }
})

//مانع الجحفله

var guilds = {};
client.on('guildBanAdd', function(guild) {
            const rebellog = client.channels.find("name", "log"),
            Onumber = 3,
  Otime = 10000
guild.fetchAuditLogs({
    type: 22
}).then(audit => {
    let banner = audit.entries.map(banner => banner.executor.id)
    let bans = guilds[guild.id + banner].bans || 0 
    guilds[guild.id + banner] = {
        bans: 0
    }
      bans[guilds.id].bans += 1; 
if(guilds[guild.id + banner].bans >= Onumber) {
try {
let roles = guild.members.get(banner).roles.array();
guild.members.get(banner).removeRoles(roles);
  guild.guild.member(banner).kick();

} catch (error) {
console.log(error)
try {
guild.members.get(banner).ban();
  rebellog.send(`<@!${banner.id}>
حآول العبث بالسيرفر @everyone`);
guild.owner.send(`<@!${banner.id}>
حآول العبث بالسيرفر ${guild.name}`)
    setTimeout(() => {
 guilds[guild.id].bans = 0;
  },Otime)
} catch (error) {
console.log(error)
}
}
}
})
});
 let channelc = {};
  client.on('channelCreate', async (channel) => {
  const rebellog = client.channels.find("name", "log"),
  Oguild = channel.guild,
  Onumber = 3,
  Otime = 10000;
  const audit = await channel.guild.fetchAuditLogs({limit: 1});
  const channelcreate = audit.entries.first().executor;
  console.log(` A ${channel.type} Channel called ${channel.name} was Created By ${channelcreate.tag}`);
   if(!channelc[channelcreate.id]) {
    channelc[channelcreate.id] = {
    created : 0
     }
 }
 channelc[channelcreate.id].created += 1;
 if(channelc[channelcreate.id].created >= Onumber ) {
    Oguild.members.get(channelcreate.id).kick();
rebellog.send(`<@!${channelcreate.id}>
حآول العبث بالسيرفر @everyone`);
channel.guild.owner.send(`<@!${channelcreate.id}>
حآول العبث بالسيرفر ${channel.guild.name}`)
}
  setTimeout(() => {
 channelc[channelcreate.id].created = 0;
  },Otime)
  });

let channelr = {};
  client.on('channelDelete', async (channel) => {
  const rebellog = client.channels.find("name", "log"),
  Oguild = channel.guild,
  Onumber = 3,
  Otime = 10000;
  const audit = await channel.guild.fetchAuditLogs({limit: 1});
  const channelremover = audit.entries.first().executor;
  console.log(` A ${channel.type} Channel called ${channel.name} was deleted By ${channelremover.tag}`);
   if(!channelr[channelremover.id]) {
    channelr[channelremover.id] = {
    deleted : 0
     }
 }
 channelr[channelremover.id].deleted += 1;
 if(channelr[channelremover.id].deleted >= Onumber ) {
  Oguild.guild.member(channelremover).kick();
rebellog.send(`<@!${channelremover.id}>
حآول العبث بالسيرفر @everyone`);
channel.guild.owner.send(`<@!${channelremover.id}>
حآول العبث بالسيرفر ${channel.guild.name}`)
}
  setTimeout(() => {
 channelr[channelremover.id].deleted = 0;
  },Otime)
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
