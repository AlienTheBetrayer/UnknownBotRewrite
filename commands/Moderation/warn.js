const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    if(message.member.hasPermission("MANAGE_MESSAGES"), {checkAdmin : true, checkOwner: true} || message.author.id == "351382367530647554") {
    let member = message.mentions.members.first();
    const reason = args.slice(1).join(" ");
    let readReason = "Not specified.";
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

    if(reason) {
        readReason = reason;
    }

    const embed = new Discord.MessageEmbed();
    embed.setColor(config.defaultColor);
    embed.setDescription("```You have been warned in " + message.guild.name + ". Reason: " + readReason + "```");
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setTitle("Warn");
    embed.setFooter(`${config.prefix}warn`, client.user.displayAvatarURL());

    member.send(embed);
}
}

module.exports.config = {
    name: "warn",
    aliases: [""]
}