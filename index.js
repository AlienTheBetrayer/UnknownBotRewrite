// Library setup
const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");   
const random = require("random");
const mySQL = require("mysql");

// File setup
const config = require("./config.json");
const pconfig = require("./private_config.json");

// Config
const prefix = config.prefix;
const version = config.version;

// Private config
const token = pconfig.token;

const sql_host = pconfig.host;
const sql_user = pconfig.user;
const sql_password = pconfig.password;
const sql_database = pconfig.database;

const caller = pconfig.caller;

// Discord client
const client = new Discord.Client();

// Loading commands
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.mutes = require("./commands/mutes.json"); // TODO: MUTES

console.log("\n[INFO] Command loading has been started.");

// Variables for outputting in the console
let loaded = false;
let cmds = 0;
const events = 10;

// Getting all the commands
fs.readdir("./commands/", (err, files) => { 
    files.forEach(fileName => { 
        fs.readdir("./commands/" + fileName, (err_, file) => { 
            let dotIndex = fileName.indexOf(".");

            if(dotIndex == -1) {
                if (file.length >= 1) {
                    console.log("\n[MODULE LOADING] " + fileName + " module has been opened.\n");
                }
            file.forEach(commandName => { 
                let pull = require("./commands/" + fileName + "/" + commandName);
                client.commands.set(pull.config.name, pull);

                let dotIndex = commandName.indexOf(".");
                let fileType = commandName.substr(dotIndex + 1, commandName.length - 1 - dotIndex);

                if(fileType == "js") {
                    console.log("[COMMAND LOADING] " + commandName + " has been loaded.");
                    loaded = true;
                    ++cmds;
                }

                pull.config.aliases.forEach(alias => {
                    client.aliases.set(alias, pull.config.name);
                });
            });
        }
        });
    });
});

if (loaded) {
    console.log("\n");
} 

function createServer(guildId, object) {
    client.guildSettings.ensure(guildId, object);
}

// Client events
client.on("ready", () => { // Client boot event
    let status = "Indev";

    if(caller == "pi") {
        status = "Stable";
    }

    client.user.setActivity(`${status} v${version} | ` + prefix + "help", {type: "STREAMING", url: "https://www.twitch.tv/alienbetrayer"});
    
    console.log(`\n${cmds} commands and ${events} events have been successfully loaded.`);

    console.log("\n[BOOT] Bot has started. \n\n");
});

var connection = mySQL.createConnection({
    host: sql_host,
    user: sql_user,
    password: sql_password,
    database: sql_database,
    charset : 'utf8mb4'
});

connection.connect(err => {
    if(err) throw err;

    console.log("\n[DATABASE] Connected to the database.\n\n");
});

function sqlQuery(con, query) {
    return new Promise((resolve, reject) => {
        con.query(
            query,
            (error, results) => {
                return resolve(results);
            });
    });
}

let cooldown = new Set();
const cooldownSeconds = 5;

