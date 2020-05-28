const Discord = require("discord.js");

const config = require("../.././config.json");

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
    let found = false;

    if(!member && args.slice(0).join(" ")) {
        const members = message.guild.members.cache;

        members.forEach(guildMember => {
            if(guildMember.displayName.toLowerCase().includes(args.slice(0).join(" ").toLowerCase()) || guildMember.user.username.toLowerCase().includes(args.slice(0).join(" ").toLowerCase())) {
                member = guildMember;
                found = true;
            }
        });
    }

    if(!member && !args.slice(0).join(" ") || !found) {
        message.react(config.wrongEmoji);
        return;
    }

    if(member.user == message.author) {
        message.react(config.wrongEmoji);
        return;
    }

    await sqlQuery(connection, `SELECT * FROM roleplayData WHERE guildId = '${message.guild.id}' AND userId = '${member.user.id}'`)
    .then(rows => {
        if(rows.length >= 1) {
            connection.query(`UPDATE roleplayData SET kisses = ${rows[0].kisses + 1} WHERE userId = '${member.user.id}' AND guildId = '${message.guild.id}'`);
            connection.query(`UPDATE roleplayData SET kisses = ${rows[0].kisses + 1} WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`);

            
            const embed = new Discord.MessageEmbed();
    
            embed.setColor(config.defaultColor);
            embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
            embed.setTimestamp();
            embed.setFooter(`${config.prefix}kiss`, client.user.displayAvatarURL());
            embed.setTitle("Kiss");
            embed.setDescription(`<@${message.author.id}> has kissed <@${member.user.id}> ${config.loveEmoji}`);

            message.channel.send(embed);
        } else {
            message.react(config.wrongEmoji);
            return;
        }
    });
}

module.exports.config = {
    name: "kiss",
    aliases: [""]
}