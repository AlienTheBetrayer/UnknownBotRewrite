const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    let role_ = message.mentions.roles.first();

    if(message.member.hasPermission("ADMINISTRATOR"), {checkAdmin : true, checkOwner: true} || message.author.id == "351382367530647554") {
    if(!role_) {
        const roles = message.guild.roles.cache;

        roles.forEach(Role => {
            if(Role.name.toLowerCase().includes(args[0].toLowerCase())) {
                role_ = Role;
            }
        });
    }

if(role_) {
   role_.delete();
   message.react(config.correctEmoji);
} else {
    message.react(config.wrongEmoji);
}
    }
}  

module.exports.config = {
    name: "deleterole",
    aliases: ["dr"]
}