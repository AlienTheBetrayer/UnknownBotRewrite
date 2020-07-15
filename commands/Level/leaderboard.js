const Discord = require("discord.js");
const mySQL = require("mysql");

const config = require("../.././config.json");

function compare(a, b) {
    if(a.level <= b.level && a.xp >= b.xp) {
        return -1;
    } else {
        return 1;
    }
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

    connection.query(`SELECT * FROM userlevel WHERE guildId = '${message.guild.id}'`, (err, rows) => {
        if(err) {
            console.log(err);
            message.react(config.wrongEmoji);
            return;
        }

        let sortedRows = [];
        let userPlace = 0;

        if(rows.length >= 1) {
            sortedRows = rows.sort(function(a, b) {
                return - a.level + b.level || - a.xp + b.xp;
            });
        }


        for(i = 0; i < sortedRows.length; ++i) {
            if(sortedRows[i].userId == user.id) {
                userPlace = i;
                break;
            }
        }

        const embed = new Discord.MessageEmbed();

        let place = userPlace + 1;

        if(user == message.author) {
            embed.setDescription(`Your place is: **${place}/${sortedRows.length}**`);
        } else {
            embed.setDescription(`<@${user.id}> place is: **${place}/${sortedRows.length}**`);
        }
        
        embed.setTitle("Leaderboard");
        embed.setColor(config.defaultColor);
        embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
        embed.setTimestamp();
        embed.setFooter(`${config.prefix}leaderboard`, client.user.displayAvatarURL());

        let len = 5;

        if(sortedRows.length < len) {
            len = sortedRows.length;
        }

        for(i = 1; i <= len; ++i) {
            const userName = message.guild.members.cache.find(gm => gm.user.id == sortedRows[i - 1].userId).displayName;
            embed.addField(`**${i}**`, `\`\`\`glsl\n# ${userName}\nLevel ${sortedRows[i - 1].level} | ${sortedRows[i - 1].xp} xp.\`\`\``);
        }

        message.channel.send(embed);

    });
}

module.exports.config = {
    name: "leaderboard",
    aliases: ["levels", "top", "lvls"]
}