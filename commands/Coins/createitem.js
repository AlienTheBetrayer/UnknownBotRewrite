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
    if(!(message.member.hasPermission("ADMINISTRATOR", {checkAdmin : true, checkOwner: true}) || message.author.id == "351382367530647554")) {
        message.react(config.wrongEmoji);
        return;
    }

    const itemCost = args[0];
    const itemName = args.slice(1).join(" ");

    if(!itemName || !itemCost) {
        message.react(config.wrongEmoji);
        return;
    }

    await sqlQuery(connection, `SELECT * FROM store WHERE guildId = '${message.guild.id}'`)
    .then(async rows => {
        if(rows.length < 1) {
            message.react(config.wrongEmoji);
            return;
        }
        await sqlQuery(connection, `SELECT * FROM store WHERE guildId = '${message.guild.id}' AND itemName = ${connection.escape(itemName)}`)
        .then(rows_ => {
            if(rows_.length >= 1) {
                message.react(config.wrongEmoji);
                return;
            }

            connection.query(`INSERT INTO store(guildId, itemName, itemCost) VALUES('${message.guild.id}', ${connection.escape(itemName)}, ${connection.escape(itemCost)})`)
        
            message.react(config.correctEmoji);
        });       
    });
}

module.exports.config = {
    name: "createitem",
    aliases: ["additem"]
}