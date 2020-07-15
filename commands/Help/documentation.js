const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.defaultColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`${config.prefix}documentation`, client.user.displayAvatarURL());
    embed.setTitle("Documentation");
    embed.setURL("https://github.com/AlienTheBetrayer/UnknownBotRewrite/blob/master/README.md");

    message.channel.send(embed);
}

module.exports.config = {
    name: "documentation",
    aliases: ["docs"]
}