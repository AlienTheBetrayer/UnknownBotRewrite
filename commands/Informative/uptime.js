const Discord = require("discord.js");

const config = require("../.././config.json");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async(client, message, args) => {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

    const embed = new Discord.MessageEmbed();
    embed.setTitle("Bot's uptime");
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setColor(config.defaultColor);
    embed.addField("Uptime","```" + duration + "```");
    embed.setFooter(`${config.prefix}uptime`, client.user.displayAvatarURL());

    message.channel.send(embed);
}

module.exports.config = {
    name: "uptime",
    aliases: []
}