client.on("message", async message => {  // Client message event
    if (message.author.bot || message.channel.type == "dm" || cooldown.has(message.author.id))
        return;

    if(!message.member.hasPermission("ADMINISTRATOR") && message.author.id != "351382367530647554") {
        cooldown.add(message.author.id);
    }

    if(message.content.startsWith("<@!707252972521783327>")) { // bot says hello
        message.channel.send("Hello! I am UnknownBot, my prefix is **$**.");
        return;
    }

    await sqlQuery(connection, `SELECT * FROM userlevel WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`)
    .then(rows => {
        if(rows.length < 1) {
            const defaultStats = [0, 1];

            connection.query(`INSERT INTO userlevel(userId, guildId, xp, level) VALUES('${message.author.id}', '${message.guild.id}', ${defaultStats[0]}, ${defaultStats[1]})`);
        }
    });

    await sqlQuery(connection, `SELECT * FROM coins WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`)
    .then(rows => {
        if(rows.length < 1) {
            const defaultCoin = 0;

            connection.query(`INSERT INTO coins(userId, guildId, amount) VALUES(${message.author.id}, ${message.guild.id}, ${defaultCoin})`)
        }
    });

    if(!message.content.startsWith("$")) { // not command, meaning you can get level with ti
        let sql, sql_;

        await sqlQuery(connection, `SELECT * FROM userlevel WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`)
        .then(async rows => {
            if (message.content.startsWith(prefix))
                return;

            const xpRange = [10, 30];  

            let level, levelupXp, addXp;
            let currentXp, currentLevel;

            currentXp = rows[0].xp;
            currentLevel = rows[0].level;

            addXp = random.int(xpRange[0], xpRange[1]);
            levelupXp = 25 * currentLevel * (currentLevel + 1);
            
            if(currentXp >= levelupXp || currentXp + addXp >= levelupXp) {
                level = currentLevel + 1;

                const embed = new Discord.MessageEmbed();
    
                embed.setColor(config.defaultColor);
                embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
                embed.setTimestamp();
                embed.setFooter(`$lvl`, client.user.displayAvatarURL());
                embed.setTitle("Level up!");
                embed.setDescription(`Congratulations on reaching new level!\n You have obtained **${level * 16}** coins!`);
                embed.addField("New level", "```" + level + "```");

                let msg = message.channel.send(embed)
                .then(msg => {
                    msg.delete({timeout : 15000});
                });

                sql = `UPDATE userlevel SET level = ${level} WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`;
                sql_ = `UPDATE userlevel SET xp = 0 WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`;

                // coin update

                await sqlQuery(connection, `SELECT * FROM coins WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`)
                .then(async rows_ => {
                    const currentCoins = rows_[0].amount;

                    await sqlQuery(connection, `UPDATE coins SET amount = ${currentCoins + level * 16} WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`);
                });

            } else {        
                sql = `UPDATE userlevel SET xp = ${currentXp + addXp} WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`;
                sql_ = `UPDATE userlevel SET level = ${currentLevel} WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`;
            }
        });

        await sqlQuery(connection, `SELECT * FROM roleplaydata WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
        .then(rows => {
            if(rows.length < 1) {
                let sql;

                sql = `INSERT INTO roleplaydata(guildId, userId, hugs, kisses, punches) VALUES('${message.guild.id}', '${message.author.id}', 0, 0, 0)`;

                connection.query(sql);
            }
        });
        
        if(sql) {
            connection.query(sql);
        }

        if(sql_) {
            connection.query(sql_);
        }

        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, (cooldownSeconds * 1000) / 4);
    } else { // command
        if(message.content == "$") return;

        const parts = message.content.split(" ");
        const command = parts[0];
        const args = parts.slice(1);
    
        let commandFile = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.aliases.get(command.slice(prefix.length)))
    
        if (commandFile) {
             commandFile.run(client, message, args, connection);

             setTimeout(() => {
                cooldown.delete(message.author.id);
            }, (cooldownSeconds * 1000) / 2);
        } else {
            cooldown.delete(message.author.id);
        }
    }
 });

function FindChannel(channelName, messageObject) {
    return messageObject.guild.channels.cache.find(ch => ch.name === channelName); 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function ensureLogsChannel(messageObject) {
    const found = FindChannel("logs", messageObject);

    if(!found) {
        messageObject.guild.channels.create("logs", {
            type : "text",
            topic : "Unknown Bot logs channel.",
            permissionOverwrites : [
                {
                id : messageObject.guild.id,
                deny : ["VIEW_CHANNEL"]
                }
            ],
        });
    } 
}

function findExtension(url) {
    let dotIndex = 0;

    for(i = 0; i < url.length; ++i) {
        if(url[i] == ".") {
            dotIndex = i;
        }
    }

    return dotIndex;
}

function log(embedObject, logType, guildId) {
    const guilds = client.guilds;
    const logGuild = guilds.cache.find(g => g.id == "710437570626060339");

    if(logGuild) {
        const channel = logGuild.channels.cache.find(ch => ch.name.includes(logType));
        const guildName = guilds.cache.find(g => g.id == guildId).name;
        embedObject.addField("Guild name", "```" + guildName + "```")
        channel.send(embedObject);
    }
}

client.on("messageDelete", async message => {
    if(message.author.bot) return;

    const messages = ["$me", "$do", "$try", "$embed"];

    for(i = 0; i < messages.length; ++i) {
        if(message.content.startsWith(messages[i])) {
            return;
        }
    }

    for(i = 0; i < message.content.length; ++i) {
        const found = message.content.indexOf("`");

        if(found != -1) {
            message.content = message.content.replace("`", "");
        }
    }

    ensureLogsChannel(message);

    await sleep(1000);

    const channel = FindChannel("logs", message);

    if(!channel) {
        message.react(config.wrongEmoji);
        return;
    }

    let msg = message.content;

    const timestamp_ = (moment.unix(message.createdTimestamp / 1000));
    const createdDate = timestamp_.format("MMMM Do YYYY, h:mm:ss a"); 


    const embed = new Discord.MessageEmbed();

    embed.setColor(config.errorColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`Message delete event.`, client.user.displayAvatarURL());
    embed.setTitle("Message has been deleted.");

    if (message.attachments.size > 0) {
        message.attachments.forEach(attachment => { 
            let extensionName = attachment.url.substring(findExtension(attachment.url) + 1, attachment.url.length).toUpperCase();

            if(attachment.url.indexOf("png") != -1 || attachment.url.indexOf("jpg") != -1) {
                embed.setImage(attachment.proxyURL);
            }

            msg += `[ATTACHMENT-${extensionName}] : ` + attachment.name;
        });
    }


    embed.addField("Created at", "```" + createdDate + "```");
    embed.addField("Message content", "```" + msg +"```");

    channel.send(embed);
    log(embed, "message", message.guild.id);
});



client.on("messageUpdate", async (oldMessage, newMessage) => {
    if(oldMessage == newMessage || newMessage.author.bot) return;

    for(i = 0; i < oldMessage.content.length; ++i) {
        const found = oldMessage.content.indexOf("`");

        if(found != -1) {
            oldMessage.content = oldMessage.content.replace("`", "");
        }
    }

    for(i = 0; i < newMessage.content.length; ++i) {
        const found = newMessage.content.indexOf("`");

        if(found != -1) {
            newMessage.content = newMessage.content.replace("`", "");
        }
    }
    

    ensureLogsChannel(newMessage);

    await sleep(1000);

    const channel = FindChannel("logs", newMessage);
    

    if(!channel) {
        newMessage.react(config.wrongEmoji);
        return;
    }

    const timestamp_ = (moment.unix(newMessage.createdTimestamp / 1000));
    const createdDate = timestamp_.format("MMMM Do YYYY, h:mm:ss a"); 

    const timestamp__ = (moment.unix(newMessage.editedTimestamp / 1000));
    const editedDate = timestamp__.format("MMMM Do YYYY, h:mm:ss a"); 

    if(editedDate.indexOf("1970") != -1) {
        return;
    }

    const embed = new Discord.MessageEmbed();

    embed.setColor(config.warnColor);
    embed.setAuthor(newMessage.author.username + "#" + newMessage.author.discriminator, newMessage.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`Message edit event. `, client.user.displayAvatarURL());
    embed.setTitle("Message has been edited.");
    embed.addField("Message link", `Message jump **[#${newMessage.channel.name}](${newMessage.url})**`);
    embed.addField("Created at", "```" + createdDate + "```");
    embed.addField("Edited at", "```" + editedDate + "```");
    embed.addField("Old message content", "```" + oldMessage.content +"```");
    embed.addField("New message content", "```" + newMessage.content +"```");

    channel.send(embed);
    log(embed, "message", newMessage.guild.id);
});



client.on("roleDelete", async role => {
    const name = role.name;

    const timestamp_ = (moment.unix(role.createdTimestamp / 1000));
    const createdDate = timestamp_.format("MMMM Do YYYY, h:mm:ss a");

    ensureLogsChannel(role);

    await sleep(1000);

    const channel = FindChannel("logs", role);

    
    if(!channel) {
        console.log("[ERROR] roleDelete event couldn't find channel to print out logs. \n");
    }

    const color = role.hexColor;

    if(color == 000000) {
        color = config.defaultColor;
    }


    const embed = new Discord.MessageEmbed();

    embed.setColor(color);
    embed.setTimestamp();
    embed.setFooter(`Role delete event`, client.user.displayAvatarURL());
    embed.setTitle("Role has been deleted.");
    embed.addField("Name", name);
    embed.addField("Created at", createdDate);

    channel.send(embed);
    log(embed, "role", role.guild.id);
});



client.on("guildMemberAdd", member => {
    const joinReplies = ["Hooray!", "Welcome!", "Hello!", "Hey!", "Howdy!", "Hi!"];
    const joinIndex = random.int(0, joinReplies.length - 1);
    
    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.defaultColor);
    embed.setAuthor(member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`Member joined event`, client.user.displayAvatarURL());
    embed.setTitle(joinReplies[joinIndex]);
    embed.setDescription("<@" + member.user.id + ">"  + " has joined us! 🎉");

    member.guild.systemChannel.send(embed);
    log(embed, "user", member.guild.id);
});



