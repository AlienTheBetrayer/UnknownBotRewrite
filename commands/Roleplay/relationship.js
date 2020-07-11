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

    if(!member && !args.slice(0).join(" ") && !found) {
        message.react(config.wrongEmoji);
        return;
    }

    if(member.user == message.author) {
        message.react(config.wrongEmoji);
        return;
    }

    let firstTaken, secondTaken;

    await sqlQuery(connection, `SELECT * FROM relationship WHERE guildId = '${message.guild.id}' AND firstUserId = '${message.author.id}'`)
    .then(rows => {
        if(rows.length >= 1) {
            firstTaken = true;
        }
    });

    await sqlQuery(connection, `SELECT * FROM relationship WHERE guildId = '${message.guild.id}' AND secondUserId = '${member.user.id}'`)
    .then(rows => {
        if(rows.length >= 1) {
            secondTaken = true;
        }
    });

     if(firstTaken || secondTaken) {
        message.react(config.wrongEmoji);
        return;
     }
    
    const embed = new Discord.MessageEmbed();
    
    message.channel.send(`<@${member.user.id}>`);
    embed.setColor(config.defaultColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`${config.prefix}relationship`, client.user.displayAvatarURL());
    embed.setTitle(`Relationship proposal`)
    embed.addField("Person", "```" + member.user.username + "#" + member.user.discriminator + "```");
    embed.setDescription(`<@${member.user.id}>, type relationship accept to enter the relationship.`)
    embed.setThumbnail(member.user.displayAvatarURL());

    message.channel.send(embed);

    const filter = m => {
        return ((m.content.toLowerCase().includes("relationship accept") || m.content.toLowerCase().includes("rs accept")) && m.author.id == member.user.id);
    }

    message.channel.awaitMessages(filter, {max : 1, time : 120000, errors: ['time']})
    .then(collected => {
        connection.query(`INSERT INTO relationship(guildId, firstUserId, secondUserId) VALUES('${message.guild.id}', '${message.author.id}', '${member.user.id}')`);

        const nembed = new Discord.MessageEmbed();

        message.channel.send(`<@${member.user.id}>, <@${message.author.id}>`);
        nembed.setColor(config.defaultColor);
        nembed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
        nembed.setTimestamp();
        nembed.setFooter(`${config.prefix}relationship`, client.user.displayAvatarURL());
        nembed.setTitle(`Relationship ${config.loveEmoji}`)
        nembed.addField("First person", "```" + message.author.username + "#" + message.author.discriminator + "```");
        nembed.addField("Second person", "```" + member.user.username + "#" + member.user.discriminator + "```");
        nembed.setDescription(`<@${message.author.id}> and <@${member.user.id}> have entered the relationship! ${config.loveEmoji}`)
    
        message.channel.send(nembed);
    })
    .catch(collected => {

    });
}

module.exports.config = {
    name: "relationship",
    aliases: ["rs"]
}