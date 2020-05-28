const Discord = require("discord.js");

const config = require("../.././config.json");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async(client, message, args) => {
    const githubLink = "https://github.com/AlienTheBetrayer/Unknown-Bot";
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const guildsSize = client.guilds.cache.size;
    const ping = client.ws.ping;
    
    const embed = new Discord.MessageEmbed();
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setTitle("Bot information");
    embed.setColor(config.defaultColor);
    embed.setImage(client.user.displayAvatarURL({dynamic : true, size : 2048, format : "png"}));
    embed.setDescription(`[Github Repository](${githubLink})`);
    embed.addField("Guilds", "```" + guildsSize + "```", true);
    embed.addField("API latency", "```" + ping + "```", true);
    embed.addField("Bot's uptime", "```" + duration + "```", true); 
    embed.setFooter(`${config.prefix}botinfo `, client.user.displayAvatarURL());

    message.channel.send(embed);
}

module.exports.config = {
    name: "botinfo",
    aliases: ["bi"]
}