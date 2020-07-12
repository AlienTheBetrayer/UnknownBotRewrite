const Discord = require("discord.js");
const mySQL = require("mysql");

const config = require("../.././config.json");

module.exports.run = async(client, message, args, connection) => {
    let guildName = args.slice(1).join(" ");
    const data = args[0];
    const availableKeys = ["name", "age", "status", "mood", "love", "color", "avatar", "birthday"];

    if(isNaN(guildName)) {
       const guilds = client.guilds.cache;
       
       guilds.forEach(guild => {
            if(guild.name.toLowerCase().includes(guildName.toLowerCase())) {
                guildName = guild.id;
            }
       });
    }

    if(!guildName || !data) {
        message.react(config.wrongEmoji);
        return;
    }

    if(data == "ALL") {
        let sql = `DELETE FROM userprofile WHERE userId = '${message.author.id}' AND guildId = '${guildName}'`;
        connection.query(sql);

        connection.query(`SELECT * FROM userprofile WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`, (err, rows) => {
            if(err) {
                console.log(err);
                message.react(config.wrongEmoji);
                return;
            }

            if(rows.length < 1) {
                message.react(config.wrongEmoji);
                return;
            }

            rows.forEach(row => {
                let sql_ = `INSERT INTO userprofile(guildId, userId, data, value) VALUES('${guildName}', '${message.author.id}', '${row.data}', '${row.value}')`;

                connection.query(sql_);
            });
        });

        message.react(config.correctEmoji);
        return;
    }

    let found = false;

    for(i = 0; i < availableKeys.length; ++i) {
        if(data == availableKeys[i]) {
            found = true;
        }
    }

    if(!found) {
        message.react(config.wrongEmoji);
        return;
    }

    let sql = `DELETE FROM userprofile WHERE userId = '${message.author.id}' AND guildId = '${guildName}' AND data = '${data}'`;

    connection.query(sql);

    connection.query(`SELECT * FROM userprofile WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}' AND data = '${data}'`, (err, rows) => {
        if(err) {
            console.log(err);
            message.react(config.wrongEmoji);
            return;
        }

        if(rows.length < 1) {
            message.react(config.wrongEmoji);
            return;
        }

        let sql_ = `INSERT INTO userprofile(guildId, userId, data, value) VALUES('${guildName}', '${message.author.id}', '${data}', '${rows[0].value}')`;

        connection.query(sql_);
    });
}

module.exports.config = {
    name: "transferprofile",
    aliases: ["profiletransfer"]
}