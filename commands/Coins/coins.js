const Discord = require("discord.js");

const config = require("../.././config.json");

function sqlQuery(con, query) {
    return new Promise((resolve, reject) => {
        con.query(
            query,
            (error, results) => {
                return resolve(results);
            });
    });
}

module.exports.run = async(client, message, args, connection) => {
    let member = message.mentions.members.first();
    let found = false;

    if(!member && args[0]) { 
        const members = message.guild.members.cache;

        members.forEach(cachedMember => {
            if(cachedMember.displayName.toLowerCase().includes(args[0].toLowerCase())) {
                member = cachedMember;
                found = true;
            }
        });
    }

    if(!args[0] || !found) { 
        member = message.member;
    }

    await sqlQuery(connection, `SELECT * FROM coins WHERE userId = '${member.user.id}' AND guildId = '${message.guild.id}'`)
    .then(rows => {
        if(rows.length < 1) {
            message.react(config.wrongEmoji);
            return;
        }

        const amount = rows[0].amount;
        const name = member.displayName;

        const embed = new Discord.MessageEmbed();
    
        embed.setColor(config.defaultColor);
        embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
        embed.setTimestamp();
        embed.setFooter(`${config.prefix}coins`, client.user.displayAvatarURL());
        embed.setTitle("Coins");
        embed.setDescription(`\`\`\`glsl\n# ${name}\n${amount} 🟡\`\`\``);

        message.channel.send(embed);
    });
}

module.exports.config = {
    name: "coins",
    aliases: []
}