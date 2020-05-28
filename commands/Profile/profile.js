const Discord = require("discord.js");
const mySQL = require("mysql");
const sharp = require("sharp");

const config = require("../../config.json");

function findValue(array, key) {
    for(i = 0; i < array.length; i += 2) {
        if(array[i] == key) {
            return i;
        }
    }

    return -1;
}

function getValue(array, key, msg) {
    const val = array[findValue(array, key) + 1];
    if(val.substr(0, 3) == "<@!" && val.substr(val.length - 1, 1) == ">") {
        const id_ = val.substr(3, val.length - 4);
        console.log(id_);
        const members = msg.guild.members.cache;
        const nick = members.find(u => u.user.id == id_).displayName;
        return nick;
    } 

    return array[findValue(array, key) + 1];
}

function sqlQuery(con, query) {
    return new Promise((resolve, reject) => {
        con.query(
            query,
            (error, results) => {
                if (error) return reject(error);

                return resolve(results);
            });
    });
}

module.exports.run = async(client, message, args, connection) => {
    let user = message.mentions.users.first();

    if(!user && args[0]) {
        const members = message.guild.members.cache;

        members.forEach(guildMember => {
            if(guildMember.user.username.toLowerCase().includes(args[0].toLowerCase()) || guildMember.displayName.toLowerCase().includes(args[0].toLowerCase())) {
                user = guildMember.user;
            }
        });
    }

    if(!args[0] && !user) {
        user = message.author;
    }

    const availableKeys = ["name", "age", "status", "mood", "love", "color", "avatar", "birthday"];
    const defaultKeys = [`${user.username}`, "Age", "Status", "Mood", "Alone", `${config.defaultColor}`, `${user.displayAvatarURL({format : "png", dynamic : true, size : 1024})}`, "Birthday"];
    let userData = []

    await sqlQuery(connection, `SELECT * FROM userProfile WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(rows => {
        let found = false;

        for(j = 0; j < availableKeys.length; ++j) {
            found = false;
            for(j_ = 0; j_ < rows.length; ++j_) {
                if(availableKeys[j] == rows[j_].data) {
                    userData.push(rows[j_].data);
                    userData.push(rows[j_].value);
                    found = true;
                }
            }

            if(!found) {
                userData.push(availableKeys[j]);
                userData.push(defaultKeys[j]);
            }
        }
    });     

    let lovestr;
    if(getValue(userData, "love", message) == "Alone") {
        lovestr = `Alone ${config.noLoveEmoji}`;
    } else {
        lovestr = getValue(userData, "love", message);
    }

    let userLevel;
    let userXp;

    await sqlQuery(connection, `SELECT * FROM userlevel WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(rows => {
        if(rows.length >= 1) {
        userXp = rows[0].xp;
        userLevel = rows[0].level;
        } else {
            userXp = 0;
            userLevel = 1;
        }
    });
    
    const embed = new Discord.MessageEmbed();

    embed.setColor(getValue(userData, "color", message));
    embed.setAuthor(user.username + "#" + user.discriminator, user.displayAvatarURL());
    embed.setTimestamp();
    embed.setTitle("Profile");
    embed.setDescription(`This is a profile of <@${user.id}>`);
    embed.addField("**Name**", "```" + getValue(userData, "name", message) + "```", true);
    embed.addField("**Age**", "```" +  getValue(userData, "age", message) + "```", true);
    embed.addField("**Mood**", "```" +  getValue(userData, "mood", message) +"```", true);
    embed.addField("**Status**", "```" + getValue(userData, "status", message)  + "```", false);
    embed.addField("**Love**", "```" + lovestr + "```", true);
    embed.addField("**Birthday**", "```" + getValue(userData, "birthday", message) + "```", true);
    embed.addField("**XP**", "```" + userXp + "```", false);
    embed.addField("**Level**", "```" + userLevel + "```", true);
    embed.setImage(getValue(userData, "avatar"));
    embed.setFooter(`$profile | This is profile! Type $profilechange <data> <value> to change it! `, client.user.displayAvatarURL());

    message.channel.send(embed);

    
}

module.exports.config = {
    name: "profile",
    aliases: [""]
}