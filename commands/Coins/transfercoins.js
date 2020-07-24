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
    let member = message.mentions.members.first();
    let found = false;

    if(!member && args.slice(1).join(" ")) { 
        const members = message.guild.members.cache;

        members.forEach(cachedMember => {
            if(cachedMember.displayName.toLowerCase().includes(args.slice(1).join(" ").toLowerCase())) {
                member = cachedMember;
                found = true;
            }
        });
    }

    if(!args[1]) { 
        member = message.member;
    }

    if(!found || !args[1] || member == message.member) {
        message.react(config.wrongEmoji);
        return;
    }
    const transferAmount = !isNaN(args[0]) ? parseInt(args[0]) : 0;

    await sqlQuery(connection, `SELECT * FROM coins WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
    .then(async rows => {

        const amount = rows[0].amount;

        if(transferAmount > amount) {
            message.react(config.wrongEmoji);
            return;
        }

        await sqlQuery(connection, `SELECT * FROM coins WHERE guildId = '${message.guild.id}' AND userId = '${member.user.id}'`)
        .then(rows_ => {
            let sql;

            if(rows_.length < 1) {
                sql = `INSERT INTO coins(userId, guildId, amount) VALUES(${member.user.id}, ${message.guild.id}, ${parseInt(rows_[0].amount) + transferAmount})`;// doesnt exixt, insert    
            } else {
                sql = `UPDATE coins SET amount = ${parseInt(rows_[0].amount) + transferAmount} WHERE userId = '${member.user.id}' AND guildId = '${message.guild.id}'`; // exists, update
            }

            connection.query(`UPDATE coins SET amount = ${parseInt(amount) - parseInt(transferAmount)} WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`);
            connection.query(sql);

            message.react(config.correctEmoji);
        });
    });
}

module.exports.config = {
    name: "transfercoins",
    aliases: []
}