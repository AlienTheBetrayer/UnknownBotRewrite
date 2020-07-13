const Discord = require("discord.js");
const mySQL = require("mysql");

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
    await sqlQuery(connection, `SELECT * FROM relationship WHERE firstUserId = '${message.author.id}' OR secondUserId = '${message.author.id}' AND guildId = '${message.guild.id}'`)
    .then(rows => {
        if(rows.length >= 1) {
            let sql;

            sql = `DELETE FROM relationship WHERE firstUserId = '${message.author.id}' OR secondUserId = '${message.author.id}' AND guildId = '${message.guild.id}'`;

            connection.query(sql);
            message.react(config.correctEmoji); 

            const embed = new Discord.MessageEmbed();

            message.channel.send(`<@${rows[0].firstUserId}>, <@${rows[0].secondUserId}>`);
            embed.setTitle(`Relationship breakup ${config.noLoveEmoji}`)
            embed.setColor(config.defaultColor);
            embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
            embed.setTimestamp();
            embed.setFooter(`${config.prefix}breakup`, client.user.displayAvatarURL());
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
    name: "breakup",
    aliases: []
}