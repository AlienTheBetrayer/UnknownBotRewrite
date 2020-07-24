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
    
    const separator = args.findIndex(arg => arg === "|");
    const itemName = args.slice(0, separator).join(" ");
    const itemDescription = args.slice(separator + 1, separator.length).join(" ");

    if(!itemName || !itemDescription) {
        message.react(config.wrongEmoji);
        return;
    }

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
            let sql;
            if(descriptionRows.length < 1) { // insert
                sql = `INSERT INTO itemdescriptions(guildId, itemName, itemDescription) VALUES (${message.guild.id}, ${connection.escape(storeItemName)}, ${connection.escape(itemDescription)})`
            } else { // update
                sql = `UPDATE itemdescriptions SET itemDescription = ${connection.escape(itemDescription)} WHERE itemName = ${connection.escape(storeItemName)} AND guildId = '${message.guild.id}'`;
            }

            connection.query(sql);
            
            message.react(config.correctEmoji);
        });
    });
}

module.exports.config = {
    name: "setitemdescription",
    aliases: ["setiteminfo"]
}