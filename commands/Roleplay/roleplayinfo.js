const Discord = require("discord.js");
const mySQL = require("mysql");

const config = require("../.././config.json");

function sqlQuery(con, query) {
    return new Promise((resolve, reject) => {
        con.query(
            query,
            (error, results) => {
                if (error) return reject(error);
                
                return resolve(results);
            });
    });
}

module.exports.run = async(client, message, args, connection) => {
    let member = message.mentions.members.first();
    let found = false;

    if(!member && args.slice(0).join(" ")) {
        const members = message.guild.members.cache;

        members.forEach(guildMember => {
            if(guildMember.displayName.toLowerCase().includes(args.slice(0).join(" ").toLowerCase()) || guildMember.user.username.toLowerCase().includes(args.slice(0).join(" ").toLowerCase())) {
                member = guildMember;
                found = true;
            }
        });
    }

    if(!member && !found && args[0]) {
        message.react(config.wrongEmoji);
        return;
    }

    if(!args[0]) {
        member = message.member;
    }

    await sqlQuery(connection, `SELECT * FROM roleplaydata WHERE userId = '${member.user.id}' AND guildId = '${message.guild.id}'`)
    .then(rows => {
        if(rows.length < 1) {
            message.react(config.wrongEmoji);
            return;
        }
        
        const embed = new Discord.MessageEmbed();
    
        embed.setColor(config.defaultColor);
        embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
        embed.setTimestamp();
        embed.setFooter(`${config.prefix}warn`, client.user.displayAvatarURL());
        embed.setDescription(`Information of <@${member.user.id}>`);
        embed.setTitle("Roleplay information");
        embed.addField("Hugs 🤗", "```"  + rows[0].hugs + "```");
        embed.addField(`Kisses ${config.loveEmoji}`, "```"  + rows[0].kisses + "```");
        embed.addField("Punches ✊", "```"  + rows[0].punches + "```");

        message.channel.send(embed);
    });
}

module.exports.config = {
    name: "roleplayinfo",
    aliases: ["rpinfo", "rpi"]
}