const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    let roleColor = ""
    let roleName = "";

    if(message.member.hasPermission("ADMINISTRATOR", {checkAdmin : true, checkOwner: true}) || message.author.id == "351382367530647554") {
    if(args[0][0] == "#") {
        roleColor = args[0].substring(1, args[0].length);
        roleName = args.slice(1).join(" ");
    } else {
        roleColor = "ffffff";
        roleName = args.slice(0).join(" ");
    }

    message.guild.roles.create({data: {
       name : roleName,
       color : roleColor 
    }});
    
    message.react(config.correctEmoji);
} else {
    message.react(config.correctEmoji);
}

}

module.exports.config = {
    name: "createrole",
    aliases: ["cr"]
}