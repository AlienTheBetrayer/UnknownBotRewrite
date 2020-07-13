const Discord = require("discord.js");

const config = require("../.././config.json");

function FindChannel(channelName, messageObject) {
    return messageObject.guild.channels.cache.find(ch => ch.name === channelName); 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function ensureReportChannel(messageObject) {
    const found = FindChannel("reports", messageObject);

    if(!found) {
        messageObject.guild.channels.create("reports", {
            type : "text",
            topic : "Unknown Bot reports channel.",
            permissionOverwrites : [
                {
                id : messageObject.guild.id,
                deny : ["VIEW_CHANNEL"]
                }
            ],
        });
    } 
}


module.exports.run = async(client, message, args) => {
    ensureReportChannel(message);

    await sleep(1000);

    const channel = FindChannel("reports", message);

    if(!channel) {
        message.react(config.wrongEmoji);
        return;
    }

    let member = message.mentions.members.first();
    let found = false;

    if(!member && args[0]) {
        const members = message.guild.members.cache;

        members.forEach(guildMember => {
            const memberName = guildMember.displayName;
            if(memberName.toLowerCase().includes(args[0].toLowerCase()) || guildMember.user.username.toLowerCase().includes(args[0].toLowerCase())) {
                member = guildMember;
                found = true;   
            }
        });
    }

    if(!found && !member) {
        message.react(config.wrongEmoji);
        return;
    }

    if(args.length < 2) {
        message.react(config.wrongEmoji);
        return;
    }

    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.warnColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`${config.prefix}report`, client.user.displayAvatarURL());
    embed.setTitle("Report");
    embed.addField("Reported person", "**<@" + member.user.id + ">**");
    embed.addField("Reason", "```" + args.slice(1).join(" ") +"```");

    channel.send(embed);
}

module.exports.config = {
    name: "report",
    aliases: []
}