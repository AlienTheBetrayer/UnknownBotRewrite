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
    
    const itemName = args.slice(0).join(" ");

    if(!itemName) {
        message.react(config.wrongEmoji);
        return;
    }
 
    await sqlQuery(connection, `SELECT * FROM store WHERE guildId = '${message.guild.id}'`)
    .then(rows => { 
        if(rows.length < 1) {
            message.react(config.wrongEmoji);  
            return;
        }

        let storeItemName;

        for(let i = 0; i < rows.length; ++i) {
            if(rows[i].itemName.toLowerCase().indexOf(itemName.toLowerCase()) != -1) {
                storeItemName = rows[i].itemName;

                break;
            }
        }

        if(!storeItemName) {
            message.react(config.wrongEmoji);  
            return;
        }

        connection.query(`DELETE FROM store WHERE guildId = '${message.guild.id}' AND itemName = ${connection.escape(storeItemName)}`);
        connection.query(`DELETE FROM itemdescriptions WHERE guildId = '${message.guild.id}' AND itemName = ${connection.escape(storeItemName)}`);

        message.react(config.correctEmoji);
    });
}

module.exports.config = {
    name: "deleteitem",
    aliases: ["removeitem"]
}