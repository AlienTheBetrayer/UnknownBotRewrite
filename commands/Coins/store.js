const Discord = require("discord.js");

const config = require("../../config.json");

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
    await sqlQuery(connection, `SELECT * FROM store WHERE guildId = '${message.guild.id}'`)
    .then(rows => {
        if(rows.length < 1) {
            message.react(config.wrongEmoji);
            return;
        }

        const embed = new Discord.MessageEmbed();
    
        embed.setColor(config.defaultColor);
        embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
        embed.setTimestamp();
        embed.setFooter(`${config.prefix}store`, client.user.displayAvatarURL());

        rows.forEach(row => {
            embed.addField(`**${row.itemName}**`, `\`\`\`glsl\n${row.itemCost} 🟡\`\`\``);
        });

        message.channel.send(embed);
    });
}

module.exports.config = {
    name: "store",
    aliases: ["shop", "market"]
}