client.on("guildMemberRemove", member => {
    const leaveReplies = ["Farewell!", "Bye...", "Goodbye.", "Sad moment..."];
    const leaveIndex = random.int(0, leaveReplies.length - 1);

    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.defaultColor);
    embed.setAuthor(member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`Member left event`, client.user.displayAvatarURL());
    embed.setTitle(leaveReplies[leaveIndex]);
    embed.setDescription("<@" + member.user.id + ">" + " has left us... 🙁");

    member.guild.systemChannel.send(embed);
    log(embed, "user", member.guild.id);
});


client.on("roleCreate", async role => {
    ensureLogsChannel(role);

    await sleep(1000);

    const channel = FindChannel("logs", role);

    if(!channel) {
        console.log("[ERROR] roleCreate event couldn't find channel to print out logs. \n");
    }

    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.successColor);
    embed.setTimestamp();
    embed.setFooter(`Role create event`, client.user.displayAvatarURL());
    embed.setTitle("New role has been created.");

    channel.send(embed);
    log(embed, "role", role.guild.id);
});



client.on("emojiCreate", async emoji => {
    ensureLogsChannel(emoji);

    await sleep(1000);

    const channel = FindChannel("logs", emoji);

    if(!channel) {
        console.log("[ERROR] emojiCreate event couldn't find channel to print out logs. \n");
    }

    const timestamp_ = (moment.unix(emoji.createdTimestamp / 1000));
    const createdDate = timestamp_.format("MMMM Do YYYY, h:mm:ss a"); 

    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.successColor);
    embed.setTimestamp();
    embed.setFooter(`Emoji create event`, client.user.displayAvatarURL());
    embed.setTitle("New emoji has been created.");
    embed.addField("Emoji", emoji);
    embed.addField("Emoji name", "```" + emoji.name + "```");
    embed.addField("Created at", "```" + createdDate + "```");

    channel.send(embed);
    log(embed, "emoji", emoji.guild.id);
});



