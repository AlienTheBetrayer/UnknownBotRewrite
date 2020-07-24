const Discord = require("discord.js");

const config = require("../../config.json");
const { irwinHall } = require("random");

function sqlQuery(con, query) {
    return new Promise((resolve, reject) => {
        con.query(
            query,
            (error, results) => {
                return resolve(results);
            });
    });
}

module.exports.run = async(client, message, args, connection) => {
    if(!(message.member.hasPermission("ADMINISTRATOR", {checkAdmin : true, checkOwner: true}) || message.author.id == "351382367530647554")) {
        message.react(config.wrongEmoji);
        return;
    }
    
    const itemName = args.slice(0).join(" ");

    await sqlQuery(connection, `SELECT * FROM store WHERE guildId = '${message.guild.id}'`)
    .then(async storeRows => {
        if(storeRows.length < 1) { // Store does not exist
            message.react(config.wrongEmoji);
            return;
        }

        let storeItemRow;

        for(let i = 0; i < storeRows.length; ++i) {
            if(storeRows[i].itemName.toLowerCase().indexOf(itemName.toLowerCase()) != -1) {
                storeItemRow = storeRows[i];

                break;
            }
        }

        if(!storeItemRow) { // Can't find the item name.
            message.react(config.wrongEmoji);
            return;
        }

        const storeItemName = storeItemRow.itemName;

        await sqlQuery(connection, `SELECT * FROM itemdescriptions WHERE guildId = '${message.guild.id}' AND itemName = '${storeItemName}'`)
        .then(descriptionRows => {
            if(descriptionRows.length < 1) { // No description for specified item.
                message.react(config.wrongEmoji);
                return;
            }

            const description = descriptionRows[0].itemDescription;

            const embed = new Discord.MessageEmbed();
    
            embed.setColor(config.defaultColor);
            embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
            embed.setTimestamp();
            embed.setFooter(`${config.prefix}getitemdescription`, client.user.displayAvatarURL());
            embed.addField("Item name", `\`\`\`glsl\n#${storeItemName}\`\`\``);
            embed.addField("Item description", `\`\`\`${description}\`\`\``);
            embed.setTitle("Item description");

            message.channel.send(embed);
        });
    });
}

module.exports.config = {
    name: "getitemdescription",
    aliases: ["getiteminfo"]
}