const Discord = require("discord.js");
const mySQL = require("mysql");

const config = require("../../config.json");

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
    let member = message.mentions.members.first();

    if(!member && args[0]) {
        const members = message.guild.members.cache;

        members.forEach(guildMember => {
            if(guildMember.user.username.toLowerCase().includes(args[0].toLowerCase()) || guildMember.displayName.toLowerCase().includes(args[0].toLowerCase())) {
                member = guildMember;
            }
        });
    }

    if(!member && !args[0]) {
        member = message.member;
    }

    await sqlQuery(connection, `SELECT * FROM userlevel WHERE userId = '${member.user.id}' AND guildId = '${message.guild.id}'`).then(rows => {
        if(rows.length < 1) {
            message.react(config.wrongEmoji);
            return;
        }

        const currentLevel = rows[0].level;
        const currentXp = rows[0].xp;
    
        levelupXp = currentLevel * currentLevel * (100 / currentLevel);
            
        const neededXp = levelupXp - currentXp;
        const havePercentage = 100 - Math.floor((neededXp / levelupXp) * 100);
    
        const embed = new Discord.MessageEmbed();
    
        embed.setColor(config.defaultColor);
        embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
        embed.setTimestamp();
        embed.setFooter(`${config.prefix}level`, client.user.displayAvatarURL());
        embed.setTitle("Level");
        embed.addField("Level", "```" + currentLevel + "```", true);
        embed.addField("Xp", "```"+ currentXp + "```", true);
        embed.addField("Percentage", "```" + havePercentage + " / 100 %" + "```")

        let progressBar = '';

        for(i = 1; i <= 10; ++i) {
            const bar = Math.round(havePercentage / 10);

            progressBar = (i <= bar) ? progressBar.concat("⬜") : progressBar.concat("⬛");
        }

        embed.addField("Progress bar", "```" + progressBar + "```");
        embed.addField("Xp to level up", "```" + neededXp + "```");
        
        message.channel.send(embed);
    });
}

module.exports.config = {
    name: "userlevel",
    aliases: ["lvl"]
}