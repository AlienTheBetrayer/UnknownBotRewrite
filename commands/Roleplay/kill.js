const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    let member = message.mentions.members.first();
    let found = false;

    if(!member && args.slice(0).join(" ")) {
        const members = message.guild.members.cache;

        members.forEach(guildMember => {
            if(guildMember.displayName.toLowerCase().includes(args.slice(0).join(" ").toLowerCase()) || guildMember.user.username.toLowerCase().includes(args.slice(0).join(" ").toLowerCase())) {
                member = guildMember;
                found = true;
            }
        });
    }

    if(!member && !args.slice(0).join(" ") || !found) {
        message.react(config.wrongEmoji);
        return;
    }

    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.defaultColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`${config.prefix}kill`, client.user.displayAvatarURL());
    if(message.author == member.user) {
        embed.setTitle("Suicide");
        embed.setDescription(`<@${message.author.id}> has killed yourself... 🔪`);
    } else {
        embed.setTitle("Kill");
        embed.setDescription(`<@${message.author.id}> has killed <@${member.user.id}> 🔪`);
    }

    message.channel.send(embed);
}

module.exports.config = {
    name: "kill",
    aliases: []
}