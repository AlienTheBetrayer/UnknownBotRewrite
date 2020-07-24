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
    await sqlQuery(connection, `SELECT * FROM inventory WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}' AND itemName = 'Embed messages'`)
    .then(rows => {
        if(rows.length < 1) {
            message.react(config.wrongEmoji);
            return;
        }

        message.delete();

        const msg = args.slice(0).join(" ");

        if(!msg) {
            message.react(config.wrongEmoji);
            return;
        }

        const embed = new Discord.MessageEmbed();
    
        embed.setColor(config.defaultColor);
        embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
        embed.setTimestamp();
        embed.setFooter(`${config.prefix}warn`, client.user.displayAvatarURL());
        embed.setDescription(msg);

        message.channel.send(embed);
    });
}

module.exports.config = {
    name: "embedmessage",
    aliases: ["embedmsg"]
}