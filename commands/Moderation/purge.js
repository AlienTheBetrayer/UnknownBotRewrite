const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    if(message.member.hasPermission("MANAGE_MESSAGES", {checkAdmin : true, checkOwner: true}) || message.author.id == "351382367530647554") {
    const number = args[0];
    let member = message.mentions.members.first();
    let found = false;

    if(!member && args[1]) {
        message.guild.members.cache.forEach(member_ => {
            if(member_.user.username.toLowerCase().includes(args[1].toLowerCase())) {
                member = member_;
                found = true;
            }
        });
    }

    if(!found && args[1] && !member) {
        message.react(config.wrongEmoji);
        return;
    }

    if(!number) {
        message.react(config.wrongEmoji);
        return;
    }

    message.channel.bulkDelete(number);

    }
}

module.exports.config = {
    name: "purge",
    aliases: ["prune"]
}