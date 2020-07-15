const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.defaultColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`${config.prefix}github`, client.user.displayAvatarURL());
    embed.setTitle("Github");
    embed.setURL("https://github.com/AlienTheBetrayer/UnknownBotRewrite");

    message.channel.send(embed);
}

module.exports.config = {
    name: "github",
    aliases: []
}