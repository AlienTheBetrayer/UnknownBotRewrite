const Discord = require("discord.js");
const random = require("random");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    const items = args.slice(0);

    if(items.length <= 0) return;

    const rand = random.int(0, items.length - 1);

    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.defaultColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`${config.prefix}randitem`, client.user.displayAvatarURL());
    embed.setTitle("Random item");
    embed.addField("Item", `\`\`\`${items[rand]}\`\`\``);

    message.channel.send(embed);

    message.react(config.correctEmoji);
}

module.exports.config = {
    name: "randomitem",
    aliases: ["randitem"]
}