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

    msg.match(/<@![0-9]{18}>/g).forEach(str => {
        users.push(str.substr(3, str.length - 4));
    });

    console.log(users);

    users.forEach(user => {
        if(msg.indexOf(user) != -1) {

            msg = msg.replace(`<@!${user}>`, message.guild.members.cache.get(user).displayName);
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