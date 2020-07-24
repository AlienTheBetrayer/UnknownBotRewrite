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
    await sqlQuery(connection, `SELECT * FROM inventory WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
    .then(rows => {
        if(rows.length < 1) {
            message.react(config.wrongEmoji);
            return;
        }

        const embed = new Discord.MessageEmbed();
    
        embed.setColor(config.defaultColor);
        embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
        embed.setTimestamp();
        embed.setFooter(`${config.prefix}inventory`, client.user.displayAvatarURL());
        embed.setTitle("Inventory");
    
        for(i = 0; i < rows.length; ++i) {
            embed.addField(`**${i + 1}**`, `\`\`\`glsl\n# ${rows[i].itemName}\`\`\``);
        }

        message.channel.send(embed);
    });
}

module.exports.config = {
    name: "inventory",
    aliases: ["items"]
}