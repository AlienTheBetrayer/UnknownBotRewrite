const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.defaultColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`${config.prefix}changelog`, client.user.displayAvatarURL());
    embed.setTitle("Changelog");
    embed.setURL("https://github.com/AlienTheBetrayer/UnknownBotRewrite/blob/master/changelog.md");

    message.channel.send(embed);
}

module.exports.config = {
    name: "changelog",
    aliases: []
}