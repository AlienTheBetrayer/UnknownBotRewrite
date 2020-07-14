const Discord = require("discord.js");

const config = require("../.././config.json");
const random = require("random");

module.exports.run = async(client, message, args) => {
    let msg = args.slice(0).join(" ");

    if(!msg) {
        message.react(config.wrongEmoji);
        return;
    }

    const users = [];

    const match = msg.match(/<@!*[0-9]{18}>/g);
        if(match) {
            match.forEach(str => {
                const id = str.replace(/[<@!>]/g, "");

                users.push(id);
            });
        }
    
    const match_ = msg.match(/<@&[0-9]{18}>/g);

    const roles = [];

    if(match_) {
        match_.forEach(str => {
            const id = str.replace(/[<@&>]/g, "");

            roles.push(id);
        });
    }

    users.forEach(user => {
        if(msg.indexOf(user) != -1) {

            msg = msg.replace(`<@!${user}>`, message.guild.members.cache.get(user).displayName);
        }
    });

    roles.forEach(role => {
        if(msg.indexOf(role) != -1) {
            msg = msg.replace(`<@&${role}>`, message.guild.roles.cache.get(role).name);
        }
    });

    const rand = random.int(1, 100);

    const embed = new Discord.MessageEmbed();

    embed.setColor(config.defaultColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`${config.prefix}8ball`, client.user.displayAvatarURL());
    embed.addField("Message", "```" + msg + "```");
    embed.addField("Percentage", "```" + rand + "%```");

    message.channel.send(embed);
}

module.exports.config = {
    name: "percentage",
    aliases: ["%"]
}