client.on("emojiDelete", async emoji => {
    ensureLogsChannel(emoji);

    await sleep(1000);

    const channel = FindChannel("logs", emoji);

    if(!channel) {
        console.log("[ERROR] emojiDelete event couldn't find channel to print out logs. \n");
    }

    const timestamp_ = (moment.unix(emoji.createdTimestamp / 1000));
    const createdDate = timestamp_.format("MMMM Do YYYY, h:mm:ss a"); 

    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.errorColor);
    
    embed.setTimestamp();
    embed.setFooter(`Emoji delete event`, client.user.displayAvatarURL());
    embed.setTitle("Emoji has been deleted.");
    embed.addField("Emoji name", "```" + emoji.name + "```");
    embed.addField("Created at", "```" + createdDate + "```");

    channel.send(embed);
    log(embed, "emoji", emoji.guild.id);
});



client.on("channelCreate", async channel_ => {
    ensureLogsChannel(channel_);

    await sleep(1000);

    const channel = FindChannel("logs", channel_);

    if(!channel) {
        console.log("[ERROR] channelCreate event couldn't find channel to print out logs. \n");
    }

    const timestamp_ = (moment.unix(channel_.createdTimestamp / 1000));
    const createdDate = timestamp_.format("MMMM Do YYYY, h:mm:ss a"); 

    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.successColor);
    
    embed.setTimestamp();
    embed.setFooter(`Channel create event`, client.user.displayAvatarURL());
    embed.setTitle("New channel has been created.");
    embed.addField("Channel name", "```" + channel_.name + "```");
    embed.addField("Type", "```" + channel_.type + "```");
    embed.addField("Created at", "```" + createdDate + "```");

    channel.send(embed);
    log(embed, "channel", channel.guild.id);
});



client.on("channelDelete", async channel_ => {
    ensureLogsChannel(channel_);

    await sleep(1000);

    const channel = FindChannel("logs", channel_);

    if(!channel) {
        console.log("[ERROR] channelDelete event couldn't find channel to print out logs. \n");
    }

    const timestamp_ = (moment.unix(channel_.createdTimestamp / 1000));
    const createdDate = timestamp_.format("MMMM Do YYYY, h:mm:ss a"); 

    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.errorColor);
    
    embed.setTimestamp();
    embed.setFooter(`Channel delete event`, client.user.displayAvatarURL());
    embed.setTitle("Channel has been deleted.");
    embed.addField("Channel name", "```" + channel_.name + "```");
    embed.addField("Type", "```" + channel_.type + "```");
    embed.addField("Created at", "```" + createdDate + "```");

    channel.send(embed);
    log(embed, "channel", channel.guild.id);
});




client.on("messageDeleteBulk", async messages => {
    const count = messages.size;

    ensureLogsChannel(messages.first());

    await sleep(1000);

    const channel = FindChannel("logs", messages.first());

    if(!channel) {
        console.log("[ERROR] channelDelete event couldn't find channel to print out logs. \n");
    }

    const firstMessage = messages.first();
    const firstMessageURL = firstMessage.url;
    const channelURL = firstMessageURL.substr(0, firstMessageURL.lastIndexOf("/"));

    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.defaultColor);
    embed.setTimestamp();
    embed.setFooter(`Message bulk delete.`, client.user.displayAvatarURL());
    embed.setTitle("Messages have been purged.");
    embed.setDescription(`Channel jump **[#${messages.first().channel.name}](${channelURL})**`);
    embed.addField("Count", `\`\`\`${count}\`\`\``);

    channel.send(embed);
    log(embed, "message", messages.first().guild.id);
});


client.login(token);