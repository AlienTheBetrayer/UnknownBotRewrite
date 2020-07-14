const Discord = require("discord.js");
const random = require("random");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    const first = args[0];
    const second = args[1];

    if((isNaN(first) || isNaN(second)) || parseInt(first) >= parseInt(second)) {
        message.react(config.wrongEmoji);
        return;
    }

    const number = random.int(parseInt(first), parseInt(second));

    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.defaultColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`${config.prefix}rand`, client.user.displayAvatarURL());
    embed.setTitle("Random number");
    embed.addField("Numbers", `\`\`\`${first} ... ${second}\`\`\``);
    embed.addField("Random number", `\`\`\`${number}\`\`\``);

    message.channel.send(embed);

    message.react(config.correctEmoji);
}

module.exports.config = {
    name: "random",
    aliases: ["rand"]
}