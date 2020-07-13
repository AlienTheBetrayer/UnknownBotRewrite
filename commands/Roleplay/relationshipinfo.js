const Discord = require("discord.js");
const mySQL = require("mysql");

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
    await sqlQuery(connection, `SELECT * FROM relationship WHERE firstUserId = '${message.author.id}' OR secondUserId = '${message.author.id}' AND guildId = '${message.guild.id}'`)
    .then(rows => {
        if(rows.length >= 1) {
            const embed = new Discord.MessageEmbed();
    
            embed.setColor(config.defaultColor);
            embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
            embed.setTimestamp();
            embed.setFooter(`${config.prefix}relationshipinfo`, client.user.displayAvatarURL());
            embed.setTitle(`Relationship information ${config.loveEmoji}`);
            const firstName = message.guild.members.cache.find(m => m.user.id == rows[0].firstUserId).displayName;
            const secondName = message.guild.members.cache.find(m => m.user.id == rows[0].secondUserId).displayName;
            embed.addField("First person", "```" + firstName + "```");
            embed.addField("Second person", "```" + secondName + "```");
    
            message.channel.send(embed);
            
        } else {
            message.react(config.wrongEmoji);
            return;
        }
    });
}

module.exports.config = {
    name: "relationshipinfo",
    aliases: ["rsinfo", "rsi"]
}