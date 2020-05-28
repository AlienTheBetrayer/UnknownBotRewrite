const Discord = require("discord.js");

const config = require("../.././config.json");
const moment = require("moment");

module.exports.run = async(client, message, args) => {
    let MEMBER = message.mentions.members.first();
    let found = false;

    if(!MEMBER) {
        if(args[0]) {
        const members = message.guild.members.cache;

        members.forEach(member => {
            if(member.user.username.toLowerCase().includes(args.slice(0).join(" ").toLowerCase()) || member.displayName.toLowerCase().includes(args.slice(0).join(" ").toLowerCase())) {
                MEMBER = member;
                found = true;
            }
        });
    } else {
        MEMBER = message.member;
        found = true;
    }
    }

    if(!found) {
        message.react(config.wrongEmoji);
        return; 
    }


    const memberActivities = MEMBER.user.presence.activities[0];

    const timestamp = (moment.unix(MEMBER.user.createdTimestamp / 1000));
    const timestampDate = timestamp.format("MMMM Do YYYY, h:mm:ss a");

    const timestamp_ = (moment.unix(MEMBER.joinedTimestamp / 1000));
    const timestampDate_ = timestamp_.format("MMMM Do YYYY, h:mm:ss a");

    const embed = new Discord.MessageEmbed();
    
    embed.setColor(MEMBER.displayHexColor);
    embed.setTitle("User information");
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();

    let botStr = "";    

    if(MEMBER.user.bot) {
        botStr = " |  Bot";
    }    

    embed.addField("Name", "```" + MEMBER.user.username + "#" + MEMBER.user.discriminator + botStr + "```", true);
    embed.addField("Identificator", "```" + MEMBER.user.id + "```", true);
    embed.addField("Account creation date", "```" + timestampDate + "```", false);
    embed.addField("Guild join date", "```"+ timestampDate_ + "```", true);
    embed.setImage(MEMBER.user.displayAvatarURL({format : "png", dynamic : true, size : 512}));
    embed.setFooter(`${config.prefix}userinfo`, client.user.displayAvatarURL());
    
    if(memberActivities && memberActivities.state) {
        embed.addField("Status", memberActivities.state);
    } 

    message.channel.send(embed);
    message.react(config.correctEmoji);
}

module.exports.config = {
    name: "userinfo",
    aliases: ["ui"]
}