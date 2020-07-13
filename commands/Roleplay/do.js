const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    const msg = args.slice(0).join(" ");

    if(msg.length <= 1) return;
    
    message.delete();

    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.defaultColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`${config.prefix}do`, client.user.displayAvatarURL());
    embed.setDescription(`\`\`\`${msg}\`\`\``);

    message.channel.send(embed);
}

module.exports.config = {
    name: "do",
    aliases: []
}