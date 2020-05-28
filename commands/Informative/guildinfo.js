const Discord = require("discord.js");

const config = require("../.././config.json");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async(client, message, args) => {
    const guild = message.guild;

    const timestamp = (moment.unix(guild.createdTimestamp / 1000));
    const timestampDate = timestamp.format("MMMM Do YYYY, h:mm:ss a"); // date

    const pfp = guild.iconURL({ format: 'png', dynamic: true, size: 2048 });
    const channels = guild.channels.cache;
    const channelsSize = [0, 0, 0, 0]; // total : text : voice : categories

    channelsSize[0] = channels.size;
    channelsSize[1] = channels.filter(ch => ch.type === "text").size;
    channelsSize[2] = channels.filter(ch => ch.type === "voice").size;
    channelsSize[3] = channels.filter(ch => ch.type === "category").size;

    const chStr = `Text: ${channelsSize[1]}, Voice: ${channelsSize[2]}, Categories: ${channelsSize[3]}, Total: ${channelsSize[0]}`;

    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.defaultColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setTitle("Guild information");
    embed.setFooter(`${config.prefix}guildinfo`, client.user.displayAvatarURL());
    embed.addField("Channels", "```" + chStr + "```");
    embed.addField("Members", "```" + guild.members.cache.size + "```", true);
    embed.addField("Roles", "```" + guild.roles.cache.size + "```", true);
    embed.addField("Emojis", "```" + guild.emojis.cache.size + "```", true);
    embed.addField("Created at", "```" + timestampDate + "```", true);
    embed.addField("Boosting people", "```" + guild.premiumSubscriptionCount + "```", true);
    embed.setImage(guild.iconURL({format: "png", dynamic : true, size : 2048}), true);

    message.channel.send(embed);
}

module.exports.config = {
    name: "guildinfo",
    aliases: ["gi"]
}