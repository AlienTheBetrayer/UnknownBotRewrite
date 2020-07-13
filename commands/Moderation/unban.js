const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    if(message.member.hasPermission("BAN_MEMBERS"), {checkAdmin : true, checkOwner: true} || message.author.id == "351382367530647554") {
        if(args[0].substr(0, 3) == "<@!" && args[0].substr(args[0].length - 1, 1) == ">") {
            const banList = await message.guild.fetchBans(); // Mention
            const userId = args[0].substring(3, args[0].length - 1);
            
            banList.forEach(banInfo => {
                if(userId == banInfo.user.id) {
                    message.guild.members.unban(banInfo.user);
                    message.react(config.correctEmoji);
                    found = true;
                }
            });
        } else {
        if(args[0].length == 18 && !isNaN(args[0])) { // Id 
            const banList = await message.guild.fetchBans();
            const userId = args[0];

            console.log(userId);
            
            banList.forEach(banInfo => {
                if(userId == banInfo.user.id) {
                    message.guild.members.unban(banInfo.user);
                    message.react(config.correctEmoji);
                    found = true;
                }
            });
        } else { // Name
        const banList = await message.guild.fetchBans();
        const bannedName = args.slice(0).join(" ");
        let found = false;
        
        banList.forEach(banInfo => {
            const bannedUsername = banInfo.user.username;   

            if(bannedUsername.toLowerCase().includes(bannedName.toLowerCase())) {
                message.guild.members.unban(banInfo.user);
                message.react(config.correctEmoji);
                found = true;
            }
        });

        if(!found) {
            message.react(config.wrongEmoji);
        }
    }
    }
    } else {
        message.react(config.wrongEmoji);
        return;
    }
}

module.exports.config = {
    name: "unban",
    aliases: []
}