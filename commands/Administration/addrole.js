const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    if(message.member.hasPermission("ADMINISTRATOR", {checkAdmin : true, checkOwner: true}) || message.author.id == "351382367530647554") {
        let member_ = message.mentions.members.first(); 
        
        if(!member_) {
            const members = message.guild.members.cache;
            members.forEach(member => {
                if(member.user.username.toLowerCase().includes(args[0].toLowerCase())) {
                    member_ = member;
                }
            });
        }

        let role_ = message.mentions.roles.first();

        if(!role_) {
            const roles = message.guild.roles.cache;
            roles.forEach(role => {
                if(role.name.toLowerCase().includes(args.slice(1).join(" ").toLowerCase())) {
                    role_ = role;
                }
            });
        }

        message.guild.members.cache.get(member_.id).roles.add(role_.id);
        message.react(config.correctEmoji);
    } else {
        message.react(config.wrongEmoji);
    }
}

module.exports.config = {
    name: "addrole",
    aliases: ["ar"]
}