const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    const msg = args.slice(0).join(" ");

    message.delete();

    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.defaultColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`${config.prefix}me`, client.user.displayAvatarURL());
    embed.setDescription(`\`\`\`ini\n[ ${msg} ]\`\`\``);

    message.channel.send(embed);
    
}

module.exports.config = {
    name: "me",
    aliases: [""]
}