const Discord = require("discord.js");
const random = require("random");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    const operation = random.bool();

    const msg = args.slice(0).join(" ");

    if(msg.length <= 1) return;

    message.delete();

    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.defaultColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`${config.prefix}try`, client.user.displayAvatarURL());
    embed.setDescription(`\`\`\`css\n${msg}\`\`\``);

    if(operation) {
        embed.addField("Operation state", `Success ${config.correctEmoji}`);
    } else {
        embed.addField("Operation state", `Failure ${config.wrongEmoji}`);
    }

    message.channel.send(embed);
}

module.exports.config = {
    name: "try",
    aliases: []
}