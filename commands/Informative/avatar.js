const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    const member = message.mentions.members.first();
    let av = null;
    
    const embed = new Discord.MessageEmbed();
    embed.setTitle("Avatar");
    embed.setColor(config.defaultColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`${config.prefix}avatar`, client.user.displayAvatarURL());

    if(member) { // Mention
        const user = member.user;
        av = user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 });
        embed.setImage(av);
    } else if(args[0]) { // Name
        const members = message.guild.members.cache;

        members.forEach(member => {
            const name_ = member.user.username;

            if(name_.toLowerCase().includes(args[0].toLowerCase())) {
                av = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 });
            }
        });
    } else { // Your own avatar
        const user = message.author;
        av = user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 });
    }

    embed.setImage(av);
    message.channel.send(embed);
}

module.exports.config = {
    name: "avatar",
    aliases: ["av"]
}