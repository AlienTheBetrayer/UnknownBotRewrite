const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    message.react(config.correctEmoji);
    const msg = await message.channel.send("Ping!");
    const time = msg.createdTimestamp - message.createdTimestamp;
    msg.delete();

    const embed = new Discord.MessageEmbed();
    embed.setTitle("Bot's ping");
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setColor(config.defaultColor);
    embed.addField("Bot's latency", "```" + time + " ms.```", true);
    embed.addField("API latency", "```" + Math.round(client.ws.ping) + " ms.```", true);
    embed.setFooter(`${config.prefix}ping`, client.user.displayAvatarURL());

    message.channel.send(embed);
}

module.exports.config = {
    name: "ping",
    aliases: [""]
}