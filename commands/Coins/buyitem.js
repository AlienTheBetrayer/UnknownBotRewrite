const Discord = require("discord.js");

const config = require("../.././config.json");

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
    const itemName = args.slice(0).join(" ");

    if(!itemName) {
        message.react(config.wrongEmoji);
        return;
    }

    await sqlQuery(connection, `SELECT * FROM store WHERE guildId = '${message.guild.id}'`)
    .then(async storeRows => {
        if(storeRows.length < 1) { // Store does not exist.
            message.react(config.wrongEmoji);
            return;
        }

        await sqlQuery(connection, `SELECT * FROM coins WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`)
        .then(async coinsRows => {
            if(coinsRows.length < 1) { // User coins do not exist.
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

            if(!storeItemRow) { // Can't find the store item name by user input.
                message.react(config.wrongEmoji);
                return;
            }
           
            await sqlQuery(connection, `SELECT * FROM inventory WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}' AND itemName = '${storeItemRow.itemName}'`)
            .then(async inventoryRows => {
                if(inventoryRows.length > 0 || coinsRows[0].amount < storeItemRow.itemCost) { // Item does not exist in our inventory yet or we don't have enough coins to buy the item.
                    message.react(config.wrongEmoji);
                    return;
                }

                const embed = new Discord.MessageEmbed();
    
                embed.setColor(config.defaultColor);
                embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
                embed.setTimestamp();
                embed.setFooter(`${config.prefix}buyitem`, client.user.displayAvatarURL());
                embed.setTitle("Shop confirmation");
                embed.setDescription(`\`\`\`cpp\nAre you sure you want to buy "${storeItemRow.itemName}"?\`\`\``);
                embed.addField("Coins after purchase", `\`\`\`cpp\n${parseInt(coinsRows[0].amount) - parseInt(storeItemRow.itemCost)}\`\`\``);

                const filter = (reaction, user) => {
                    return (reaction.emoji.name === config.correctEmoji || reaction.emoji.name === config.wrongEmoji) && user.id === message.author.id;
                };

                message.channel.send(embed).then(async embedMessage => {
                    await embedMessage.react(config.correctEmoji);
                    await embedMessage.react(config.wrongEmoji);

                    embedMessage.awaitReactions(filter, { max : 1, time : 15000, errors: ["time"]})
                    .then(collected => {  
                        const emojiName = collected.first()._emoji.name;

                        switch(emojiName) {
                            case config.correctEmoji:
                                connection.query(`UPDATE coins SET amount = ${parseInt(coinsRows[0].amount) - parseInt(storeItemRow.itemCost)} WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`);
                                connection.query(`INSERT INTO inventory(userId, guildId, itemName) VALUES(${message.author.id}, ${message.guild.id}, ${connection.escape(storeItemRow.itemName)})`)
                                
                                message.react(config.correctEmoji);

                                break;
                            case config.wrongEmoji:
                                message.react(config.wrongEmoji);

                                break;
                        }
                    })
                    .catch(collected => {
                        embedMessage.react(config.wrongEmoji);
                    });
                });
            });
        });
    });
}

module.exports.config = {
    name: "buyitem",
    aliases: ["itembuy"]
}