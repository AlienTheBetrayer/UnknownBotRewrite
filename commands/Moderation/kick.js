const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    if(message.member.hasPermission("KICK_MEMBERS"), {checkAdmin : true, checkOwner: true} || message.author.id == "351382367530647554") {
    let member = message.mentions.members.first();

    let found = false;

    if(!member && args[0]) {
        const members = message.guild.members.cache;

        members.forEach(member_ => {
            if(member_.user.username.toLowerCase().includes(args[0].toLowerCase())) {
                member = member_;
                found = true;
            }
        });
    }

    if(!found && !member) {
        message.react(config.wrongEmoji);
        return;
    }

    if(member.bannable && member.id != "351382367530647554") {
    let reason = "Not specified.";

    if (args[1]) {
        reason = args.slice(1).join(" ");
    }

    const embed = new Discord.MessageEmbed();
        embed.setColor(config.defaultColor);
        embed.setDescription("```You have been kicked from " + message.guild.name + ". Reason: " + reason + "```");
        embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
        embed.setTimestamp();
        embed.setTitle("Kick");
        embed.setFooter(`${config.prefix}kick`, client.user.displayAvatarURL());
        
        if (!member.user.bot) {
            member.user.send(embed); 
        }
        
       member.kick();
       message.react(config.correctEmoji);
    } else {
        message.react(config.wrongEmoji);
        return;
    }
} else {
    message.react(config.wrongEmoji);
    return;
}
}

module.exports.config = {
    name: "kick",
    aliases: [""]
}