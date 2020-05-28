const Discord = require("discord.js");
const random = require("random");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    const replies = ["No...", "Yes!", "No!", "Never.", "Try again.", "Doesn't matter...", "Definitely!", "Probably.", "Maybe.", "Why do you even ask?", "Nah.", "Yep!", "Yeah!",
        "I don't think so...", "Most likely.", "Can't predict.", "You shouldn't know this...", "Very doubtful.", "I'll tell you later..."];
    const randomReply = random.int(0, replies.length - 1);

    const msg = args.slice(0).join(" ");

    if(!msg) {
        message.react(config.wrongEmoji);
        return;
    }

    const embed = new Discord.MessageEmbed();
    embed.setTitle("8 Ball");
    embed.setColor(config.defaultColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.addField("Message", "```" + msg + "```");
    embed.addField("Answer", "```" + replies[randomReply] + "```");
    embed.setFooter(`${config.prefix}8ball`, client.user.displayAvatarURL());

    message.channel.send(embed);
}

module.exports.config = {
    name: "8ball",
    aliases: [""]
}