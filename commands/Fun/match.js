const Discord = require("discord.js");
const fs = require("fs");
const random = require("random");
const mySQL = require("mysql");

const config = require("../.././config.json");

module.exports.run = async(client, message, args, connection) => {
    const goodPhrases = ["It's love!", "Lovely!", "Nice relationship.", "Definitely a love...", "Soulmates have been detected."];
    const mediumPhrases = ["There's a chance...", "Try it!", "Maybe...", "Love opportunity is hidden within you...", "Perhaps."];
    const badPhrases = ["No love... :(", "Sadly... But it's a no.", "Only friends.", "Not this time...", "There's plenty of fish in the sea."];

    const firstPerson = args[0];
    const secondPerson = args[1];

    let percentage = random.int(0, 100);

    connection.query(`SELECT * FROM lovematch WHERE guildId = '${message.guild.id}' AND firstUser = '${firstPerson.toLowerCase()}' AND secondUser = '${secondPerson.toLowerCase()}' OR
    guildId = '${message.guild.id}' AND firstUser = '${secondPerson.toLowerCase()}' AND secondUser = '${firstPerson.toLowerCase()}'`, (err, rows) => {
        if(err) {
            console.log(err);
            message.react(config.wrongEmoji);
            return;
        }

        const embed = new Discord.MessageEmbed();
        let msg;

        if(rows.length < 1) { // doesnt exist    
            const percentage = random.int(0, 100);    
            connection.query(`INSERT INTO lovematch(guildId, firstUser, secondUser, percentage) VALUES('${message.guild.id}', '${firstPerson.toLowerCase()}', '${secondPerson.toLowerCase()}', ${percentage})`);

            const rand = random.int(0, goodPhrases.length - 1);

            if(percentage <= 35) {
                msg = badPhrases[rand];
            } else if(percentage > 35 && percentage < 70) {
                msg = mediumPhrases[rand];
            } else if(percentage >= 70) {
                msg = goodPhrases[rand];
            }
    
            embed.setColor(config.defaultColor);
            embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
            embed.setTimestamp();
            embed.setFooter(`${config.prefix}match`, client.user.displayAvatarURL());
            embed.setTitle("Love match");
            embed.addField("Couple", `\`\`\`${firstPerson} x ${secondPerson}\`\`\``);
            embed.addField("Chance", `\`\`\`${percentage}\`\`\``);
            embed.addField("Message", `\`\`\`${msg}\`\`\``);            
        } else {
            const rand = random.int(0, goodPhrases.length - 1);

            if(rows[0].percentage <= 35) {
                msg = badPhrases[rand];
            } else if(rows[0].percentage > 35 && rows[0].percentage < 70) {
                msg = mediumPhrases[rand];
            } else if(rows[0].percentage >= 70) {
                msg = goodPhrases[rand];
            }
    
            embed.setColor(config.defaultColor);
            embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
            embed.setTimestamp();
            embed.setFooter(`${config.prefix}match`, client.user.displayAvatarURL());
            embed.setTitle("Love match");
            embed.addField("Couple", `\`\`\`${firstPerson} x ${secondPerson} \`\`\``);
            embed.addField("Chance", `\`\`\`${rows[0].percentage}\`\`\``);
            embed.addField("Message", `\`\`\`${msg}\`\`\``);            
        }

        message.channel.send(embed);
    });
}

module.exports.config = {
    name: "match",
    aliases: ["lovematch"]
}